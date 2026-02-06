import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

/**
 * Button Variants:
 * - primary: Blue background, white text (main CTA)
 * - secondary: White background, dark text (light backgrounds)
 * - outline: Transparent with blue border & text (light backgrounds)
 * - ghost: Transparent, gray text (subtle actions)
 * - outline-white: Transparent with white border & text (dark backgrounds)
 * - ghost-white: Transparent, white text (dark backgrounds)
 */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "outline-white" | "ghost-white";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    icon?: LucideIcon;
    iconPosition?: "left" | "right";
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    // Main CTA - blue background, white text
    primary: "bg-[var(--color-primary)] !text-white hover:bg-[var(--color-primary-hover)] shadow-md hover:shadow-lg",

    // Secondary - white background, dark text (for light backgrounds)
    secondary: "bg-white !text-gray-900 shadow-md hover:shadow-lg border border-gray-200",

    // Outline - transparent with blue border (for light backgrounds)
    outline: "bg-transparent !text-[var(--color-primary)] border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:!text-white",

    // Ghost - subtle, transparent (for light backgrounds)
    ghost: "bg-transparent !text-gray-700 hover:bg-gray-100",

    // Outline White - for dark/colored backgrounds
    "outline-white": "bg-transparent !text-white border-2 border-white hover:bg-white/20",

    // Ghost White - for dark/colored backgrounds
    "ghost-white": "bg-transparent !text-white hover:bg-white/10",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    icon: Icon,
    iconPosition = "left",
    className,
    onClick,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    const combinedClassName = twMerge(
        clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)
    );

    const content = (
        <>
            {Icon && iconPosition === "left" && <Icon size={size === "sm" ? 16 : size === "md" ? 18 : 20} />}
            {children}
            {Icon && iconPosition === "right" && <Icon size={size === "sm" ? 16 : size === "md" ? 18 : 20} />}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={combinedClassName}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </button>
    );
}
