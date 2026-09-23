'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="min-h-[100dvh] w-full bg-[#040814] overflow-hidden snap-start shrink-0 flex items-center relative py-20">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-oro/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cuero/20 blur-[150px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-brand-oro to-brand-oro mx-auto mb-8" />
          <span className="font-script text-brand-oro text-4xl md:text-5xl block mb-6">
            El siguiente paso
          </span>
          <h2 className="font-heading text-5xl md:text-7xl lg:text-[90px] text-brand-cal font-semibold tracking-tight leading-[1.1] mb-8">
            Comienza tu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFB967] to-[#C29B4F]">Legado Imperial.</span>
          </h2>
          <p className="font-sans text-brand-cal/70 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-16">
            Agenda una cita privada en nuestras instalaciones o solicita el catálogo completo de ejemplares disponibles en los Países Bajos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link 
            href="/contacto"
            className="relative overflow-hidden px-12 py-5 bg-gold-metallic text-[#1D1D1F] rounded-full font-sans text-lg font-bold tracking-wide shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] transition-all duration-500 hover:-translate-y-1 group border border-[#FFF2CD]/40"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Agendar Visita
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
          </Link>
          
          <a 
            href="https://wa.me/523326060218?text=Hola,%20quisiera%20más%20información."
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden px-12 py-5 bg-gold-metallic text-[#1D1D1F] rounded-full font-sans text-lg font-bold tracking-wide shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] transition-all duration-500 hover:-translate-y-1 group border border-[#FFF2CD]/40"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Contactar por WhatsApp
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
