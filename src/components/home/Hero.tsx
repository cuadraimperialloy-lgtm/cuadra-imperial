"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, FileCheck, Truck, MapPin, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#0B1528] overflow-hidden border-b border-[#B8860B]/20">
      <div className="flex flex-col lg:flex-row min-h-[auto] lg:min-h-[85vh]">
        
        {/* Left Text Content */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B8860B]/15 border border-[#B8860B]/40 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-pulse" />
              <span className="text-[#B8860B] tracking-[0.2em] uppercase text-[10px] sm:text-xs font-semibold font-sans">
                Importación & Venta Directa en México
              </span>
            </div>

            {/* Sales Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-heading font-normal text-white leading-[1.1] mb-4 sm:mb-6">
              Caballos Frisones de <br className="hidden sm:inline" />
              <span className="italic text-[#B8860B] font-script text-4xl sm:text-6xl lg:text-[76px] pr-2">Pura Raza</span>
              en Venta
            </h1>

            <p className="text-white/80 max-w-xl text-sm sm:text-base lg:text-lg font-light leading-relaxed mb-6 sm:mb-8">
              Adquiere un ejemplar frisón de élite con registro oficial de la <strong>KFPS de los Países Bajos</strong>, 14 radiografías limpias y entrega puerta a puerta garantizada con seguro en cualquier estado de México.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a 
                href="#inventario"
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#B8860B] hover:bg-white text-[#0B1528] rounded-md text-center font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(184,134,11,0.3)] transition-all duration-300"
              >
                <span>Ver Caballos en Venta</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a 
                href="https://wa.me/523326060218?text=Hola,%20me%20interesa%20comprar%20un%20caballo%20fris%C3%B3n.%20%C2%BFQu%C3%A9%20ejemplares%20tienen%20disponibles?"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-white/5 border border-[#B8860B]/40 hover:bg-[#B8860B]/15 text-[#B8860B] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold rounded-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10 text-white/70 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span className="text-[11px] sm:text-xs">100% KFPS Holanda</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span className="text-[11px] sm:text-xs">14 Rx Limpias Cat. 1</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span className="text-[11px] sm:text-xs">Entrega en Todo México</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B8860B] shrink-0" />
                <span className="text-[11px] sm:text-xs">Cuadra en Guadalajara</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Media: Purebred Black Friesian Horse Video Only */}
        <div className="w-full lg:w-5/12 relative h-[280px] sm:h-[360px] lg:h-auto min-h-full bg-black overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center scale-105"
            poster="/images/tjerk.jpg"
          >
            {/* 100% Majestic Black Friesian Horse Video */}
            <source src="https://cdn.coverr.co/videos/coverr-a-black-horse-running-in-the-snow-3733/1080p.mp4" type="video/mp4" />
          </video>
          
          {/* Edge Blend Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1528] via-transparent to-transparent hidden lg:block opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent lg:hidden opacity-90" />

          {/* Floating Badge */}
          <div className="absolute bottom-4 right-4 z-20 bg-[#0B1528]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#B8860B]/40 shadow-xl">
            <span className="text-[10px] text-[#B8860B] font-bold uppercase tracking-wider block">
              Pureza KFPS
            </span>
            <span className="text-white text-[11px] font-light">
              Frisones de Alta Doma
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
