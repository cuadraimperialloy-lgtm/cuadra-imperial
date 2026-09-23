'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const JOURNEY_STEPS = [
  {
    id: 1,
    title: "1. Selección",
    subtitle: "Leeuwarden, Países Bajos",
    desc: "Nuestros expertos evalúan conformación, carácter y movimiento directamente en las mejores cuadras de Holanda.",
    img: "/images/portrait.jpg"
  },
  {
    id: 2,
    title: "2. Certificación KFPS",
    subtitle: "Registro y Sanidad",
    desc: "Cada ejemplar viaja con pedigrí oficial, pasaporte europeo y rigurosos exámenes veterinarios de exportación.",
    img: "/images/hero.jpg"
  },
  {
    id: 3,
    title: "3. Llegada a México",
    subtitle: "Vuelo Privado y Entrega",
    desc: "Aterrizaje seguro, cuarentena supervisada y entrega directa en las instalaciones del comprador en cualquier parte de México.",
    img: "/images/portrait.jpg"
  }
];

export default function HorizontalJourney() {
  return (
    <section className="h-[100dvh] w-full snap-start shrink-0 bg-[#040814] text-brand-cal relative flex flex-col group overflow-hidden">
      
      {/* Absolute intro text block */}
      <div className="absolute top-8 md:top-16 left-6 md:left-12 z-20 pointer-events-none drop-shadow-lg">
        <h2 className="font-heading text-4xl md:text-6xl font-semibold text-white tracking-tight">El Viaje Imperial</h2>
        <p className="font-sans text-brand-oro uppercase tracking-[0.3em] text-[10px] md:text-xs mt-3">De Holanda a tu Cuadra &rarr;</p>
      </div>

      {/* Custom Horizontal Scroll Bar Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-brand-oro animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-brand-cal/30" />
        <div className="w-2 h-2 rounded-full bg-brand-cal/30" />
      </div>

      {/* Horizontal Snap Scroll Container */}
      <div className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth hide-scrollbar relative z-10 cursor-ew-resize">
        {JOURNEY_STEPS.map((step) => (
          <div key={step.id} className="min-w-[100vw] h-full flex flex-col md:flex-row items-center justify-center p-6 md:px-24 snap-center shrink-0 relative gap-12">
            
            {/* Elegant Text Block */}
            <div className="w-full md:w-4/12 flex flex-col z-10 mt-24 md:mt-0">
              <span className="font-script text-brand-oro text-4xl md:text-5xl mb-4 opacity-90">{step.title.split('.')[0]}.</span>
              <h3 className="font-heading text-3xl md:text-4xl font-light mb-6 text-white tracking-wide">{step.title.split('.')[1]}</h3>
              
              <div className="flex items-center gap-4 mb-6 md:mb-10">
                <div className="w-12 h-[1px] bg-brand-oro/50" />
                <p className="font-sans text-brand-oro tracking-widest uppercase text-xs">{step.subtitle}</p>
              </div>
              
              <p className="font-sans text-base md:text-lg text-brand-cal/70 font-light leading-relaxed max-w-sm">{step.desc}</p>
            </div>
            
            {/* Elegant Image Block with negative space */}
            <div className="w-full md:w-6/12 h-[45vh] md:h-[65vh] relative overflow-hidden rounded-[1rem] md:rounded-[2rem] shadow-2xl border border-white/5">
              <Image src={step.img} alt={step.title} fill className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-[1.5s] group-hover:scale-105" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
