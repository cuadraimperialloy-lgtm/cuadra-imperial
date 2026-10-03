'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

const B_ROLL_ITEMS = [
  { id: 1, title: 'Entrenamiento KFPS', img: '/images/hero.jpg', col: 'col-span-12 md:col-span-8', height: 'h-[50vh] md:h-[80vh]' },
  { id: 2, title: 'Caballerizas', img: '/images/portrait.jpg', col: 'col-span-12 md:col-span-4', height: 'h-[40vh] md:h-[38vh]' },
  { id: 3, title: 'Crianza y Cuidados', img: '/images/hero.jpg', col: 'col-span-12 md:col-span-4', height: 'h-[40vh] md:h-[38vh]' },
];

export default function LifestyleGallery() {
  return (
    <section className="min-h-[100dvh] w-full bg-[#09090B] snap-start shrink-0 py-24 flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="font-script text-brand-oro text-4xl mb-2 block">La Vida Imperial</span>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-white tracking-wide">Detrás de Escena</h2>
          </div>
          <p className="max-w-sm text-white/70 font-light text-base md:text-lg leading-relaxed">
            Conoce las instalaciones, el entrenamiento y la pasión que dedicamos a cada ejemplar en Países Bajos y México.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Large Item */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`col-span-12 md:col-span-8 md:row-span-2 h-[50vh] md:h-[calc(76vh+1.5rem)] relative group rounded-[2rem] overflow-hidden cursor-pointer shadow-xl`}
          >
            <Image 
              src={B_ROLL_ITEMS[0].img} 
              alt={B_ROLL_ITEMS[0].title} 
              fill 
              className="object-cover transition-transform duration-[2s] group-hover:scale-105 filter grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-[#040405]/30 group-hover:bg-brand-cuero/40 transition-colors duration-500" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-20 h-20 rounded-full bg-white/5/20 backdrop-blur-md flex items-center justify-center border border-white/50 mb-4 scale-75 group-hover:scale-100 transition-transform duration-500">
                <Play fill="white" className="text-white ml-2" size={32} />
              </div>
              <span className="font-sans text-white font-bold tracking-widest uppercase text-sm drop-shadow-md">
                Reproducir B-Roll
              </span>
            </div>

            <div className="absolute bottom-8 left-8 z-10">
              <span className="font-heading text-white text-3xl font-semibold drop-shadow-lg">{B_ROLL_ITEMS[0].title}</span>
            </div>
          </motion.div>

          {/* Small Top Item */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`col-span-12 md:col-span-4 h-[40vh] md:h-[38vh] relative group rounded-[2rem] overflow-hidden cursor-pointer shadow-xl`}
          >
            <Image src={B_ROLL_ITEMS[1].img} alt={B_ROLL_ITEMS[1].title} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-brand-cuero/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Play fill="white" className="text-white scale-150" />
            </div>
            <div className="absolute bottom-6 left-6 z-10">
              <span className="font-heading text-white text-xl font-semibold">{B_ROLL_ITEMS[1].title}</span>
            </div>
          </motion.div>

          {/* Small Bottom Item */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`col-span-12 md:col-span-4 h-[40vh] md:h-[38vh] relative group rounded-[2rem] overflow-hidden cursor-pointer shadow-xl`}
          >
            <Image src={B_ROLL_ITEMS[2].img} alt={B_ROLL_ITEMS[2].title} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-brand-cuero/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Play fill="white" className="text-white scale-150" />
            </div>
            <div className="absolute bottom-6 left-6 z-10">
              <span className="font-heading text-white text-xl font-semibold">{B_ROLL_ITEMS[2].title}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
