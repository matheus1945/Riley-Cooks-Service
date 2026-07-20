/**
 * Single source of truth for business identity, NAP, contact details,
 * trust signals, URLs, hours, and global CTA copy.
 * Editorial content (services, reviews, FAQs, area copy) lives in content/*.
 */
export const siteConfig = {
  name: "Cooks Property Services",
  shortName: "Cooks Property",
  tagline: "Quality is our #1 priority",
  description:
    "Professional window cleaning, gutter cleaning, pressure washing, soft washing, and exterior property maintenance in Greater Victoria, BC. Licensed, insured, owner-operated, and offering free quotes.",
  url: "https://www.cookspropertysvcs.com",
  ogImage: "/images/og-image.jpg", // 1200x630
  phone: "(250) 813-2216",
  phoneE164: "+12508132216", // used for tel: links
  email: "Riley@CooksPropertySvcs.com",
  address: {
    street: "1465 Derby Road",
    locality: "Victoria",
    region: "BC",
    regionName: "British Columbia",
    postalCode: "V8P 1T2",
    country: "CA",
  },
  // Confirmed public coordinates for LocalBusiness schema + geo meta, when available
  geo: null as { lat: number; lng: number } | null,
  serviceAreas: [
    "Victoria",
    "Saanich",
    "Sidney",
    "Oak Bay",
    "Langford",
    "Colwood",
    "View Royal",
    "Sooke",
    "Esquimalt",
    "Duncan",
    "Salt Spring Island",
    "Nanaimo",
    "Malahat",
  ],
  owner: { name: "Riley Cook", role: "Owner-Operator" },
  // Trust signals shown across the site
  trust: {
    licensed: true,
    insured: true,
    insuranceCoverage: "CAD $2 Million",
    googleRating: 5.0,
    googleReviewsUrl:
      "https://www.google.com/search?sca_esv=0764ec3eacfc6f66&rlz=1C5OZZY_enCA1210CA1210&sxsrf=APpeQnufdgSE73474i0HDPJGL5TIpyc7wA:1784400435384&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_2xfaH7a8b_13s43dWXkrPdDA3vk1z5hKLH3eKlWniS8is7XAR1Dyb-DyPgZBYLOwhJ92IKaCecM-h9e7ic53rYIEnF2oMZhXEdE-kL6zw_DuPUPrg%3D%3D&q=Cooks+Property+Services+Coment%C3%A1rios&sa=X&biw=1470&bih=835&dpr=2&zx=1784400445661&dlnr=1&ved=2ahUKEwjz2pDV8dyVAxXVIzQIHcAyAo8Ql6ENegQIBxAG",
    reviewCount: null as number | null,
    ownerOperated: true,
    available24Hours: true,
    onTimeGuarantee: true,
  },
  businessHours: [
    {
      days: "Mon–Sun",
      opens: "00:00",
      closes: "23:59",
      label: "Open 24 Hours",
    },
  ],
  social: {
    google: "https://share.google/tvVpFpcMnTBDjLoAY",
    facebook: "", // TODO (business card / profile exists)
    instagram: "",
  },
  primaryCta: "Get a Free Quote",
  responsePromise: "Fast response within 24 hours",
  // Analytics IDs are read from env, NOT stored here (see lib/analytics.ts).
} as const;

export type SiteConfig = typeof siteConfig;
