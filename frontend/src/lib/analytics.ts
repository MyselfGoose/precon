'use client';

import { track } from '@vercel/analytics';

export type AnalyticsEvent =
  | 'quote_form_submit'
  | 'quote_form_with_plans'
  | 'phone_click'
  | 'whatsapp_click'
  | 'sample_download'
  | 'social_link_click';

const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false';

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  if (!analyticsEnabled || typeof window === 'undefined') return;
  try {
    track(event, properties);
  } catch {
    // Analytics must never break UX.
  }
}
