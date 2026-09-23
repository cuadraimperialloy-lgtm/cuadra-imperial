"use client";

import Image from "next/image";
import { CheckCircle2, MapPin } from "lucide-react";

const DELIVERIES = [
  {
    horse: "Sjoerd van Holland",
    details: "Semental Stamboek Ster · 8 años",
    destination: "Los Altos de Jalisco",
    use: "Enganche Real y Paseo Charro",
    img: "/images/tjerk.jpg"
  },
  {
    horse: "Hessel KFPS",
    details: "Castrado Maestro · 6 años",
    destination: "San Juan del Río, Qro.",
    use: "Doma Clásica y Familia",
    img: "/images/kasper.jpg"
  },
  {
    horse: "Reinout de Imperial",
    details: "Semental Alta Escuela · 5 años",
    destination: "Monterrey, Nuevo León",
    use: "Exhibición Ecuestre de Gala",
    img: "/images/willem.jpg"
  }
];

export default function RecentSales() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#080F1E] relative border-b border-[#B8860B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-4">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#B8860B] mb-2 block font-sans">
              Trayectoria Comercial
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading text-white font-normal">
              Entregas Recientes <span className="italic font-script text-[#B8860B] text-3xl sm:text-5xl lg:text-6xl">en México</span>
            </h2>
          </div>
          <p className="text-white/70 text-xs sm:text-sm max-w-md font-light">
            Ejemplares de pura raza entregados con éxito, cuarentena SENASICA cumplida y clientes plenamente satisfechos en todo el país.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DELIVERIES.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#0B1528] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 flex flex-col shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full bg-black/50">
                <Image src={item.img} alt={item.horse} fill className="object-cover" />
                <div className="absolute top-3.5 left-3.5 bg-[#3F7D58] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" /> Entregado
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-heading text-white font-medium mb-1">
                  {item.horse}
                </h3>
                <p className="text-xs text-[#B8860B] font-semibold uppercase tracking-wider mb-3">
                  {item.details}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs text-white/75">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Destino: <strong>{item.destination}</strong></span>
                  </div>
                  <div>
                    <span className="text-white/50">Uso: </span>{item.use}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
