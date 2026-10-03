"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, FileCheck, Truck, ShoppingBag, MessageCircle, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#09090B] overflow-hidden border-b border-[#D4AF37]/20 pt-8 sm:pt-12">
      <div className="flex flex-col lg:flex-row min-h-[auto] lg:min-h-[85vh]">
        
        {/* Left Text Content */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[#D4AF37] tracking-[0.22em] uppercase text-[10px] sm:text-xs font-semibold font-sans">
                Importación & Venta Directa en México
              </span>
            </div>

            {/* Sales Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-heading font-normal text-white leading-[1.1] mb-4 sm:mb-6">
              Caballos Frisones de <br className="hidden sm:inline" />
              <span className="italic text-[#D4AF37] font-script text-4xl sm:text-6xl lg:text-[76px] pr-2">Pura Raza</span>
              en Venta
            </h1>

            <p className="text-white/80 max-w-xl text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-6 sm:mb-8">
              Adquiere un ejemplar frisón de élite con registro oficial de la <strong>KFPS de los Países Bajos</strong>, 14 radiografías limpias y entrega puerta a puerta garantizada con seguro clavo a clavo en todo México.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link 
                href="/ejemplares"
                className="px-6 py-4 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl text-center font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(212,175,55,0.3)] transition-all duration-300 active:scale-95"
              >
                <span>Ver Caballos en Venta (Teaser)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/tienda"
                className="px-6 py-4 bg-white/5 border border-[#D4AF37]/40 hover:bg-[#D4AF37]/15 text-white hover:text-[#D4AF37] transition-colors uppercase tracking-widest text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Tienda de Guarnicionería</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-white/70 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>14 Rx Limpias Grado 1</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Registro Oficial KFPS</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Entrega en Van VIP</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Photo */}
        <div className="w-full lg:w-5/12 relative min-h-[400px] lg:min-h-full bg-black">
          <Image
            src="/images/hero.jpg"
            alt="Semental Frisón Imperial"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#09090B] via-transparent to-transparent" />
          
          {/* Floating Emblem Tag */}
          <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-[#050507]/90 border border-[#D4AF37]/40 backdrop-blur-md max-w-xs shadow-2xl">
            <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold block mb-1">
              Hacienda Guadalajara
            </span>
            <p className="text-white text-xs font-heading">
              Sementales seleccionados en Frisia para exhibición y charrería de gala.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
