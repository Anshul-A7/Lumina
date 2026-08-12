import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// ============================================================================
// LUMINA — API INTEGRATION LAYER
// ============================================================================
// Enterprise-grade Axios instance with JWT token management, automatic
// refresh on 401, request/response interceptors, and global error handling.
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const TIMEOUT_MS = 60000;

// Token storage keys
export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'lumina_access_token',
  REFRESH_TOKEN: 'lumina_refresh_token',
  USER_DATA: 'lumina_user_data',
} as const;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ----------------------------------------------------------------------------
// Token utility functions
// ----------------------------------------------------------------------------

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
}

export function setUserData(user: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEYS.USER_DATA, JSON.stringify(user));
}

export function getUserData(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(TOKEN_KEYS.USER_DATA);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.USER_DATA);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

// ----------------------------------------------------------------------------
// Request Interceptor: Inject Authorization Header
// ----------------------------------------------------------------------------
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('[API] Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// ----------------------------------------------------------------------------
// Response Interceptor: Auto-refresh JWT on 401, Global Error Handling
// ----------------------------------------------------------------------------
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null): void {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized — attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Don't try to refresh if the failing request was itself a refresh or login
      const url = originalRequest.url || '';
      if (url.includes('/auth/refresh') || url.includes('/auth/login') || url.includes('/auth/register')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue concurrent requests while refresh is in-flight
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        isRefreshing = false;
        clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken: refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
        setTokens(newAccessToken, newRefreshToken || refreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle other error codes
    if (error.response?.status === 403) {
      console.warn('[API] 403 Forbidden: Missing permissions for this resource.');
      if (error.response.data && error.response.data.message) {
        if (typeof window !== 'undefined') {
          const { toast } = require('react-hot-toast');
          toast.error(error.response.data.message, { duration: 5000 });
        }
      }
    }
    
    if (error.response?.status === 429) {
      console.warn('[API] 429 Too Many Requests.');
      if (error.response.data && error.response.data.message) {
        if (typeof window !== 'undefined') {
          const { toast } = require('react-hot-toast');
          toast.error(error.response.data.message, { duration: 5000 });
        }
      }
    }

    if (error.response?.status && error.response.status >= 500) {
      console.error('[API] Critical Server Error Detected.');
    }

    if (error.code === 'ECONNABORTED') {
      console.warn('[API] Request Timeout: The server did not respond within the allocated time limit.');
    }

    return Promise.reject(error);
  }
);
