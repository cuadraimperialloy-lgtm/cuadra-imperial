"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter, Search, RotateCcw, MessageCircle, FileText } from "lucide-react";
import { HORSES, STATUS_COLORS, Horse } from "@/data/horses";
import { motion, AnimatePresence } from "framer-motion";

export default function EjemplaresPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const resetFilters = () => {
    setSelectedStatuses([]);
    setSelectedLevels([]);
    setSelectedAgeRanges([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedStatuses.length > 0 || selectedLevels.length > 0 || selectedAgeRanges.length > 0 || searchQuery.length > 0;

  const filteredHorses = useMemo(() => {
    return HORSES.filter((horse) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch = horse.name.toLowerCase().includes(q) ||
          horse.lineage.toLowerCase().includes(q) ||
          horse.level.toLowerCase().includes(q) ||
          horse.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (selectedStatuses.length > 0 && !selectedStatuses.includes(horse.status)) {
        return false;
      }

      if (selectedLevels.length > 0 && !selectedLevels.includes(horse.level)) {
        return false;
      }

      if (selectedAgeRanges.length > 0) {
        const ageNum = parseInt(horse.age, 10);
        const matchesAge = selectedAgeRanges.some((range) => {
          if (range === '2-3') return ageNum >= 2 && ageNum <= 3;
          if (range === '4-6') return ageNum >= 4 && ageNum <= 6;
          if (range === '7+') return ageNum >= 7;
          return false;
        });
        if (!matchesAge) return false;
      }

      return true;
    });
  }, [selectedStatuses, selectedLevels, selectedAgeRanges, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto bg-[#0B1528]">
      
      {/* Header */}
      <div className="mb-12 border-b border-[#B8860B]/20 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-script text-[#B8860B] text-4xl md:text-5xl mb-2 block">Inventario Exclusivo</span>
          <h1 className="font-heading text-4xl md:text-6xl font-normal text-white tracking-tight">Caballos Frisones en Venta</h1>
          <p className="text-white/70 text-sm md:text-base mt-2 max-w-xl font-light">
            Catálogo oficial de sementales, yeguas de cría y potros de pura raza KFPS disponibles para entrega inmediata en México o importación en curso.
          </p>
        </div>
        
        {/* Search & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Buscar por nombre, alzada, linaje..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#101E38] border border-white/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#B8860B] transition-colors"
            />
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center gap-2 font-sans font-bold text-xs tracking-widest uppercase bg-[#B8860B] text-[#0B1528] px-5 py-3 rounded-full shrink-0"
          >
            <Filter className="w-3.5 h-3.5" /> Filtros
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 lg:w-72 shrink-0 flex-col gap-6 ${isFilterOpen ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-heading text-lg font-medium text-white">Filtrar Venta</span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#B8860B] hover:text-white flex items-center gap-1 font-semibold transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Limpiar
              </button>
            )}
          </div>

          {/* Estado */}
          <div className="bg-[#101E38] p-5 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Disponibilidad</h3>
            <div className="space-y-2.5 text-white/80 text-xs">
              {[
                { key: 'DISPONIBLE', label: 'Disponibles Inmediatos' },
                { key: 'EN IMPORTACIÓN', label: 'En Importación (Tránsito)' },
                { key: 'RESERVADO', label: 'Reservados' },
                { key: 'VENDIDO', label: 'Vendidos' },
              ].map((st) => (
                <label key={st.key} className="flex items-center justify-between cursor-pointer group select-none">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(st.key)}
                      onChange={() => toggleFilter(selectedStatuses, setSelectedStatuses, st.key)}
                      className="w-4 h-4 accent-[#B8860B] rounded cursor-pointer"
                    />
                    <span className="group-hover:text-[#B8860B] transition-colors">{st.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* Nivel de Doma */}
          <div className="bg-[#101E38] p-5 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Disciplina</h3>
            <div className="space-y-2.5 text-white/80 text-xs">
              {['Alta Escuela', 'Doma Básica', 'Enganche', 'Potro'].map((lvl) => (
                <label key={lvl} className="flex items-center gap-2.5 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(lvl)}
                    onChange={() => toggleFilter(selectedLevels, setSelectedLevels, lvl)}
                    className="w-4 h-4 accent-[#B8860B] rounded cursor-pointer"
                  />
                  <span className="group-hover:text-[#B8860B] transition-colors">{lvl}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rango de Edad */}
          <div className="bg-[#101E38] p-5 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Edad</h3>
            <div className="space-y-2.5 text-white/80 text-xs">
              {[
                { key: '2-3', label: '2 - 3 años (Jóvenes)' },
                { key: '4-6', label: '4 - 6 años (Sementales Maduros)' },
                { key: '7+', label: '7+ años (Maestros de Doma)' },
              ].map((age) => (
                <label key={age.key} className="flex items-center gap-2.5 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={selectedAgeRanges.includes(age.key)}
                    onChange={() => toggleFilter(selectedAgeRanges, setSelectedAgeRanges, age.key)}
                    className="w-4 h-4 accent-[#B8860B] rounded cursor-pointer"
                  />
                  <span className="group-hover:text-[#B8860B] transition-colors">{age.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 text-xs text-white/60">
            <span>Mostrando <strong className="text-[#B8860B]">{filteredHorses.length}</strong> de {HORSES.length} ejemplares en venta</span>
            {hasActiveFilters && (
              <span className="text-[#B8860B] font-semibold">Filtros activos</span>
            )}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredHorses.map((horse) => {
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
                    className="bg-[#101E38] rounded-2xl overflow-hidden border border-white/10 hover:border-[#B8860B]/50 transition-all duration-300 flex flex-col group shadow-xl"
                  >
                    <div className="relative aspect-[16/10] w-full bg-black/60 overflow-hidden">
                      <Image
                        src={horse.images[0]}
                        alt={horse.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      <div className="absolute top-4 left-4 z-10">
                        <span 
                          style={{ backgroundColor: statusConfig.bg }}
                          className="px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg"
                        >
                          {statusConfig.label}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                        <span className="text-xs text-[#B8860B] font-mono bg-black/70 px-2.5 py-1 rounded backdrop-blur">
                          {horse.kfpsNumber}
                        </span>
                        <span className="text-lg font-heading font-bold text-white bg-[#0B1528]/90 px-3 py-1 rounded border border-[#B8860B]/30">
                          {horse.price}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#B8860B] font-semibold block mb-1">
                          {horse.subname}
                        </span>
                        <h3 className="text-2xl font-heading text-white font-medium mb-2 group-hover:text-[#B8860B] transition-colors">
                          {horse.name}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-white/70 py-2 border-y border-white/10 mb-3">
                          <span>{horse.age}</span>
                          <span>&bull;</span>
                          <span>{horse.height}</span>
                          <span>&bull;</span>
                          <span className="text-[#B8860B] font-semibold">{horse.level}</span>
                        </div>

                        <p className="text-xs text-white/60 line-clamp-2 mb-4 leading-relaxed font-light">
                          {horse.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                        <Link 
                          href={`/ejemplares/${horse.id}`}
                          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" /> Ficha y Rx
                        </Link>

                        <a 
                          href={whatsappBuyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 bg-[#B8860B] hover:bg-[#D9B25A] text-[#0B1528] rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 shadow"
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
        </div>
      </div>
    </div>
  );
}
