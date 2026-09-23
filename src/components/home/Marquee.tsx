'use client';
import { motion } from 'framer-motion';

export default function Marquee() {
  return (
    <section className="h-10 md:h-12 w-full bg-gold-metallic overflow-hidden flex items-center relative z-20 shrink-0 border-t border-brand-negro/10">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        className="flex whitespace-nowrap items-center"
      >
        <div className="flex gap-8 md:gap-16 px-4 md:px-8 items-center text-[#1D1D1F]">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] drop-shadow-sm">Importación Directa de Países Bajos</span>
          <span className="w-1 h-1 rounded-full bg-[#040814]/40" />
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] drop-shadow-sm">Certificación KFPS</span>
          <span className="w-1 h-1 rounded-full bg-[#040814]/40" />
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] drop-shadow-sm">Linaje Imperial</span>
          <span className="w-1 h-1 rounded-full bg-[#040814]/40" />
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] drop-shadow-sm">Importación Directa de Países Bajos</span>
          <span className="w-1 h-1 rounded-full bg-[#040814]/40" />
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] drop-shadow-sm">Certificación KFPS</span>
          <span className="w-1 h-1 rounded-full bg-[#040814]/40" />
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] drop-shadow-sm">Linaje Imperial</span>
          <span className="w-1 h-1 rounded-full bg-[#040814]/40" />
        </div>
      </motion.div>
    </section>
  );
}
