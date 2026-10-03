"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, Search, RotateCcw, Sparkles, Scale, SlidersHorizontal, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import HorseCardTeaser from "@/components/horses/HorseCardTeaser";

export default function EjemplaresPage() {
  const { horses, comparisonList } = useStore();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>("TODOS");
  const [selectedLevel, setSelectedLevel] = useState<string>("TODOS");
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>("TODOS");
  const [selectedStatus, setSelectedStatus] = useState<string>("TODOS");
  const [searchQuery, setSearchQuery] = useState("");

  const resetFilters = () => {
    setSelectedGender("TODOS");
    setSelectedLevel("TODOS");
    setSelectedAgeRange("TODOS");
    setSelectedStatus("TODOS");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedGender !== "TODOS" ||
    selectedLevel !== "TODOS" ||
    selectedAgeRange !== "TODOS" ||
    selectedStatus !== "TODOS" ||
    searchQuery.trim().length > 0;

  const filteredHorses = useMemo(() => {
    return horses.filter((horse) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          horse.name.toLowerCase().includes(q) ||
          horse.lineage.toLowerCase().includes(q) ||
          horse.level.toLowerCase().includes(q) ||
          horse.description.toLowerCase().includes(q) ||
          horse.kfpsNumber.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (selectedStatus !== "TODOS" && horse.status !== selectedStatus) {
        return false;
      }

      if (selectedGender !== "TODOS" && horse.gender !== selectedGender) {
        return false;
      }

      if (selectedLevel !== "TODOS" && horse.level !== selectedLevel) {
        return false;
      }

      if (selectedAgeRange !== "TODOS") {
        const ageNum = parseInt(horse.age, 10);
        if (selectedAgeRange === "2-3" && !(ageNum >= 2 && ageNum <= 3)) return false;
        if (selectedAgeRange === "4-6" && !(ageNum >= 4 && ageNum <= 6)) return false;
        if (selectedAgeRange === "7+" && !(ageNum >= 7)) return false;
      }

      return true;
    });
  }, [horses, selectedGender, selectedLevel, selectedAgeRange, selectedStatus, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto bg-[#09090B]">
      
      {/* Header */}
      <div className="mb-10 border-b border-[#D4AF37]/20 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Inventario Oficial KFPS</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-normal text-white tracking-tight">
            Caballos Frisones en Venta
          </h1>
          <p className="text-white/70 text-sm md:text-base mt-2 max-w-2xl font-light">
            Catálogo exclusivo de sementales aprobados, yeguas de cría élite y potros importados directamente desde los Países Bajos. Modo Vista Previa (Teaser).
          </p>
        </div>
        
        {/* Search & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="Buscar por nombre, alzada, linaje..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141417] border border-white/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/70 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 font-bold text-xs tracking-wider uppercase bg-[#D4AF37] text-[#050507] px-5 py-2.5 rounded-full shrink-0 shadow-md hover:bg-[#E8C678] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Premium Filter Controls Bar */}
      <div className={`p-6 rounded-2xl bg-[#141417]/80 border border-white/10 mb-10 transition-all ${isFilterOpen ? "block" : "hidden md:block"}`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 text-xs">
          
          {/* Sexo */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-white/75 font-semibold block mb-1.5">
              Sexo del Ejemplar
            </label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full bg-[#050507] border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="TODOS">Todos los sexos</option>
              <option value="Semental">Semental</option>
              <option value="Yegua">Yegua</option>
              <option value="Castrado">Castrado</option>
              <option value="Potro">Potro</option>
            </select>
          </div>

          {/* Nivel / Disciplina */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-white/75 font-semibold block mb-1.5">
              Nivel / Disciplina
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-[#050507] border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="TODOS">Todas las disciplinas</option>
              <option value="Alta Escuela">Alta Escuela</option>
              <option value="Doma Clásica">Doma Clásica</option>
              <option value="Enganche">Enganche</option>
              <option value="Potro">Potro en Desarrollo</option>
            </select>
          </div>

          {/* Rango de Edad */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-white/75 font-semibold block mb-1.5">
              Rango de Edad
            </label>
            <select
              value={selectedAgeRange}
              onChange={(e) => setSelectedAgeRange(e.target.value)}
              className="w-full bg-[#050507] border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="TODOS">Cualquier edad</option>
              <option value="2-3">Potros (2 a 3 años)</option>
              <option value="4-6">Jóvenes promesas (4 a 6 años)</option>
              <option value="7+">Maestros confirmados (7+ años)</option>
            </select>
          </div>

          {/* Estatus */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-white/75 font-semibold block mb-1.5">
              Disponibilidad
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#050507] border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="TODOS">Todos los estatus</option>
              <option value="DISPONIBLE">Disponible</option>
              <option value="EN IMPORTACIÓN">En Tránsito (KLM Cargo)</option>
              <option value="RESERVADO">Reservado</option>
              <option value="VENDIDO">Vendido</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="flex items-end">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full py-2.5 px-4 rounded-xl border border-white/20 hover:border-[#D4AF37] text-white/80 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter and Trust Notice */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-white/75">
          <span>
            Mostrando <strong className="text-white">{filteredHorses.length}</strong> ejemplares frisones
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            100% de los ejemplares cuentan con registro KFPS original de Países Bajos
          </span>
        </div>
      </div>

      {/* Grid of Horse Cards in Teaser Mode */}
      {filteredHorses.length === 0 ? (
        <div className="text-center py-20 bg-[#141417]/30 rounded-3xl border border-white/10 p-8">
          <p className="text-white/85 text-base mb-4">
            No se encontraron ejemplares con los filtros seleccionados.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#D4AF37] text-[#050507] rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            Ver todos los caballos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHorses.map((horse) => (
            <HorseCardTeaser key={horse.id} horse={horse} />
          ))}
        </div>
      )}
    </div>
  );
}
