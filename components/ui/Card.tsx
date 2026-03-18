import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-100 transition-all duration-300 ${
        hover ? "hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
