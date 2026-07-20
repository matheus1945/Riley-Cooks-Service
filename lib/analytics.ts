type EventName =
  | "phone_click"
  | "cta_click" // any "Get a Free Quote" button
  | "form_start" // first interaction with the form
  | "generate_lead"; // successful form submit (primary conversion)

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * Single tracking entry point. Pushes to the GTM dataLayer always; mirrors to
 * gtag/fbq only in direct mode (no GTM container configured). Safe to call
 * when no analytics platform is loaded — every global is guarded.
 */
export function track(
  event: EventName,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  const hasGtm = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

  // 1) GTM dataLayer (also the source GTM maps events from)
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });

  // 2) GA4 direct mode only
  if (!hasGtm && typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }

  // 3) Meta Pixel direct mode only
  if (!hasGtm && typeof w.fbq === "function") {
    const map: Record<EventName, string | null> = {
      generate_lead: "Lead",
      phone_click: "Contact",
      cta_click: null,
      form_start: null,
    };
    const standardEvent = map[event];
    if (standardEvent) {
      w.fbq("track", standardEvent, params);
    } else {
      w.fbq("trackCustom", event, params);
    }
  }

  // 4) Google Ads lead conversion in direct mode only
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const leadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
  if (
    !hasGtm &&
    event === "generate_lead" &&
    adsId &&
    leadLabel &&
    typeof w.gtag === "function"
  ) {
    w.gtag("event", "conversion", {
      send_to: `${adsId}/${leadLabel}`,
    });
  }
}
