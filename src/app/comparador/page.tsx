"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Scale, X, ArrowLeft, ArrowRight, ShieldCheck, Check } from "lucide-react";
import HorsePrice from "@/components/horses/HorsePrice";

export default function ComparadorPage() {
  const { comparisonList, removeFromComparison, horses, isLoggedIn, openLeadWall } = useStore();

  const comparedHorses = horses.filter((h) => comparisonList.includes(h.id));

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto bg-[#09090B]">
      <Link
        href="/ejemplares"
        className="inline-flex items-center gap-2 text-white/85 hover:text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Catálogo
      </Link>

      <div className="mb-10 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
          <Scale className="w-4 h-4" />
          <span>Herramienta de Selección Zootécnica</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl text-white font-normal">
          Comparador Lado a Lado de Ejemplares
        </h1>
        <p className="text-white/85 text-xs sm:text-sm mt-2 max-w-xl">
          Analiza morfología, alzada, nivel de doma, precio y registro genealógico entre los ejemplares seleccionados.
        </p>
      </div>

      {comparedHorses.length === 0 ? (
        <div className="text-center py-20 bg-[#141417]/40 rounded-3xl border border-white/10 p-8 space-y-4">
          <Scale className="w-12 h-12 text-[#D4AF37] mx-auto opacity-70" />
          <h3 className="font-heading text-xl text-white">No has seleccionado ejemplares para comparar</h3>
          <p className="text-white/85 text-xs max-w-md mx-auto">
            Visita el catálogo de caballos y haz clic en el icono de balanza ⚖️ en las tarjetas de los dos ejemplares que desees comparar.
          </p>
          <Link
            href="/ejemplares"
            className="px-6 py-3 bg-[#D4AF37] text-[#050507] rounded-xl text-xs font-bold uppercase tracking-wider inline-block shadow-md"
          >
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {comparedHorses.map((horse) => (
            <div
              key={horse.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#141417]/70 border-2 border-[#D4AF37]/50 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => removeFromComparison(horse.id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white/70 hover:text-white"
                title="Quitar de comparativa"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/15">
                <Image src={horse.images[0] || "/images/hero.jpg"} alt={horse.name} fill className="object-cover" />
              </div>

              <div>
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-mono block mb-1">
                  KFPS Reg: {horse.kfpsNumber}
                </span>
                <h3 className="font-heading text-2xl text-white font-medium">{horse.name}</h3>
                <p className="text-xs text-white/85">{horse.subname}</p>
              </div>

              <HorsePrice horse={horse} isCompact={true} />

              <div className="space-y-3 py-4 border-y border-white/10 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/70">Alzada a la Cruz:</span>
                  <strong className="text-white font-mono text-sm">{horse.height}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/70">Edad:</span>
                  <span className="text-white">{horse.age} ({horse.birthYear})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/70">Sexo:</span>
                  <span className="text-white">{horse.gender}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/70">Nivel de Doma:</span>
                  <span className="text-[#D4AF37] font-semibold">{horse.level}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/70">Linaje Directo:</span>
                  <span className="text-white font-medium truncate max-w-[200px]">{horse.lineage}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/70">Salud Radiográfica:</span>
                  <span className="text-emerald-400 font-semibold">{horse.veterinary.xRaysClearCount} Rx Limpias Grado 1</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/70">Ubicación Actual:</span>
                  <span className="text-white">{horse.location}</span>
                </div>
              </div>

              <Link
                href={`/ejemplares/${horse.id}`}
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    openLeadWall(horse, "Ver ficha técnica completa");
                  }
                }}
                className="w-full py-3.5 bg-white/10 hover:bg-[#D4AF37] hover:text-[#050507] text-white rounded-xl font-heading font-bold text-xs uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Ver Ficha Técnica Completa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
