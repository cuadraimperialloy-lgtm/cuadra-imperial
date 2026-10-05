"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import HorseCardTeaser from "@/components/horses/HorseCardTeaser";
import { motion } from "framer-motion";

export default function InventoryShowcase() {
  const { horses } = useStore();
  const [activeTab, setActiveTab] = useState<'todos' | 'DISPONIBLE' | 'Alta Escuela' | 'Potro'>('todos');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const filtered = horses.filter((horse) => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'DISPONIBLE') return horse.status === 'DISPONIBLE';
    if (activeTab === 'Alta Escuela') return horse.level === 'Alta Escuela';
    if (activeTab === 'Potro') return horse.level === 'Potro';
    return true;
  });

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    
    // approximate active index
    const cardWidth = clientWidth > 768 ? clientWidth / 3 : clientWidth * 0.85;
    const idx = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(idx, filtered.length - 1));
  };

  useEffect(() => {
    checkScroll();
  }, [filtered]);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const { clientWidth } = carouselRef.current;
    // On desktop scroll by 1 card width or clientWidth * 0.75
    const scrollAmount = clientWidth > 768 ? clientWidth * 0.65 : clientWidth * 0.85;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const { clientWidth } = carouselRef.current;
    const cardWidth = clientWidth > 768 ? clientWidth / 3 : clientWidth * 0.85;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section id="inventario" className="py-14 sm:py-20 lg:py-24 bg-[#09090B] relative border-b border-[#D4AF37]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Inventario Disponible en México & En Tránsito</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white font-normal">
              Caballos Frisones <span className="italic font-script text-[#D4AF37] text-4xl sm:text-5xl lg:text-6xl">en Venta</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl">
              Catálogo de Sementales y Yeguas KFPS: Desliza para explorar cada ejemplar. Pulsa en <strong>&quot;Ver más&quot;</strong> para conocer su ficha zootécnica y precio.
            </p>
          </div>

          {/* Filters & Carousel Arrows */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'DISPONIBLE', label: 'Disponibles' },
                { id: 'Alta Escuela', label: 'Alta Escuela' },
                { id: 'Potro', label: 'Potros' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#D4AF37] text-[#050507] shadow-md font-bold'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full border transition-all ${
                  canScrollLeft
                    ? 'bg-[#141417] border-[#D4AF37]/50 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/15'
                    : 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
                }`}
                aria-label="Ejemplar anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-full border transition-all ${
                  canScrollRight
                    ? 'bg-[#141417] border-[#D4AF37]/50 text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/15'
                    : 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
                }`}
                aria-label="Siguiente ejemplar"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL CAROUSEL TRACK (No vertical scroll!) */}
        <div className="relative">
          <div
            ref={carouselRef}
            onScroll={checkScroll}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filtered.map((horse) => (
              <div
                key={horse.id}
                className="w-[85vw] sm:w-[360px] lg:w-[380px] shrink-0 snap-start"
              >
                <HorseCardTeaser horse={horse} />
              </div>
            ))}
          </div>

          {/* Mobile Arrows Floating Overlay */}
          <div className="flex sm:hidden items-center justify-between mt-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-all ${
                canScrollLeft
                  ? 'bg-[#141417] border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/30'
                  }`}
                  aria-label={`Ir a ejemplar ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-all ${
                canScrollRight
                  ? 'bg-[#141417] border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Dots & Bottom CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            {filtered.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Ir a ejemplar ${idx + 1}`}
              />
            ))}
          </div>

          <Link
            href="/ejemplares"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent hover:bg-[#D4AF37]/10 text-white hover:text-[#D4AF37] border-2 border-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg"
          >
            <span>Ver Catálogo Completo con Filtros Avanzados</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
