import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
};

/** Small trust-signal chip, e.g. "Licensed & Insured", "5.0 ★ Google". */
export function Badge({ children, onDark = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
        onDark
          ? "border border-white/25 bg-white/10 text-white"
          : "border border-mist-200 bg-white text-navy-800",
        className,
      )}
    >
      {children}
    </span>
  );
}
