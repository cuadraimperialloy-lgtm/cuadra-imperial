"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import HorseCardTeaser from "@/components/horses/HorseCardTeaser";
import { motion } from "framer-motion";

export default function InventoryShowcase() {
  const { horses } = useStore();
  const [activeTab, setActiveTab] = useState<'todos' | 'DISPONIBLE' | 'Alta Escuela' | 'Potro'>('todos');

  const filtered = horses.filter((horse) => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'DISPONIBLE') return horse.status === 'DISPONIBLE';
    if (activeTab === 'Alta Escuela') return horse.level === 'Alta Escuela';
    if (activeTab === 'Potro') return horse.level === 'Potro';
    return true;
  });

  return (
    <section id="inventario" className="py-16 sm:py-20 lg:py-24 bg-[#09090B] relative border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inventario Disponible en México & En Tránsito</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white font-normal">
              Caballos Frisones <span className="italic font-script text-[#D4AF37] text-4xl sm:text-5xl lg:text-6xl">en Venta</span>
            </h2>
            <p className="text-white/85 text-xs sm:text-sm mt-2 max-w-xl">
              Modo Teaser Oficial: Consulta precios directos o solicita cotización personalizada para los mejores sementales y yeguas de raza KFPS.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'todos', label: 'Todos los Ejemplares' },
              { id: 'DISPONIBLE', label: 'Disponibles' },
              { id: 'Alta Escuela', label: 'Alta Escuela' },
              { id: 'Potro', label: 'Potros' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] text-[#050507] shadow-md font-bold'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Cards Grid (Teaser Mode) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((horse) => (
            <HorseCardTeaser key={horse.id} horse={horse} />
          ))}
        </motion.div>

        {/* Bottom CTA to Full Catalog */}
        <div className="mt-14 text-center">
          <Link
            href="/ejemplares"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-[#D4AF37]/10 text-white hover:text-[#D4AF37] border-2 border-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg"
          >
            <span>Ver Catálogo Completo con Filtros Avanzados</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
