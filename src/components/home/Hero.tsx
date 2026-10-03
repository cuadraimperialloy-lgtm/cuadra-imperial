"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileCheck, Truck, ShoppingBag, Sparkles, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#09090B] overflow-hidden border-b border-[#D4AF37]/20">
      
      {/* 1. AD-HOC TOP LUXURY ANNOUNCEMENT BANNER */}
      <div className="w-full bg-gradient-to-r from-[#141417] via-[#2A2311] to-[#141417] border-b border-[#D4AF37]/30 py-2.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <p className="text-white text-[11px] sm:text-xs font-medium tracking-wide truncate">
              <strong className="text-[#D4AF37] font-semibold">Hacienda Guadalajara:</strong> Nueva importación de Sementales KFPS con 14 Rx limpias · Pruebas de monta con cita previa
            </p>
          </div>
          <Link
            href="/ejemplares"
            className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] hover:text-[#F3E5AB] uppercase tracking-wider shrink-0 transition-colors"
          >
            <span>Ver Catálogo</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 2. MAIN HERO CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-10 lg:py-14">
        
        {/* MOBILE VISUAL BANNER CARD (Visible on Mobile & Tablet < lg) */}
        <div className="lg:hidden mb-6 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_10px_35px_rgba(0,0,0,0.9)] relative bg-black">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center"
              poster="/images/hero.jpg"
            >
              <source src="https://cdn.coverr.co/videos/coverr-a-black-horse-running-in-the-snow-3733/1080p.mp4" type="video/mp4" />
            </video>
            
            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-black/25 to-black/40" />

            {/* Top Badge Overlay */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>KFPS Stamboek · Pura Raza</span>
            </div>

            {/* Bottom Caption Overlay on Mobile */}
            <div className="absolute bottom-3 inset-x-3 z-10 flex items-end justify-between">
              <div>
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold block drop-shadow">
                  Hacienda Guadalajara
                </span>
                <p className="text-white text-xs font-heading font-medium drop-shadow">
                  Sementales Frisones de Alta Escuela
                </p>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#050507] text-[10px] font-bold uppercase tracking-wider shadow font-sans">
                En Vivo
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP + MOBILE CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text / CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 mb-3 sm:mb-5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[#D4AF37] tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold font-sans">
                  Importación & Venta Directa en México
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-heading font-normal text-white leading-[1.12] mb-3 sm:mb-5">
                Caballos Frisones de <br className="hidden sm:inline" />
                <span className="italic text-[#D4AF37] font-script text-4xl sm:text-6xl lg:text-[72px] pr-2">Pura Raza</span>
                en Venta
              </h1>

              {/* Subtitle / Value Prop */}
              <p className="text-white/85 text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-6 sm:mb-8 max-w-xl">
                Adquiere un ejemplar frisón de élite con registro oficial de la <strong className="text-white font-semibold">KFPS de los Países Bajos</strong>, 14 radiografías limpias y entrega puerta a puerta garantizada con seguro clavo a clavo en todo México.
              </p>
              
              {/* Mobile-Friendly CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10">
                <Link 
                  href="/ejemplares"
                  className="w-full sm:w-auto px-6 py-4 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl text-center font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(212,175,55,0.35)] transition-all duration-300 active:scale-95"
                >
                  <span>Ver Caballos en Venta (Teaser)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link 
                  href="/tienda"
                  className="w-full sm:w-auto px-6 py-4 bg-white/5 border border-[#D4AF37]/50 hover:bg-[#D4AF37]/15 text-white hover:text-[#D4AF37] transition-all uppercase tracking-widest text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tienda de Guarnicionería</span>
                </Link>
              </div>

              {/* Trust Badges Strip (Responsive Grid) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 text-white/80 text-[11px] sm:text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">14 Rx Grado 1</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <FileCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="truncate">KFPS Holanda</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">Entrega VIP</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop Right Video / Banner (Visible on Desktop >= lg) */}
          <div className="hidden lg:block lg:col-span-5 relative h-[520px] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center"
              poster="/images/hero.jpg"
            >
              <source src="https://cdn.coverr.co/videos/coverr-a-black-horse-running-in-the-snow-3733/1080p.mp4" type="video/mp4" />
            </video>
            
            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/60 via-transparent to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/50 text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Línea Real KFPS Países Bajos</span>
            </div>
            
            {/* Floating Glassmorphism Card */}
            <div className="absolute bottom-6 inset-x-6 z-20 p-4 rounded-2xl bg-[#050507]/90 border border-[#D4AF37]/40 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-[#D4AF37] uppercase tracking-widest font-bold">
                  Hacienda Guadalajara · México
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-white text-xs font-heading font-medium leading-relaxed">
                Sementales seleccionados en Frisia listos para exhibición, doma clásica y charrería de gala.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
