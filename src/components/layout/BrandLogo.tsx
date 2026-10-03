"use client";

import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export default function BrandLogo({
  className = "",
}: BrandLogoProps) {
  return (
    <Link href="/" className={`flex items-center group shrink-0 ${className}`} title="Cuadra Imperial Loy - Inicio">
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D4AF37]/90 shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-[#09090B] shrink-0 group-hover:scale-105 group-hover:border-[#D4AF37] transition-all duration-300">
        <Image
          src="/images/logo-cuadra-imperial.jpg"
          alt="Cuadra Imperial Loy"
          fill
          className="object-cover"
          priority
        />
      </div>
    </Link>
  );
}
