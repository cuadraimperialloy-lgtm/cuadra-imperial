"use client";

import { Search, Stethoscope, FileText, Truck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Elige tu Ejemplar",
    desc: "Revisa nuestro inventario de caballos listos en México o solicita la importación de un semental o yegua con características a la medida en Frisia."
  },
  {
    step: "02",
    icon: Stethoscope,
    title: "Inspección & Rx",
    desc: "Tu médico veterinario recibe el set de 14 placas Rx, certificado KFPS y video de movimientos. Puedes agendar prueba presencial en Guadalajara."
  },
  {
    step: "03",
    icon: FileText,
    title: "Apartado (20%)",
    desc: "Formalizamos la reserva con contrato de compraventa y factura fiscal mexicana. El precio pactado se congela sin cargos ocultos de aduana."
  },
  {
    step: "04",
    icon: Truck,
    title: "Entrega en Rancho",
    desc: "Llevamos al caballo en remolque con suspensión neumática hasta cualquier estado de México con guía SENASICA y seguro activo."
  }
];

export default function BuyingProcess() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#09090B] relative border-b border-[#B8860B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#B8860B] mb-2 block font-sans">
            Sin Complicaciones
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading text-white font-normal mb-3">
            Proceso de Compra <span className="italic font-script text-[#B8860B] text-3xl sm:text-5xl lg:text-6xl">Paso a Paso</span>
          </h2>
          <p className="text-white/70 text-xs sm:text-base font-light">
            Un proceso de adquisición claro, legal y respaldado con logística internacional llave en mano.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-[#141417] p-5 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl border border-white/10 relative flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#B8860B] flex items-center justify-center text-[#09090B] font-bold shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-white/20">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-heading text-white font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
