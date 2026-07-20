# Cooks Property Services — website

Lead-generation marketing site for Cooks Property Services (exterior cleaning,
Victoria BC). Built with Next.js (App Router, TypeScript strict), Tailwind CSS
v4, and `lucide-react`. The whole site is optimized for one outcome: a phone
call or a submitted quote request.

## Local setup

```bash
nvm use            # Node LTS (see .nvmrc)
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

Other commands: `npm run build` (production build), `npm run lint`.

## Environment variables

All runtime configuration is read from env vars — nothing is hardcoded.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Quote form POST target (Formspree / Web3Forms / n8n webhook). The form shows an error state with a call fallback until this is set. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container — **the recommended way to turn on analytics** |
| `NEXT_PUBLIC_GA4_ID` | GA4 direct (only used when GTM is not set) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads direct (only used when GTM is not set) |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Google Ads conversion label for `generate_lead` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel direct (only used when GTM is not set) |

## Turning on analytics

Everything ships dormant: with no IDs set, no tracking scripts load at all.

1. **Recommended:** set only `NEXT_PUBLIC_GTM_ID` and redeploy once. Add GA4,
   Google Ads, and Meta Pixel tags inside GTM's UI afterwards — no further
   deploys needed. The site pushes these dataLayer events for GTM to map:
   `phone_click`, `cta_click`, `form_start`, `generate_lead` (each with a
   `location` parameter).
2. **Direct mode:** leave GTM blank and set any of GA4 / Ads / Meta IDs. The
   site loads each tag itself and mirrors the same events.

Never set GTM **and** direct IDs for the same platform — the code only loads
one mode, with GTM winning, to prevent duplicate tags.

Consent: Google Consent Mode v2 defaults to **denied**, and the Meta Pixel is
held behind `fbq('consent')`. The banner's Accept/Decline choice is stored in
`localStorage` and applied on every visit. There are no `<noscript>` tracking
fallbacks because they can't respect consent.

## Editing content

- **Business identity / NAP / hours / trust signals:** `config/site.ts` —
  the single source of truth. Every page, the footer, and the JSON-LD read
  from it; never retype the phone number or address anywhere else.
- **Services:** `content/services.ts`
- **Reviews:** `content/reviews.ts` — currently empty on purpose. Paste real
  approved Google reviews (text + first name) and cards appear automatically;
  the section shows the 5.0-rating fallback until then. Never invent reviews.
- **FAQs:** `content/faqs.ts` (also feeds the FAQPage structured data)
- **Service areas:** `content/service-areas.ts` (pages are statically
  generated from this list — keep it in sync with `siteConfig.serviceAreas`)
- **Photos:** `public/images/` — all real Cooks Property Services job photos.
  Replace/extend with more real photos only; no stock imagery.

## Deploying to Cloudflare Pages

The site is a **fully static export** (`output: "export"` in `next.config.ts`).
Every route is prerendered to HTML, so there is no server runtime, no adapter,
and nothing to keep warm. `next build` writes a plain `out/` folder that
Cloudflare Pages serves straight from the edge.

### Option A — Connect the Git repo (recommended)

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
Git**, pick this repo, then set:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) — or "None" |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `24` (matches `.nvmrc`; set `NODE_VERSION=24` if needed) |

**Environment variables (Production _and_ Preview):** these are inlined at
**build time**, so they must be set in the Pages project, not just in a local
`.env.local` (which is git-ignored and never uploaded):

- `NEXT_PUBLIC_SITE_URL` — production URL (e.g. `https://www.cookspropertysvcs.com`)
- `NEXT_PUBLIC_FORM_ENDPOINT` — the quote-form webhook
- Any analytics IDs you want live (`NEXT_PUBLIC_GTM_ID`, etc.)

Every push to the production branch rebuilds and redeploys automatically.

### Option B — Direct upload with Wrangler

```bash
npm run build
npx wrangler pages deploy out --project-name cooks-property-services
```

Set the same build-time env vars locally (or in `.env.local`) before building,
since they are baked into the static output.

### After deploying

Confirm these resolve at the production domain: `/sitemap.xml`, `/robots.txt`,
`/services`, a service page (e.g. `/services/window-cleaning`), and a 404
(serves `out/404.html`). Then submit `sitemap.xml` in Google Search Console.

## Local visibility note

The Google Business Profile is a big part of local search. This site supports
it (fast, consistent NAP from `config/site.ts`, LocalBusiness/Service/FAQ
structured data, and per-area pages), but keep the profile itself complete,
accurate, and verified — reviews and photos there feed rankings too.

## Outstanding TODOs

Search the repo for `TODO:` — notably: real review texts
(`content/reviews.ts`), Facebook/Instagram URLs (`config/site.ts`), final
logo SVG + light-background variant, PNG manifest icons, and owner review of
`/privacy` and the per-service page copy (`content/services.ts`).

The quote-form webhook is set in `.env.local` for local dev; remember to also
set `NEXT_PUBLIC_FORM_ENDPOINT` in the Cloudflare Pages project (it is inlined
at build time). Owner may also confirm a Google review count so an
`aggregateRating` can be added to the LocalBusiness structured data.
