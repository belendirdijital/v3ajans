import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { navigationLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/80">
      <Container>
        <div className="py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block transition-opacity hover:opacity-90">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  width={170}
                  height={40}
                  className="h-11 w-auto object-contain opacity-95"
                />
              </Link>
              <p className="mt-4 max-w-md text-slate-600 leading-relaxed">
                {siteConfig.description}
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Sayfalar
              </h3>
              <ul className="mt-4 space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-600 transition-colors hover:text-indigo-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                İletişim
              </h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-indigo-600"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <span className="text-slate-600">{siteConfig.phone}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-center text-sm text-slate-500">
              © {currentYear} {siteConfig.name}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
