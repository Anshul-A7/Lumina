import { apiClient } from './api';

// ============================================================================
// SUBSCRIPTION SERVICE — Plan management, usage tracking, rate limits
// ============================================================================

export interface SubscriptionDetails {
  plan: 'FREE' | 'PLUS' | 'PRO';
  billingCycle: 'MONTHLY' | 'YEARLY';
  active: boolean;
  status: 'CREATED' | 'ACTIVE' | 'CANCELLATION_SCHEDULED' | 'CANCELLED' | 'HALTED' | 'PENDING' | 'COMPLETED';
  cancelAtCycleEnd?: boolean;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  startDate: string;
  endDate: string | null;
  monthlyPriceInr: number;
  limits: {
    pdfGeneration: number;
    imageGeneration: number;
    pdfAttachment: number;
    imageAttachment: number;
  };
  usage: {
    pdfsGenerated: number;
    imagesGenerated: number;
    pdfsAttached: number;
    imagesAttached: number;
    aiRequests: number;
  };
  remaining: {
    pdfGeneration: number | string;
    imageGeneration: number | string;
    pdfAttachment: number | string;
    imageAttachment: number | string;
  };
}

export interface UsageStats {
  plan: string;
  date: string;
  pdfsGenerated: number;
  pdfsGeneratedLimit: number;
  pdfsGeneratedRemaining: number;
  imagesGenerated: number;
  imagesGeneratedLimit: number;
  imagesGeneratedRemaining: number;
  pdfsAttached: number;
  pdfsAttachedLimit: number | string;
  imagesAttached: number;
  imagesAttachedLimit: number | string;
  aiRequests: number;
}

// ── Subscription Operations ─────────────────────────────────────────────

export async function getSubscription(): Promise<SubscriptionDetails> {
  const { data } = await apiClient.get('/subscription');
  return data;
}

export async function createCheckoutSession(
  plan: 'FREE' | 'PLUS' | 'PRO',
  billingCycle: 'MONTHLY' | 'YEARLY' = 'MONTHLY'
): Promise<{
  message: string;
  subscription_id: string;
}> {
  const { data } = await apiClient.post('/subscription/checkout', { plan, billingCycle });
  return data;
}

export async function cancelSubscription(): Promise<{ message: string }> {
  const { data } = await apiClient.post('/subscription/cancel');
  return data;
}

export async function getUsageStats(): Promise<UsageStats> {
  const { data } = await apiClient.get('/subscription/usage');
  return data;
}

// ── Utility ─────────────────────────────────────────────────────────────

export function getPlanLabel(plan: string): string {
  switch (plan) {
    case 'FREE': return 'Free';
    case 'PLUS': return 'Plus';
    case 'PRO': return 'Pro';
    default: return plan;
  }
}

export function getPlanColor(plan: string): string {
  switch (plan) {
    case 'FREE': return '#6b7280';
    case 'PLUS': return '#5533ff';
    case 'PRO': return '#f59e0b';
    default: return '#6b7280';
  }
}

export function formatLimit(value: number | string): string {
  if (value === 'unlimited' || value === 2147483647) return '∞';
  return String(value);
}
