import Image from "next/image";
import { cn } from "@/lib/utils";

type SplitThumbnailProps = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  selected: boolean;
};

/**
 * Static split preview for a before/after pair: left half shows the before
 * photo, right half the after photo. Purely presentational — the parent
 * button carries the accessible name and click handling.
 */
export function SplitThumbnail({ before, after, selected }: SplitThumbnailProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-(--radius-btn) ring-2 ring-offset-2 ring-offset-navy-900 transition-colors duration-200",
        selected ? "ring-cyan-400" : "ring-transparent",
      )}
    >
      <Image src={before.src} alt="" fill sizes="180px" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 50%)" }}>
        <Image src={after.src} alt="" fill sizes="180px" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/80"
      />
    </div>
  );
}
