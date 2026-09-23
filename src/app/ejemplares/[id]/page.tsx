"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, MessageCircle, Calendar } from "lucide-react";
import { HORSES, STATUS_COLORS } from "@/data/horses";
import VideoModal from "@/components/ui/VideoModal";

export default function HorseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const horse = HORSES.find((h) => h.id === resolvedParams.id) || HORSES[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const statusConfig = STATUS_COLORS[horse.status];

  const whatsappBuyUrl = `https://wa.me/523326060218?text=${encodeURIComponent(
    `Hola Cuadra Imperial Loy, deseo apartar/comprar el ejemplar frisón "${horse.name}" (${horse.price}, Reg. KFPS: ${horse.kfpsNumber}). Por favor indíquenme los pasos para la reserva.`
  )}`;

  const whatsappVideocallUrl = `https://wa.me/523326060218?text=${encodeURIComponent(
    `Hola, me interesa agendar una videollamada en directo para ver los movimientos y prueba del caballo "${horse.name}".`
  )}`;

  return (
    <>
      <div className="min-h-screen pt-32 pb-32 bg-[#0B1528]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Back Button */}
          <Link 
            href="/ejemplares" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#B8860B] transition-colors mb-8 font-sans text-xs font-semibold tracking-widest uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Catálogo de Venta
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left: Images */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div 
                onClick={() => setIsVideoOpen(true)}
                className="relative w-full h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-black/60 border border-white/10"
              >
                <Image 
                  src={horse.images[activeImageIndex] || horse.images[0]} 
                  alt={horse.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  priority
                />
                
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-2xl">
                     <Play className="w-8 h-8 text-white ml-1" />
                   </div>
                </div>
                
                <div className="absolute bottom-6 right-6">
                  <span className="px-4 py-2 bg-[#0B1528]/80 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 border border-[#B8860B]/40">
                    <Play className="w-3.5 h-3.5 text-[#B8860B]" /> Ver Movimientos en Video
                  </span>
                </div>

                <div className="absolute top-6 left-6">
                  <span 
                    style={{ backgroundColor: statusConfig.bg }}
                    className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white shadow-lg"
                  >
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {horse.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-24 rounded-xl overflow-hidden shadow-md transition-all border-2 bg-black/50 ${
                      activeImageIndex === idx ? 'border-[#B8860B] scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${horse.name} vista ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Commercial Information */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-script text-[#B8860B] text-4xl block">Ejemplar en Venta</span>
                <span className="text-white/50 text-xs font-mono">· Registro KFPS: {horse.kfpsNumber}</span>
              </div>

              <h1 className="font-heading text-4xl md:text-6xl font-normal text-white tracking-tight mb-2">
                {horse.name}
              </h1>
              
              <p className="text-xs uppercase tracking-widest text-[#B8860B] font-semibold mb-6">
                {horse.subname} &bull; {horse.studbookClass}
              </p>

              {/* Price Banner */}
              <div className="p-6 bg-[#101E38] rounded-2xl border border-[#B8860B]/30 mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <span className="text-xs text-white/50 uppercase tracking-widest block mb-1">Precio de Venta en México</span>
                  <span className="font-heading text-3xl md:text-4xl font-bold text-[#B8860B]">{horse.price}</span>
                  <span className="text-xs text-white/60 block mt-1">Incluye aranceles aduanales e IVA en factura fiscal</span>
                </div>

                <a 
                  href={whatsappBuyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#B8860B] hover:bg-[#D9B25A] text-[#0B1528] rounded-xl font-bold text-xs uppercase tracking-wider text-center shadow-lg transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <MessageCircle className="w-4 h-4" /> Apartar con 20%
                </a>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 bg-[#101E38]/60 p-6 rounded-2xl border border-white/10 text-xs">
                <div>
                  <span className="text-white/40 uppercase block mb-1">Edad</span>
                  <span className="font-heading font-semibold text-white text-base">{horse.age} ({horse.birthYear})</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase block mb-1">Alzada</span>
                  <span className="font-heading font-semibold text-white text-base">{horse.height}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase block mb-1">Doma</span>
                  <span className="font-heading font-semibold text-white text-base">{horse.level}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase block mb-1">Salud y Placas</span>
                  <span className="font-heading font-semibold text-[#3F7D58] text-base">14 Rx Limpias Cat. 1</span>
                </div>
                <div className="col-span-2 pt-3 border-t border-white/10">
                  <span className="text-white/40 uppercase block mb-1">Genealogía Oficial</span>
                  <span className="text-white font-medium">Padre: {horse.sire} &bull; Madre: {horse.dam}</span>
                </div>
              </div>

              {/* Description & Temperament */}
              <div className="space-y-4 mb-8">
                <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
                  {horse.description}
                </p>
                <div className="p-4 bg-[#101E38] rounded-xl border border-white/10 text-xs text-white/70">
                  <strong className="text-white block mb-1 uppercase tracking-wider text-[10px]">Carácter y Manejo:</strong>
                  {horse.character}
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappVideocallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-xl text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#B8860B]" /> Agendar Prueba de Monta en Guadalajara
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={`Video y Movimientos de ${horse.name}`}
      />
    </>
  );
}