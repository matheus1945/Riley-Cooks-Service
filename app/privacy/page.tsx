import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy & Analytics Disclosure",
  description:
    "How Cooks Property Services handles quote-request details, cookies, and analytics on this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="on-dark bg-navy-900 pt-28 pb-12 md:pt-36 md:pb-16">
        <Container>
          <h1 className="font-display text-[clamp(2.25rem,1.8rem+2vw,3.5rem)] leading-none font-extrabold tracking-tight text-white">
            Privacy &amp; Analytics Disclosure
          </h1>
          {/* TODO: owner to review this page and confirm an effective date */}
          <p className="mt-4 text-mist-200">
            Plain-language notes on what this website collects and why.
          </p>
        </Container>
      </section>

      <section aria-label="Privacy details" className="bg-white py-14 md:py-20">
        <Container className="max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Quote requests
            </h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              When you send the quote form, we receive the details you enter:
              your name, phone number, the service you&apos;re interested in,
              your area, and any optional email or message. We use that
              information only to respond to your request and prepare your
              quote. We don&apos;t sell it or share it for marketing.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Cookies &amp; analytics
            </h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              This site can use Google Tag Manager, Google Analytics 4, Google
              Ads, and Meta (Facebook) Pixel to understand how visitors use the
              site and to measure advertising. These tools stay switched off
              until you press <strong>Accept</strong> on the cookie banner.
              If you press <strong>Decline</strong>, or never answer, no
              analytics or advertising cookies are set.
            </p>
            <p className="mt-3 leading-relaxed text-ink-700">
              Your choice is stored in your browser (localStorage) so we
              don&apos;t ask again on every visit. You can change your mind by
              clearing this site&apos;s browsing data, which brings the banner
              back.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Phone calls
            </h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              Tapping a phone number on this site simply starts a normal phone
              call from your device. If analytics are enabled and accepted, we
              count that a call button was tapped, not who called.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Questions
            </h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              Contact {siteConfig.name} at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-blue-600 underline underline-offset-4"
              >
                {siteConfig.email}
              </a>{" "}
              or {siteConfig.phone}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
