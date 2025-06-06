import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
  /**
   * Optional ARIA role for the badge
   */
  role?: string;
  /**
   * Optional ARIA label for the badge
   */
  ariaLabel?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
  role,
  ariaLabel,
}: BadgeProps) {
  const baseClassName = "inline-flex items-center rounded-full font-medium";

  const variantClassNames = {
    default: "bg-[#f8f8f6] text-[#666]",
    primary: "bg-[#f8f3e7] text-[#c28b3b]",
    success: "bg-green-100 text-green-600",
    warning: "bg-amber-100 text-amber-600",
    danger: "bg-red-100 text-red-600",
    info: "bg-blue-100 text-blue-600",
  };

  const sizeClassNames = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
  };

  // For status badges, use the appropriate role
  const badgeRole =
    role ||
    (variant === "success" ||
    variant === "warning" ||
    variant === "danger" ||
    variant === "info"
      ? "status"
      : undefined);

  return (
    <span
      className={`${baseClassName} ${variantClassNames[variant]} ${sizeClassNames[size]} ${className}`}
      role={badgeRole}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
}
