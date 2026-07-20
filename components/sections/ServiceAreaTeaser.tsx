import Link from "next/link";
import { serviceAreas } from "@/content/service-areas";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneTextLink } from "@/components/ui/TrackedLinks";

export function ServiceAreaTeaser() {
  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="bg-white py-16 md:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="areas-heading"
            eyebrow="Where we work"
            title="Serving Greater Victoria and Vancouver Island"
            supporting="From downtown Victoria to the Malahat and up-Island. If you're on this list, we've got you covered."
          />
        </Reveal>
        <Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="flex min-h-11 items-center justify-center rounded-(--radius-btn) border border-mist-200 bg-mist-50 px-4 py-2.5 text-center font-medium text-navy-800 transition-colors hover:border-blue-500 hover:text-blue-600"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <p className="mt-8 text-center text-ink-700">
            Not sure if we cover your area?{" "}
            <PhoneTextLink location="service_area_teaser" className="text-blue-600">
              Call us
            </PhoneTextLink>{" "}
            and we may be able to help.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
