import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ExternalLink, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { serviceAreas, getServiceArea } from "@/content/service-areas";
import { breadcrumbSchema } from "@/lib/schema";
import { socialMeta } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/sections/FinalCta";

type AreaPageProps = {
  params: Promise<{ area: string }>;
};

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ area: area.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: AreaPageProps): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};
  const path = `/service-areas/${area.slug}`;
  const description = `Window cleaning, gutter cleaning, pressure washing, and full exterior property care in ${area.name}, BC. Licensed, insured, owner-operated, with free quotes and a fast response.`;
  const title = `Window, Gutter & Exterior Cleaning in ${area.name}, BC`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...socialMeta({ title, description, path }),
  };
}

export default async function ServiceAreaPage({ params }: AreaPageProps) {
  const { area: slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/service-areas" },
          { name: area.name, path: `/service-areas/${area.slug}` },
        ])}
      />

      <section
        aria-labelledby="area-heading"
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
                  href="/service-areas"
                  className="hover:text-white hover:underline"
                >
                  Service Areas
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {area.name}
              </li>
            </ol>
          </nav>
          <h1
            id="area-heading"
            className="font-display mt-6 max-w-3xl text-[clamp(2.5rem,1.8rem+3vw,4rem)] leading-none font-extrabold tracking-tight text-white"
          >
            Exterior cleaning in {area.name}, BC
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-100">
            {area.blurb}
          </p>
        </Container>
      </section>

      <section
        aria-label={`About our service in ${area.name}`}
        className="bg-white py-14 md:py-20"
      >
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700">{area.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-(--radius-card) border border-mist-200 bg-mist-50 p-5">
            <span
              className="flex items-center gap-1.5 font-semibold text-navy-900"
              aria-label={`Rated ${siteConfig.trust.googleRating.toFixed(1)} out of 5 on Google`}
            >
              <Star className="size-5 fill-blue-500 text-blue-500" aria-hidden="true" />
              {siteConfig.trust.googleRating.toFixed(1)} on Google
            </span>
            <a
              href={siteConfig.trust.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 underline-offset-4 hover:underline"
            >
              Read our reviews
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="area-services-heading"
        className="bg-mist-100 py-14 md:py-20"
      >
        <Container>
          <h2
            id="area-services-heading"
            className="font-display text-center text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-bold tracking-tight text-navy-900"
          >
            Services available in {area.name}
          </h2>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full items-start gap-3 rounded-(--radius-card) border border-mist-200 bg-white p-4 shadow-(--shadow-card) transition-colors hover:border-blue-500"
                >
                  <Check className="mt-0.5 size-5 shrink-0 text-blue-500" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-navy-900 group-hover:text-blue-600">
                      {service.name}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-700">
                      {service.short}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta
        location={`service_area_${area.slug}`}
        heading={`Ready for a free quote in ${area.name}?`}
      />
    </>
  );
}
