import { ExternalLink, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { reviews } from "@/content/reviews";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} className="size-5 fill-cyan-400 text-cyan-400" />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/**
 * Confirmed real Google reviews only. While content/reviews.ts is empty
 * (// TODO: add real approved review texts), this renders the confirmed 5.0
 * rating with a link to the Google profile instead of testimonial cards.
 */
export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="on-dark bg-navy-800 py-16 md:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="reviews-heading"
            eyebrow="Reviews"
            title="Rated 5.0 by your neighbours"
            supporting="Every review is from a real Greater Victoria customer on our public Google profile."
            onDark
          />
        </Reveal>

        {reviews.length > 0 ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={`${review.name}-${review.text.slice(0, 24)}`}>
                <Reveal className="h-full">
                  <figure className="flex h-full flex-col rounded-(--radius-card) border border-white/10 bg-navy-900/60 p-6">
                    <StarRow />
                    <blockquote className="mt-4 flex-1 leading-relaxed text-mist-100">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-sm font-medium text-mist-200">
                      {review.name}
                      {review.area ? ` · ${review.area}` : ""}
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="mx-auto mt-12 max-w-xl rounded-(--radius-card) border border-white/10 bg-navy-900/60 p-8 text-center">
            <p
              className="font-display text-6xl font-extrabold text-white"
              aria-label={`Rated ${siteConfig.trust.googleRating.toFixed(1)} out of 5 on Google`}
            >
              {siteConfig.trust.googleRating.toFixed(1)}
            </p>
            <div className="mt-3 flex justify-center">
              <StarRow />
            </div>
            <p className="mt-4 leading-relaxed text-mist-200">
              A perfect rating from local homeowners and businesses on Google.
            </p>
          </Reveal>
        )}

        <Reveal className="mt-10 text-center">
          <a
            href={siteConfig.trust.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-(--radius-btn) bg-white px-6 py-3 font-semibold text-navy-900 shadow-(--shadow-card) transition-colors hover:bg-mist-100"
          >
            <GoogleIcon />
            Check out our Google reviews
            <ExternalLink className="size-4 text-ink-500" aria-hidden="true" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
