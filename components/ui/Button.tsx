import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Switch outline/ghost styling for dark (navy) surfaces. */
  onDark?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

function variantClasses(variant: ButtonVariant, onDark: boolean): string {
  switch (variant) {
    case "primary":
      return "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-600";
    case "secondary":
      return onDark
        ? "border-2 border-white text-white hover:bg-white/10"
        : "border-2 border-navy-700 text-navy-700 hover:bg-navy-700/5";
    case "ghost":
      return onDark
        ? "text-white hover:bg-white/10"
        : "text-navy-700 hover:bg-navy-700/5";
  }
}

/**
 * Buttons that navigate render a real <a>; buttons that act render <button>.
 * CTA/phone tracking is applied by the client wrappers in ui/TrackedLinks.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    onDark = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-(--radius-btn) font-semibold transition-[background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none",
    sizeClasses[size],
    variantClasses(variant, onDark),
    className,
  );

  if ("href" in rest && typeof rest.href === "string") {
    const anchorProps = rest as Omit<AnchorProps, keyof CommonProps>;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
