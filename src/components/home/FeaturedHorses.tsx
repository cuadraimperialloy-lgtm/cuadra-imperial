"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const HORSES = [
  {
    id: "tjerk",
    name: "Tjerk van de Zwarte",
    level: "Gran Premio",
    price: "€45,000",
    image: "/friesian_hero_1790132263151.jpg",
    description: "Un ejemplar majestuoso con movimientos amplios y elásticos. Ideal para la alta doma clásica y concursos internacionales. Descendiente directo de campeones KFPS.",
  },
  {
    id: "doeke",
    name: "Doeke fan Panhuys",
    level: "San Jorge",
    price: "€38,000",
    image: "/friesian_portrait_1790132295863.jpg",
    description: "Destaca por su crin exuberante y su temperamento dócil pero enérgico en la pista. Una joya para jinetes exigentes que buscan elegancia pura.",
  }
];

export default function FeaturedHorses() {
  return (
    <section className="py-24 bg-[#0B1528] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-sm tracking-[0.3em] text-[#B8860B] uppercase font-semibold mb-4">
            Selección Exclusiva
          </h2>
          <p className="text-4xl md:text-6xl font-heading text-white font-light">
            Obras de Arte <span className="italic font-script text-[#B8860B] text-5xl md:text-7xl">vivientes</span>
          </p>
        </div>

        <div className="space-y-32">
          {HORSES.map((horse, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={horse.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                {/* Image Section */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-[4/5] w-full group overflow-hidden">
                    <Image
                      src={horse.image}
                      alt={horse.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border border-[#B8860B]/20 m-4 pointer-events-none transition-transform duration-1000 group-hover:scale-[0.98]"></div>
                  </div>
                </motion.div>

                {/* Text Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="h-[1px] w-12 bg-[#B8860B]"></span>
                    <span className="text-[#B8860B] tracking-[0.2em] uppercase text-xs font-semibold">{horse.level}</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">
                    {horse.name}
                  </h3>
                  
                  <p className="text-white/60 font-light leading-relaxed mb-8 text-lg">
                    {horse.description}
                  </p>
                  
                  <div className="flex items-center gap-8 mb-10">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Inversión</p>
                      <p className="text-2xl font-heading text-[#B8860B]">{horse.price}</p>
                    </div>
                  </div>

                  <Link href={`/ejemplares/${horse.id}`}>
                    <button className="group flex items-center gap-4 text-white hover:text-[#B8860B] transition-colors uppercase tracking-[0.2em] text-sm font-semibold">
                      <span>Explorar Pedigree</span>
                      <div className="h-10 w-10 rounded-full border border-[#B8860B]/30 flex items-center justify-center group-hover:border-[#B8860B] group-hover:bg-[#B8860B]/10 transition-all">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="mt-32 text-center">
          <Link href="/ejemplares">
            <button className="px-12 py-5 bg-transparent border border-[#B8860B]/40 text-white hover:border-[#B8860B] hover:text-[#B8860B] transition-all uppercase tracking-[0.2em] text-xs font-semibold">
              Ver Catálogo Completo
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
