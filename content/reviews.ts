export type Review = {
  /** Customer first name (confirmed attribution only). */
  name: string;
  /** Neighbourhood/area — include only when confirmed. */
  area?: string;
  rating: 5;
  text: string;
};

/**
 * Confirmed real Google reviews only. The business has a 5.0 Google rating,
 * but the full approved review texts were not part of the supplied business
 * information, so no testimonial cards are published yet.
 *
 * // TODO: paste 3–4 real Google reviews here (text + first name, and
 * // neighbourhood only if the reviewer stated it). Never invent testimonials.
 * Until this array has entries, the Reviews section shows the confirmed
 * 5.0 rating with a link to the Google profile instead of review cards.
 */
export const reviews: Review[] = [];
