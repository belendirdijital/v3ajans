import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50";

  const variants = {
    primary:
      "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-[0.98]",
    secondary:
      "bg-slate-800 text-white shadow-lg shadow-slate-800/25 hover:bg-slate-700 hover:shadow-xl active:scale-[0.98]",
    outline:
      "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white active:scale-[0.98]",
    ghost:
      "text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]",
    light:
      "bg-white text-indigo-600 shadow-xl hover:bg-slate-100 hover:shadow-2xl active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
