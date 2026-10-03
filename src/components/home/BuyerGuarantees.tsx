"use client";

import { Award, FileCheck2, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

const GUARANTEES = [
  {
    icon: Award,
    title: "Genealogía Oficial KFPS",
    desc: "Cada ejemplar viaja con su pasaporte europeo original emitido por la KFPS de Leeuwarden, Holanda. Chip subcutáneo verificado y prueba de ADN.",
    badge: "100% Holandés"
  },
  {
    icon: FileCheck2,
    title: "14 Radiografías Clínicas (Rx)",
    desc: "Set completo de 14 placas Rx libres de osteocondrosis (OCD Grado 1) y endoscopía a disposición de tu médico veterinario de confianza.",
    badge: "Transparencia Total"
  },
  {
    icon: ShieldAlert,
    title: "Seguro 'Clavo a Clavo'",
    desc: "Asegurado contra cualquier eventualidad desde el establo en Frisia, vuelo KLM Cargo y hasta que lo recibes en tu rancho en México.",
    badge: "Cero Riesgo"
  },
  {
    icon: Sparkles,
    title: "Prueba de Monta en Guadalajara",
    desc: "Visita nuestras caballerizas privadas en Jalisco para montar el caballo y comprobar su nobleza de temperamento antes de liquidar.",
    badge: "Certeza Absoluta"
  }
];

export default function BuyerGuarantees() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#080F1E] relative border-b border-[#B8860B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#B8860B] mb-2 block font-sans">
            Seguridad en tu Inversión
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading text-white font-normal mb-3">
            Garantías de Compra <span className="italic font-script text-[#B8860B] text-3xl sm:text-5xl lg:text-6xl">Cuadra Imperial</span>
          </h2>
          <p className="text-white/70 text-xs sm:text-base font-light leading-relaxed">
            Comprar un caballo de élite no debe ser un volado. Establecemos los estándares de transparencia zootécnica y legal más rigurosos del mercado ecuestre en México.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GUARANTEES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-[#09090B] p-5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#B8860B]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#B8860B]/10 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-semibold text-[#B8860B] uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading text-white font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#3F7D58] font-medium pt-3 border-t border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Respaldado por Contrato
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
