import Image from "next/image";
import { Plane, ShieldCheck, FileCheck, Truck } from "lucide-react";

const STEPS = [
  {
    title: "1. Selección en Origen",
    desc: "Viajamos constantemente a Frisia, Países Bajos, para seleccionar personalmente los mejores ejemplares bajo los estrictos estándares de la KFPS. Revisamos conformación, movimientos y carácter.",
    icon: ShieldCheck,
  },
  {
    title: "2. Exámenes Veterinarios",
    desc: "Antes de la exportación, cada caballo es sometido a rigurosos estudios médicos (placas, análisis de sangre) avalados por autoridades europeas y mexicanas (SENASICA).",
    icon: FileCheck,
  },
  {
    title: "3. Vuelo Internacional",
    desc: "El traslado se realiza vía aérea en vuelos especializados (KLM Cargo / Martinair) desde Ámsterdam. Los caballos viajan con atención veterinaria 24/7 y máximo confort.",
    icon: Plane,
  },
  {
    title: "4. Cuarentena y Entrega",
    desc: "A su llegada a México, el caballo cumple su periodo de cuarentena sanitaria oficial. Una vez liberado, realizamos el traslado directo en remolques premium hasta tu cuadra.",
    icon: Truck,
  }
];

export default function ImportacionPage() {
  return (
    <div className="min-h-screen bg-[#0B1528] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-24">
        <span className="font-script text-brand-oro text-5xl mb-4 block">Un proceso impecable</span>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
          Importación Directa
        </h1>
        <p className="font-sans text-white/70 text-lg md:text-xl leading-relaxed">
          Traer un ejemplar desde los Países Bajos hasta México es un proceso complejo que requiere experiencia y logística de precisión. En Cuadra Imperial nos encargamos del 100% del proceso para entregarte el caballo de tus sueños en la puerta de tu rancho.
        </p>
      </div>

      {/* Steps Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
          
          {/* Vertical line connector (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-brand-cuero/20 -translate-x-1/2" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:col-start-2 md:text-left'}`}>
                
                {/* Mobile icon / Desktop aligned icon */}
                <div className={`shrink-0 w-16 h-16 rounded-full bg-gold-metallic border border-[#FFF2CD]/40 shadow-lg flex items-center justify-center absolute md:relative left-0 md:left-auto top-0 ${isEven ? 'md:absolute md:right-0 md:translate-x-1/2' : 'md:absolute md:left-0 md:-translate-x-1/2'} z-10`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <div className="ml-24 md:ml-0 md:mt-0">
                  <h3 className="font-heading text-3xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="font-sans text-white/70 text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guarantee Banner */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-32">
        <div className="bg-[#040814] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
          <div className="relative z-10">
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-brand-cal mb-6">Tranquilidad Total</h2>
            <p className="font-sans text-brand-cal/80 text-lg max-w-2xl mx-auto mb-10">
              Todos nuestros caballos viajan con un seguro de vida y salud con cobertura internacional de "clavo a clavo". Tu inversión está protegida desde Holanda hasta que te entregamos la guía del caballo en México.
            </p>
            <a 
              href="/contacto"
              className="inline-flex relative overflow-hidden px-10 py-4 bg-gold-metallic text-white rounded-full font-sans font-bold tracking-wide shadow-[0_10px_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 group border border-[#FFF2CD]/60"
            >
              <span className="relative z-10">Contactar a un Asesor</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
