import { siteConfig } from "@/config/site";
import { services, type Service } from "@/content/services";
import { faqs } from "@/content/faqs";

type JsonLd = Record<string, unknown>;

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

function businessAddress(): JsonLd {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  };
}

function areaServed(): JsonLd[] {
  return siteConfig.serviceAreas.map((name) => ({
    "@type": "City",
    name,
  }));
}

/**
 * Site-wide LocalBusiness schema built only from confirmed siteConfig data.
 * aggregateRating is intentionally omitted while trust.reviewCount is null;
 * geo is included only when confirmed coordinates exist; priceRange is never
 * inferred.
 */
export function localBusinessSchema(): JsonLd {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    address: businessAddress(),
    areaServed: areaServed(),
    openingHoursSpecification: siteConfig.businessHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...DAYS],
      opens: hours.opens,
      closes: hours.closes,
    })),
    ...(siteConfig.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: siteConfig.geo.lat,
            longitude: siteConfig.geo.lng,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

function serviceProvider(): JsonLd {
  return {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    telephone: siteConfig.phoneE164,
    url: siteConfig.url,
  };
}

/** One Service schema per published service, provided by the business. */
export function serviceSchemas(): JsonLd[] {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    provider: serviceProvider(),
    areaServed: areaServed(),
  }));
}

/** Richer single Service schema for a dedicated service page. */
export function serviceSchema(service: Service, path: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${siteConfig.url}${path}`,
    provider: serviceProvider(),
    areaServed: areaServed(),
  };
}

/** FAQPage schema from any list of question/answer pairs. */
export function faqListSchema(
  items: Array<{ question: string; answer: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** FAQPage schema mirroring the visible on-page FAQ exactly. */
export function faqPageSchema(): JsonLd {
  return faqListSchema(faqs);
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
