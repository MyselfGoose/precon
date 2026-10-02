import { BRAND, CONTENT_SERVICES, HOME_FAQ, SITE_COPY } from './content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.website;

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    ...(BRAND.legalName.startsWith('[PLACEHOLDER') ? {} : { legalName: BRAND.legalName }),
    url: SITE_URL,
    email: BRAND.email,
    telephone: BRAND.phoneDisplay,
    description: BRAND.description,
    areaServed: {
      '@type': 'Country',
      name: BRAND.serviceArea,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BRAND.phoneDisplay,
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: 'English',
      hoursAvailable: SITE_COPY.contact.hours,
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: SITE_URL,
    description: BRAND.description,
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
    },
  };
}

export function faqPageJsonLd(items: readonly [string, string][] = HOME_FAQ): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function servicesJsonLd(): Record<string, unknown>[] {
  return CONTENT_SERVICES.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    provider: {
      '@type': 'Organization',
      name: BRAND.name,
      url: SITE_URL,
    },
    areaServed: BRAND.serviceArea,
    url: `${SITE_URL}/services/${service.slug}`,
  }));
}
