import {
  Droplets,
  Eraser,
  Leaf,
  PaintRoller,
  PanelsTopLeft,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the `icon` string on a Service to its lucide-react icon. Shared by the
 * homepage services grid, the /services index, and the detail pages so the
 * icon set stays in one place.
 */
const icons: Record<string, LucideIcon> = {
  Sparkles,
  PanelsTopLeft,
  Waves,
  ShieldCheck,
  Droplets,
  ShowerHead,
  Leaf,
  PaintRoller,
  Eraser,
};

type ServiceIconProps = {
  /** The Service.icon value (e.g. "Sparkles"). */
  name: string;
  className?: string;
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
