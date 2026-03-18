import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export function AdminHeaderLogo() {
  return (
    <Link href="/admin" className="flex items-center gap-2">
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={56}
        height={25}
        className="h-7 w-auto object-contain"
      />
      <span className="text-slate-500">— Admin</span>
    </Link>
  );
}
