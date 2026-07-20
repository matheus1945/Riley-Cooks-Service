import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services, getService, type Service } from "@/content/services";
import {
  breadcrumbSchema,
  faqListSchema,
  serviceSchema,
} from "@/lib/schema";
import { socialMeta } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { QuoteCta, CallButton } from "@/components/ui/TrackedLinks";
import { FinalCta } from "@/components/sections/FinalCta";

type ServicePageProps = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    ...socialMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      path,
    }),
  };
}

/** Same four-step promise on every service page. */
const processSteps = [
  {
    title: "Free quote",
    text: "Tell us about your property by phone or through the quote form. You get a clear, no-obligation quote, usually within 24 hours.",
  },
  {
    title: "We book a time",
    text: "We schedule a visit that works for you and confirm the details before we arrive.",
  },
  {
    title: "We do the work",
    text: "We show up on time, protect the surrounding area, and complete the job carefully and thoroughly.",
  },
  {
    title: "You are happy, or we sort it",
    text: "We check the result with you before we go. If anything needs another look, we take care of it.",
  },
];

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item): item is Service => Boolean(item));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]),
          serviceSchema(service, path),
          faqListSchema(service.faqs),
        ]}
      />

      {/* Hero */}
      <section
        aria-labelledby="service-heading"
        className="on-dark bg-navy-900 pt-28 pb-14 md:pt-36 md:pb-20"
      >
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-mist-200">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white hover:underline"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-(--radius-card) bg-white/10">
              <ServiceIcon name={service.icon} className="size-6 text-cyan-400" />
            </span>
            <p className="text-[0.8125rem] font-medium tracking-[0.16em] text-cyan-400 uppercase">
              Service
            </p>
          </div>

          <h1
            id="service-heading"
            className="font-display mt-5 max-w-3xl text-[clamp(2.5rem,1.8rem+3vw,4rem)] leading-none font-extrabold tracking-tight text-white"
          >
            {service.name} in Greater Victoria, BC
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-100">
            {service.heroTagline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuoteCta location={`service_${service.slug}_hero`} size="lg" />
            <CallButton
              location={`service_${service.slug}_hero`}
              size="lg"
              onDark
            />
          </div>
        </Container>
      </section>

      {/* Overview + what's included */}
      <section
        aria-labelledby="overview-heading"
        className="bg-white py-14 md:py-20"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <h2
                id="overview-heading"
                className="font-display text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-bold tracking-tight text-navy-900"
              >
                What our {service.name.toLowerCase()} covers
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-700">
                {service.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-(--radius-card) border border-mist-200 bg-mist-50 p-6 shadow-(--shadow-card)">
              <h3 className="font-display text-lg font-semibold text-navy-900">
                What&apos;s included
              </h3>
              <ul className="mt-4 space-y-3">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 leading-relaxed text-ink-700"
                  >
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-blue-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {service.heroImage && (
            <figure className="mt-12">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-(--radius-card) shadow-(--shadow-card)">
                <Image
                  src={service.heroImage.src}
                  alt={service.heroImage.alt}
                  fill
                  sizes="(min-width: 1024px) 1088px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-500">
                {service.heroImage.caption}
              </figcaption>
            </figure>
          )}
        </Container>
      </section>

      {/* Why it matters (localized) */}
      <section
        aria-labelledby="benefits-heading"
        className="bg-mist-100 py-14 md:py-20"
      >
        <Container>
          <SectionHeading
            id="benefits-heading"
            eyebrow="Local know-how"
            title="Why it matters in Greater Victoria"
          />
          <ul className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {service.benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="rounded-(--radius-card) border border-mist-200 bg-white p-6 shadow-(--shadow-card)"
              >
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-700">
                  {benefit.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section
        aria-labelledby="process-heading"
        className="bg-white py-14 md:py-20"
      >
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="Simple process"
            title="How it works"
          />
          <ol className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-(--radius-card) border border-mist-200 bg-mist-50 p-6"
              >
                <span
                  className="font-display text-3xl font-extrabold text-blue-500/40"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-lg font-semibold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Service FAQ */}
      <section
        aria-labelledby="service-faq-heading"
        className="bg-mist-100 py-14 md:py-20"
      >
        <Container className="max-w-3xl">
          <SectionHeading
            id="service-faq-heading"
            eyebrow="Good to know"
            title={`${service.name} questions`}
          />
          <dl className="mt-8 space-y-4">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-(--radius-card) border border-mist-200 bg-white p-6"
              >
                <dt className="font-display text-lg font-semibold text-navy-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-700">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="on-dark bg-navy-900 py-14 md:py-20"
        >
          <Container>
            <SectionHeading
              id="related-heading"
              eyebrow="Keep exploring"
              title="Related services"
              onDark
            />
            <ul className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="h-full">
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col rounded-(--radius-card) border border-white/10 bg-navy-800 p-6 transition-colors hover:border-cyan-400/50 hover:bg-navy-700"
                  >
                    <ServiceIcon name={item.icon} className="size-7 text-cyan-400" />
                    <h3 className="font-display mt-4 text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-mist-200">
                      {item.short}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400">
                      Learn more
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FinalCta
        location={`service_${service.slug}`}
        heading={`Ready for a free ${service.name.toLowerCase()} quote?`}
      />
    </>
  );
}
