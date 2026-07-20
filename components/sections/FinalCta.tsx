import { Clock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CallButton } from "@/components/ui/TrackedLinks";
import { QuoteForm } from "@/components/forms/QuoteForm";

type FinalCtaProps = {
  /** Tracking location prefix, e.g. "home_final_cta". */
  location?: string;
  /** Optional heading override for service-area pages. */
  heading?: string;
};

export function FinalCta({
  location = "home_final_cta",
  heading = "Ready for a Free Quote?",
}: FinalCtaProps) {
  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="on-dark bg-navy-900 py-16 md:py-24"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2
              id="quote-heading"
              className="font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight font-bold tracking-tight text-white"
            >
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mist-100">
              Tell us what your property needs and we&apos;ll take it from
              there. {siteConfig.responsePromise}.
            </p>
            <ul className="mt-6 space-y-3 text-mist-200">
              <li className="flex items-center gap-3">
                <Clock className="size-5 shrink-0 text-cyan-400" aria-hidden="true" />
                {siteConfig.responsePromise}
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="size-5 shrink-0 text-cyan-400" aria-hidden="true" />
                Licensed &amp; insured, {siteConfig.trust.insuranceCoverage} coverage
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-sm font-medium tracking-[0.14em] text-mist-200 uppercase">
                Rather talk it through?
              </p>
              <div className="mt-3">
                <CallButton location={location} onDark size="lg" />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <QuoteForm location={location} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
