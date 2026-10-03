"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { X, Scale, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HorsePrice from "./HorsePrice";

export default function HorseComparerModal() {
  const { comparisonList, removeFromComparison, horses, isLoggedIn, openLeadWall } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (comparisonList.length === 0) return null;

  const comparedHorses = horses.filter((h) => comparisonList.includes(h.id));

  return (
    <>
      {/* Floating Pill on bottom-left when horses are selected for comparison */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3 rounded-full bg-[#141417] hover:bg-[#1C1C21] border-2 border-[#D4AF37] text-white font-heading text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.3)] flex items-center gap-3 transition-transform hover:scale-105"
        >
          <Scale className="w-4 h-4 text-[#D4AF37]" />
          <span>Comparar Ejemplares ({comparisonList.length}/2)</span>
        </button>
      </div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#09090B] border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Scale className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-heading text-2xl text-white">
                    Comparativa Lado a Lado
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/75 hover:text-white rounded-full bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {comparedHorses.length === 1 ? (
                <div className="text-center py-10">
                  <p className="text-white/70 text-sm mb-4">
                    Selecciona otro ejemplar en el catálogo con el icono de balanza ⚖️ para ver la comparación lado a lado.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-[#D4AF37] text-[#050507] rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    Seguir explorando
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6 sm:gap-10">
                  {comparedHorses.map((horse) => (
                    <div key={horse.id} className="flex flex-col space-y-4">
                      {/* Photo */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/15">
                        <Image
                          src={horse.images[0] || "/images/hero.jpg"}
                          alt={horse.name}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => removeFromComparison(horse.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white/80 hover:text-white"
                          title="Quitar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-mono">
                          Reg: {horse.kfpsNumber}
                        </span>
                        <h4 className="font-heading text-xl text-white">{horse.name}</h4>
                        <p className="text-xs text-white/85">{horse.subname}</p>
                      </div>

                      {/* Specs */}
                      <div className="space-y-2 border-y border-white/10 py-3 text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/70">Edad:</span>
                          <span className="text-white font-medium">{horse.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Alzada:</span>
                          <span className="text-white font-medium">{horse.height}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Sexo:</span>
                          <span className="text-white font-medium">{horse.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Nivel de Doma:</span>
                          <span className="text-white font-medium">{horse.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Linaje:</span>
                          <span className="text-white font-medium truncate max-w-[150px]">{horse.lineage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Estado:</span>
                          <span className="text-white font-medium">{horse.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Ubicación:</span>
                          <span className="text-white font-medium">{horse.location}</span>
                        </div>
                      </div>

                      <HorsePrice horse={horse} isCompact={true} />

                      <Link
                        href={`/ejemplares/${horse.id}`}
                        onClick={(e) => {
                          if (!isLoggedIn) {
                            e.preventDefault();
                            openLeadWall(horse, "Ver ficha completa");
                          }
                          setIsOpen(false);
                        }}
                        className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#050507] text-white text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Ver Ficha Técnica</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
