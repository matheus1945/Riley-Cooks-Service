import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const CONSENT_STORAGE_KEY = "cps-consent";

const hasGtm = Boolean(GTM_ID);
const hasGoogle = Boolean(GTM_ID || GA4_ID || ADS_ID);
export const hasAnyAnalytics = Boolean(
  GTM_ID || GA4_ID || ADS_ID || META_PIXEL_ID,
);

/**
 * Consent Mode v2 defaults to denied before any Google tag executes; a stored
 * "granted" choice is re-applied on load. Runs inline during HTML parse, so it
 * always precedes the afterInteractive tag scripts below.
 */
const consentDefaultSnippet = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
try {
  if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
} catch (e) {}
`;

const gtmSnippet = GTM_ID
  ? `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`
  : "";

/** Meta Pixel queues everything behind fbq('consent') until the user accepts. */
const metaPixelSnippet = META_PIXEL_ID
  ? `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
var cpsMetaConsent = 'revoke';
try { if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') cpsMetaConsent = 'grant'; } catch (e) {}
fbq('consent', cpsMetaConsent);
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`
  : "";

const directGtagId = GA4_ID || ADS_ID;

/**
 * Rendered once in the root layout. Two mutually exclusive modes:
 * - GTM mode (NEXT_PUBLIC_GTM_ID set): only the GTM container loads; GA4,
 *   Google Ads, and Meta Pixel are configured inside GTM.
 * - Direct mode: GA4 / Google Ads / Meta Pixel load individually, each only
 *   when its env var is set.
 * With no env vars set, this renders nothing at all. No <noscript> fallbacks —
 * they cannot respect the stored consent state.
 */
export function TrackingScripts() {
  if (!hasAnyAnalytics) return null;

  return (
    <>
      {hasGoogle && (
        <script dangerouslySetInnerHTML={{ __html: consentDefaultSnippet }} />
      )}
      {hasGtm ? (
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: gtmSnippet }}
        />
      ) : (
        <>
          {directGtagId && (
            <>
              <Script
                id="gtag-js"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${directGtagId}`}
              />
              <Script
                id="gtag-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
gtag('js', new Date());
${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
`,
                }}
              />
            </>
          )}
          {META_PIXEL_ID && (
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: metaPixelSnippet }}
            />
          )}
        </>
      )}
    </>
  );
}
