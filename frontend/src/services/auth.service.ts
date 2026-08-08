import { apiClient, setTokens, setUserData, clearAuth, getRefreshToken, getAccessToken } from '../lib/api';

// ============================================================================
// LUMINA — AUTHENTICATION SERVICE
// ============================================================================
// Complete authentication service aligned with the Spring Boot backend API.
// Handles login, register, Google OAuth, forgot/reset password, account
// management, and session persistence.
// ============================================================================

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  authProvider: 'LOCAL' | 'GOOGLE';
  emailVerified: boolean;
  profileImageUrl: string | null;
  createdAt: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  message: string;
  errors?: Record<string, string>;
}

/**
 * Extract a human-readable error message from an Axios error response.
 */
function extractErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string }; status?: number } };
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (!axiosError.response || axiosError.response.status === 0) {
      return 'Unable to reach the server. Please check your connection and try again.';
    }
    if (axiosError.response?.status === 401) {
      return 'Invalid email or password. Please try again.';
    }
    if (axiosError.response?.status === 403) {
      return 'You do not have permission to perform this action.';
    }
    if (axiosError.response?.status && axiosError.response.status >= 500) {
      return 'A server error occurred. Please try again later.';
    }
  }
  if (error && typeof error === 'object' && 'message' in error) {
    const msg = (error as { message: string }).message;
    if (msg.includes('Network Error') || msg.includes('ECONNREFUSED')) {
      return 'Unable to reach the server. Please ensure the backend is running.';
    }
    return msg;
  }
  return 'An unexpected error occurred. Please try again.';
}

export class AuthService {

  /**
   * Register a new user with email and password.
   * Returns a success message. User must verify email next.
   */
  static async register(payload: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>('/auth/register', payload);
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Verify email with OTP.
   * Backend auto-logs in and returns JWT tokens + user profile.
   */
  static async verifyEmail(email: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/verify-email', { email, otp });
      const data = response.data;

      setTokens(data.accessToken, data.refreshToken);
      setUserData(data.user as unknown as Record<string, unknown>);

      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Authenticate with email and password.
   */
  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      const data = response.data;

      setTokens(data.accessToken, data.refreshToken);
      setUserData(data.user as unknown as Record<string, unknown>);

      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Authenticate with Google OAuth credential (JWT from Google Identity Services).
   */
  static async googleLogin(credential: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/google', { credential });
      const data = response.data;

      setTokens(data.accessToken, data.refreshToken);
      setUserData(data.user as unknown as Record<string, unknown>);

      return data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Send a password reset email. Always resolves (to prevent email enumeration).
   */
  static async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Reset password using a token from the reset email.
   */
  static async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>('/auth/reset-password', {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Get the currently authenticated user's profile.
   */
  static async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>('/auth/me');
      setUserData(response.data as unknown as Record<string, unknown>);
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Change password for authenticated user.
   */
  static async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Delete the authenticated user's account.
   */
  static async deleteAccount(): Promise<{ message: string }> {
    try {
      const response = await apiClient.delete<{ message: string }>('/auth/account');
      clearAuth();
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }

  /**
   * Logout: invalidate refresh token on server, clear local storage.
   */
  static async logout(): Promise<void> {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken }).catch(() => {
          // Server-side logout is best-effort; always clear local state
        });
      }
    } finally {
      clearAuth();
    }
  }

  /**
   * Check if user has an active local session (access token exists).
   */
  static isAuthenticated(): boolean {
    return !!getAccessToken();
  }

  /**
   * Get cached user data from localStorage.
   */
  static getCachedUser(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('lumina_user_data');
      return raw ? (JSON.parse(raw) as UserProfile) : null;
    } catch {
      return null;
    }
  }
}
