import Image from "next/image";
import { galleryPairs, jobPhotos } from "@/content/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryPicker } from "./GalleryPicker";

/**
 * Signature section. All photos are real Cooks Property Services jobs from
 * the business's Google gallery — never stock, never generated. Only
 * confirmed same-location pairs appear in the interactive picker; other real
 * photos are shown separately as single proof shots, not implied pairs.
 */
export function BeforeAfter() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="on-dark bg-navy-900 py-16 md:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="gallery-heading"
            eyebrow="Real jobs, real results"
            title="See the difference."
            supporting="Pick a job below, then drag the slider. These are actual Cooks Property Services jobs in Greater Victoria."
            onDark
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-2xl">
          <GalleryPicker items={galleryPairs} />
        </Reveal>

        <Reveal>
          <h3 className="mt-16 text-center text-[0.8125rem] font-medium tracking-[0.14em] text-mist-200 uppercase">
            More real jobs
          </h3>
          <ul className="mt-6 flex flex-wrap justify-center gap-4">
            {jobPhotos.map((photo) => (
              <li
                key={photo.src}
                className="w-[calc(50%-0.5rem)] shrink-0 sm:w-[calc(25%-0.75rem)]"
              >
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-(--radius-card)">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-mist-200">
                    {photo.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
