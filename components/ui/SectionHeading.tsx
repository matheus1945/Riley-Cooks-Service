import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** id applied to the H2 so sections can reference it via aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: string;
  supporting?: string;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  supporting,
  onDark = false,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[0.8125rem] font-medium tracking-[0.14em] uppercase",
            onDark ? "text-cyan-400" : "text-blue-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight font-bold tracking-tight",
          onDark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {supporting && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            onDark ? "text-mist-200" : "text-ink-700",
          )}
        >
          {supporting}
        </p>
      )}
    </div>
  );
}
