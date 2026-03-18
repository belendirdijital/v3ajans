"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navigationLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={80}
              height={36}
              className="h-9 w-auto object-contain lg:h-10"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navigationLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-block py-1 text-sm font-medium transition-colors ${
                    active
                      ? "text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  } ${active ? "font-semibold" : ""} ${active ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-indigo-600" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href="/iletisim" size="sm">
              Teklif Al
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü aç"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                      active
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 px-4">
                <Button
                  href="/iletisim"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Teklif Al
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
