'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

export default function VisualShowcase() {
  return (
    <section className="min-h-[100dvh] w-full bg-[#0B1528] overflow-hidden snap-start shrink-0 flex items-center relative py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        
        {/* Text Introduction - Warm Theme */}
        <div className="max-w-3xl mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-tight mb-6"
          >
            No vendemos caballos.<br/>
            <span className="text-brand-oro/70">Entregamos majestuosidad.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-2xl"
          >
            Ver a un Frisón en movimiento es presenciar arte puro. Su trote elevado y su imponente color negro azabache lo convierten en el rey de la cuadra.
          </motion.p>
        </div>

        {/* Massive Video/Image Layout constrained for mobile visibility */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[300px] md:h-[45vh]">
          
          {/* Main Large Visual - Reveal Animation */}
          <motion.div 
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8 relative aspect-[4/3] md:aspect-auto rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <Image
                src="/images/hero.jpg"
                alt="Frisón en movimiento"
                fill
                className="object-cover object-center transition-transform duration-[2s] group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-brand-cuero/30 transition-colors duration-500">
              <div className="w-16 h-16 bg-brand-cal/20 backdrop-blur-md rounded-full flex items-center justify-center border border-brand-cal/50 group-hover:scale-110 transition-transform duration-500">
                <Play fill="white" className="text-white ml-1" size={28} />
              </div>
            </div>
          </motion.div>

          {/* Side Tall Visual - Reveal Animation */}
          <motion.div 
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block md:col-span-4 relative h-full rounded-[2rem] overflow-hidden shadow-xl"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <Image
                src="/images/portrait.jpg"
                alt="Detalle de Frisón"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
