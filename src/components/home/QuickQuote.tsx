"use client";

import { useState } from "react";
import { MessageCircle, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function QuickQuote() {
  const [horseType, setHorseType] = useState("Semental de Alta Escuela");
  const [budget, setBudget] = useState("$800,000 - $1,200,000 MXN");
  const [clientState, setClientState] = useState("Jalisco");
  const [clientPhone, setClientPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const whatsappMessage = `Hola Cuadra Imperial Loy, busco comprar un caballo frisón en México. Tipo: ${horseType}, Presupuesto: ${budget}, Estado de entrega: ${clientState}. Mi teléfono es: ${clientPhone}`;
  const whatsappUrl = `https://wa.me/523326060218?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#09090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#141417] via-[#0D182E] to-[#080F1E] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#B8860B]/30 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Direct Sales Value */}
            <div className="lg:col-span-6">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#B8860B] mb-2 block font-sans">
                Atención Comercial Inmediata
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading text-white font-normal mb-4 leading-tight">
                ¿Listo para adquirir tu <br />
                <span className="italic font-script text-[#B8860B] text-3xl sm:text-5xl lg:text-6xl">Frisón Imperial?</span>
              </h2>
              <p className="text-white/75 text-xs sm:text-base font-light mb-6 leading-relaxed">
                Nuestros asesores ecuestres están disponibles para resolver cualquier duda técnica sobre nuestro inventario en Guadalajara o gestionar la importación de tu caballo ideal desde los Países Bajos.
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#B8860B]/15 border border-[#B8860B]/40 flex items-center justify-center text-[#B8860B] shrink-0">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-white/70 block">Teléfono y WhatsApp de Ventas</span>
                    <a href="https://wa.me/523326060218" className="font-heading font-bold text-white hover:text-[#B8860B] transition-colors">
                      +52 33 2606 0218
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#B8860B]/15 border border-[#B8860B]/40 flex items-center justify-center text-[#B8860B] shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-white/70 block">Caballerizas y Picadero</span>
                    <span className="text-white font-medium">Guadalajara, Jalisco, México</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Quote Form */}
            <div className="lg:col-span-6 bg-[#080F1E] p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl">
              {sent ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#3F7D58]/20 border border-[#3F7D58] flex items-center justify-center mx-auto mb-3 text-[#3F7D58]">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading text-white font-medium mb-2">Solicitud Registrada</h3>
                  <p className="text-xs text-white/70 max-w-sm mx-auto mb-5">
                    Te contactaremos a la brevedad con las opciones que mejor se adaptan a tu presupuesto y disciplina.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8860B] text-[#09090B] rounded-md font-bold text-xs uppercase tracking-wider shadow"
                  >
                    <MessageCircle className="w-4 h-4" /> Contactar por WhatsApp Ahora
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <h3 className="text-base sm:text-lg font-heading text-white font-medium mb-3">
                    Cotización Rápida de Compra
                  </h3>

                  <div>
                    <label className="text-[10px] sm:text-[11px] text-white/85 font-semibold uppercase tracking-wider block mb-1">
                      Tipo de Ejemplar Buscado
                    </label>
                    <select
                      value={horseType}
                      onChange={(e) => setHorseType(e.target.value)}
                      className="w-full bg-[#141417] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#B8860B]"
                    >
                      <option value="Semental de Alta Escuela">Semental de Alta Escuela / Rienda</option>
                      <option value="Yegua de Cría Kroon">Yegua de Cría (Linaje Kroon / Model)</option>
                      <option value="Caballo de Paseo y Familia">Caballo de Paseo y Familia (Doma Noble)</option>
                      <option value="Potro Joven en Crecimiento">Potro Joven (2 a 3 años)</option>
                      <option value="Caballo de Enganche">Ejemplar para Enganche a Carruaje</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] sm:text-[11px] text-white/85 font-semibold uppercase tracking-wider block mb-1">
                        Rango de Presupuesto
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-[#141417] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#B8860B]"
                      >
                        <option value="$800,000 - $1,000,000 MXN">$800,000 - $1,000,000 MXN</option>
                        <option value="$1,000,000 - $1,400,000 MXN">$1,000,000 - $1,400,000 MXN</option>
                        <option value="$1,400,000+ MXN">$1,400,000+ MXN (Alta Escuela)</option>
                        <option value="Por Definir">Por Definir / Asesoría</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] sm:text-[11px] text-white/85 font-semibold uppercase tracking-wider block mb-1">
                        Estado de Entrega (México)
                      </label>
                      <input
                        type="text"
                        value={clientState}
                        onChange={(e) => setClientState(e.target.value)}
                        placeholder="Ej. Jalisco, Querétaro, N.L."
                        className="w-full bg-[#141417] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#B8860B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] sm:text-[11px] text-white/85 font-semibold uppercase tracking-wider block mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+52 33 0000 0000"
                      className="w-full bg-[#141417] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full py-3 sm:py-3.5 bg-[#B8860B] hover:bg-[#D9B25A] text-[#09090B] rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Solicitar Opciones de Compra</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
