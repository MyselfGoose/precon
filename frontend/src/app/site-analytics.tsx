'use client';

import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';

const EVENT_NAMES = new Set<AnalyticsEvent>([
  'quote_form_submit',
  'quote_form_with_plans',
  'phone_click',
  'whatsapp_click',
  'sample_download',
  'social_link_click',
]);

function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return EVENT_NAMES.has(value as AnalyticsEvent);
}

function AnalyticsClickCapture() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest('[data-analytics]');
      if (!(el instanceof HTMLElement)) return;
      const name = el.dataset.analytics;
      if (!name || !isAnalyticsEvent(name)) return;
      const properties: Record<string, string> = {};
      if (el.dataset.analyticsSource) properties.source = el.dataset.analyticsSource;
      if (el.dataset.analyticsNetwork) properties.network = el.dataset.analyticsNetwork;
      trackEvent(name, Object.keys(properties).length ? properties : undefined);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}

export function SiteAnalytics() {
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'false') {
    return null;
  }
  return (
    <>
      <Analytics />
      <AnalyticsClickCapture />
    </>
  );
}
