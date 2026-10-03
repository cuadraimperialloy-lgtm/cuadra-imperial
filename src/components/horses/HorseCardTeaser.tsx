"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Horse, STATUS_COLORS } from "@/data/horses";
import { useStore } from "@/context/StoreContext";
import HorsePrice from "./HorsePrice";
import { Heart, Scale, Eye, MapPin, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface HorseCardTeaserProps {
  horse: Horse;
}

export default function HorseCardTeaser({ horse }: HorseCardTeaserProps) {
  const router = useRouter();
  const {
    isLoggedIn,
    openLeadWall,
    toggleWishlist,
    isInWishlist,
    addToComparison,
    removeFromComparison,
    isComparing,
    trackHorseView
  } = useStore();

  const [hoverIndex, setHoverIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const statusConfig = STATUS_COLORS[horse.status];
  const inWishlist = isInWishlist(horse.id);
  const comparing = isComparing(horse.id);

  // Click interceptor: If not logged in -> Lead Wall! If logged in -> Full detail
  const handleCardClick = (e: React.MouseEvent) => {
    trackHorseView(horse.id);

    if (!isLoggedIn) {
      e.preventDefault();
      openLeadWall(horse, "Ver ficha técnica y genealogía completa");
      return;
    }

    router.push(`/ejemplares/${horse.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverIndex(0);
      }}
      className="group relative rounded-2xl bg-[#09090B] border border-white/10 hover:border-[#D4AF37]/50 shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Photo Area with 3-photo hover carousel */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
        <Image
          src={horse.images[hoverIndex] || horse.images[0] || "/images/hero.jpg"}
          alt={horse.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover mini-dots preview for the 3 photos */}
        {horse.images.length > 1 && (
          <div
            className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {horse.images.slice(0, 3).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setHoverIndex(idx)}
                onClick={() => setHoverIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  hoverIndex === idx
                    ? "w-6 bg-[#D4AF37]"
                    : "w-2 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Ver foto ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span
            style={{ backgroundColor: statusConfig.bg, color: statusConfig.text }}
            className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md border ${statusConfig.border}`}
          >
            {statusConfig.label}
          </span>

          <div className="flex items-center gap-2">
            {/* Comparer toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (comparing) {
                  removeFromComparison(horse.id);
                } else {
                  addToComparison(horse.id);
                }
              }}
              title="Comparar ejemplar"
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                comparing
                  ? "bg-[#D4AF37] text-[#050507]"
                  : "bg-black/50 text-white/70 hover:text-white hover:bg-black/80"
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            {/* Wishlist toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(horse.id);
              }}
              title="Añadir a favoritos"
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                inWishlist
                  ? "bg-rose-600 text-white"
                  : "bg-black/50 text-white/70 hover:text-rose-400 hover:bg-black/80"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {/* Dynamic Social Proof View Counter */}
        <div className="absolute top-12 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-[9.5px] text-white/80 flex items-center gap-1.5 border border-white/10">
            <Eye className="w-3 h-3 text-[#D4AF37]" />
            <span>{horse.viewsCount || 12} personas viendo hoy</span>
          </span>
        </div>
      </div>

      {/* Content Area in Teaser Mode */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Subtitle / Breed / KFPS */}
          <div className="flex items-center justify-between text-[11px] text-[#D4AF37] mb-1 font-mono">
            <span className="uppercase tracking-widest font-semibold">Frisón KFPS Oficial</span>
            <span className="text-white/70">{horse.age}</span>
          </div>

          <h3 className="font-heading text-xl font-normal text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
            {horse.name}
          </h3>

          <p className="text-xs text-white/85 line-clamp-1 mt-0.5">
            {horse.subname}
          </p>

          {/* Specs Grid in Teaser Mode */}
          <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-white/5 text-[11px]">
            <div>
              <span className="text-white/70 block text-[9.5px] uppercase tracking-wider">Sexo</span>
              <span className="text-white font-medium">{horse.gender || "Semental"}</span>
            </div>
            <div>
              <span className="text-white/70 block text-[9.5px] uppercase tracking-wider">Alzada</span>
              <span className="text-white font-medium">{horse.height}</span>
            </div>
            <div>
              <span className="text-white/70 block text-[9.5px] uppercase tracking-wider">Nivel</span>
              <span className="text-white font-medium truncate block">{horse.level}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-[11px] text-white/75 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]/80 shrink-0" />
            <span className="truncate">{horse.location}</span>
          </div>
        </div>

        {/* Price & Primary CTA */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <HorsePrice horse={horse} isCompact={true} />

          {/* Main CTA: Ver detalles completos */}
          <button
            type="button"
            onClick={handleCardClick}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] border border-white/15 rounded-lg text-xs font-semibold text-white hover:text-[#D4AF37] uppercase tracking-widest transition-all flex items-center justify-center gap-2 group-hover:bg-[#D4AF37]/10"
          >
            <span>Ver detalles completos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
