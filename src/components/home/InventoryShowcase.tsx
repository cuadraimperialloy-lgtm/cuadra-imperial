"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, FileText, CheckCircle2 } from "lucide-react";
import { HORSES, STATUS_COLORS } from "@/data/horses";
import { motion, AnimatePresence } from "framer-motion";

export default function InventoryShowcase() {
  const [activeTab, setActiveTab] = useState<'todos' | 'DISPONIBLE' | 'Alta Escuela' | 'Potro'>('todos');

  const filtered = HORSES.filter((horse) => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'DISPONIBLE') return horse.status === 'DISPONIBLE';
    if (activeTab === 'Alta Escuela') return horse.level === 'Alta Escuela';
    if (activeTab === 'Potro') return horse.level === 'Potro';
    return true;
  });

  return (
    <section id="inventario" className="py-12 sm:py-16 lg:py-20 bg-[#0B1528] relative border-b border-[#B8860B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>
              Inventario en México & Tránsito
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading text-white font-normal">
              Caballos en Venta <span className="italic font-script text-[#B8860B] text-3xl sm:text-5xl lg:text-6xl">Disponibles</span>
            </h2>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'DISPONIBLE', label: 'Disponibles' },
              { id: 'Alta Escuela', label: 'Alta Escuela' },
              { id: 'Potro', label: 'Potros' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#B8860B] text-[#0B1528] shadow-md font-bold'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filtered.map((horse) => {
              const statusConfig = STATUS_COLORS[horse.status];
              const whatsappBuyUrl = `https://wa.me/523326060218?text=${encodeURIComponent(
                `Hola, me interesa comprar el caballo frisón "${horse.name}" (${horse.price}). ¿Está disponible para entrega inmediata o prueba de monta?`
              )}`;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={horse.id}
                  className="bg-[#101E38] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-[#B8860B]/50 transition-all duration-300 flex flex-col group shadow-xl"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full bg-black/60 overflow-hidden">
                    <Image
                      src={horse.images[0]}
                      alt={horse.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span 
                        style={{ backgroundColor: statusConfig.bg }}
                        className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow"
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    {/* KFPS Badge */}
                    <div className="absolute top-3.5 right-3.5 z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-mono text-white/90">
                      KFPS: {horse.kfpsNumber.split(' ').slice(-1)}
                    </div>

                    {/* Price Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-[#101E38] to-transparent flex justify-between items-end">
                      <span className="text-[11px] text-[#B8860B] font-semibold uppercase tracking-wider">
                        {horse.studbookClass.split('·')[0]}
                      </span>
                      <span className="text-lg sm:text-xl font-heading font-bold text-white drop-shadow">
                        {horse.price}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 block mb-1">
                        {horse.subname}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-heading text-white font-medium mb-2.5 group-hover:text-[#B8860B] transition-colors">
                        {horse.name}
                      </h3>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/10 mb-3 text-center bg-white/[0.02] rounded-lg">
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">Edad</span>
                          <span className="text-xs font-semibold text-white">{horse.age}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">Alzada</span>
                          <span className="text-xs font-semibold text-white">{horse.height}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-white/40 uppercase block">Doma</span>
                          <span className="text-xs font-semibold text-[#B8860B]">{horse.level}</span>
                        </div>
                      </div>

                      <p className="text-xs text-white/70 line-clamp-2 mb-3 leading-relaxed font-light">
                        {horse.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-[11px] text-[#3F7D58] font-medium mb-5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 14 Radiografías Limpias & ADN
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <Link 
                        href={`/ejemplares/${horse.id}`}
                        className="px-2.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> Ficha y Rx
                      </Link>

                      <a 
                        href={whatsappBuyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-2.5 bg-[#B8860B] hover:bg-[#D9B25A] text-[#0B1528] rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1 shadow"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Comprar
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footer Banner */}
        <div className="mt-10 sm:mt-14 bg-gradient-to-r from-[#101E38] via-[#16294D] to-[#101E38] p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-[#B8860B]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div>
            <h4 className="text-base sm:text-xl font-heading text-white font-medium mb-1">
              ¿Buscas un caballo con características o doma específica?
            </h4>
            <p className="text-xs sm:text-sm text-white/70 font-light">
              Importamos sementales aprobados KFPS, yeguas gestantes o potros por encargo directo desde los Países Bajos.
            </p>
          </div>
          <a
            href="https://wa.me/523326060218?text=Hola,%20busco%20un%20caballo%20fris%C3%B3n%20con%20caracter%C3%ADsticas%20espec%C3%ADficas."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-6 py-3 bg-white text-[#0B1528] hover:bg-[#B8860B] hover:text-white rounded-md text-xs font-bold uppercase tracking-widest shrink-0 transition-colors"
          >
            Solicitar Búsqueda
          </a>
        </div>

      </div>
    </section>
  );
}
