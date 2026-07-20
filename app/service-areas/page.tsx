import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceAreas } from "@/content/service-areas";
import { breadcrumbSchema } from "@/lib/schema";
import { socialMeta } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { QuoteCta } from "@/components/ui/TrackedLinks";

const areasDescription =
  "Cooks Property Services provides window, gutter, and exterior cleaning across Greater Victoria and Vancouver Island, from Victoria and Saanich to Sooke, Duncan, and Nanaimo.";

export const metadata: Metadata = {
  title: "Service Areas · Greater Victoria & Vancouver Island",
  description: areasDescription,
  alternates: { canonical: "/service-areas" },
  ...socialMeta({
    title: "Service Areas · Greater Victoria & Vancouver Island",
    description: areasDescription,
    path: "/service-areas",
  }),
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/service-areas" },
        ])}
      />
      <section
        aria-labelledby="areas-index-heading"
        className="on-dark bg-navy-900 pt-28 pb-14 md:pt-36 md:pb-20"
      >
        <Container>
          <p className="text-[0.8125rem] font-medium tracking-[0.16em] text-cyan-400 uppercase">
            Where we work
          </p>
          <h1
            id="areas-index-heading"
            className="font-display mt-3 text-[clamp(2.5rem,1.8rem+3vw,4rem)] leading-none font-extrabold tracking-tight text-white"
          >
            Areas we serve
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-100">
            Cooks Property Services covers Greater Victoria and Vancouver
            Island. Every service we offer is available in every area below.
            Free quotes, fast response.
          </p>
        </Container>
      </section>

      <section aria-label="Service area list" className="bg-mist-50 py-14 md:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <li key={area.slug} className="h-full">
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex h-full flex-col rounded-(--radius-card) border border-mist-200 bg-white p-6 shadow-(--shadow-card) transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) motion-reduce:transform-none"
                >
                  <h2 className="font-display text-xl font-semibold text-navy-900">
                    {area.name}
                  </h2>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-700">
                    {area.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:underline">
                    Exterior cleaning in {area.name}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <QuoteCta location="service_areas_index" size="lg" />
          </div>
        </Container>
      </section>
    </>
  );
}
