import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { breadcrumbSchema } from "@/lib/schema";
import { socialMeta } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { FinalCta } from "@/components/sections/FinalCta";

const description =
  "Window cleaning, gutter cleaning, pressure washing, soft washing, moss removal, painting, and more across Greater Victoria and Vancouver Island. Licensed, insured, owner-operated, with free quotes.";

export const metadata: Metadata = {
  title: "Our Services",
  description,
  alternates: { canonical: "/services" },
  ...socialMeta({
    title: "Our Services · Cooks Property Services",
    description,
    path: "/services",
  }),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section
        aria-labelledby="services-index-heading"
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
              <li aria-current="page" className="text-white">
                Services
              </li>
            </ol>
          </nav>
          <p className="mt-6 text-[0.8125rem] font-medium tracking-[0.16em] text-cyan-400 uppercase">
            What we do
          </p>
          <h1
            id="services-index-heading"
            className="font-display mt-3 max-w-3xl text-[clamp(2.5rem,1.8rem+3vw,4rem)] leading-none font-extrabold tracking-tight text-white"
          >
            Exterior services for Greater Victoria
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-100">
            From window and gutter cleaning to pressure washing, moss removal,
            and more, every service is available across Greater Victoria and
            Vancouver Island. Licensed, insured, owner-operated, and every quote
            is free.
          </p>
        </Container>
      </section>

      <section aria-label="All services" className="bg-mist-50 py-14 md:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-(--radius-card) border border-mist-200 border-l-4 border-l-blue-500 bg-white p-6 shadow-(--shadow-card) transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) motion-reduce:transform-none"
                >
                  <ServiceIcon name={service.icon} className="size-7 text-blue-500" />
                  <h2 className="font-display mt-4 text-xl font-semibold text-navy-900">
                    {service.name}
                  </h2>
                  <p className="mt-1.5 leading-relaxed text-ink-700">
                    {service.short}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-ink-700">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-cyan-500"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-blue-600">
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

      <FinalCta location="services_index" heading="Ready for a free quote?" />
    </>
  );
}
