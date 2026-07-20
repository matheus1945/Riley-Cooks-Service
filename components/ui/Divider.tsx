import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
};

/**
 * Restrained water-flow divider: a thin single-colour curve echoing the
 * droplet logo's sweep. Decorative only — use at most 2–3 times per page.
 */
export function Divider({ className }: DividerProps) {
  return (
    <div aria-hidden="true" className={cn("overflow-hidden py-2", className)}>
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="mx-auto h-6 w-full max-w-6xl text-cyan-500/60"
        fill="none"
      >
        <path
          d="M0 28 C 240 4, 420 40, 640 22 S 1040 6, 1200 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
