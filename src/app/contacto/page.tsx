import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#09090B] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-script text-brand-oro text-5xl mb-4 block">Hablemos</span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Contacto
          </h1>
          <p className="font-sans text-white/70 text-lg leading-relaxed">
            Estamos a tu entera disposición para resolver cualquier duda sobre nuestro catálogo, el proceso de importación o para agendar una visita privada a nuestras instalaciones.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Info Cards */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white/5/60 p-8 rounded-[2rem] border border-brand-oro/30/10 shadow-sm flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-gold-metallic shrink-0 flex items-center justify-center shadow-md">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-white">Ubicación</h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed">
                  Cuadra Imperial<br />
                  Guadalajara, Jalisco<br />
                  México
                </p>
              </div>
            </div>

            <div className="bg-white/5/60 p-8 rounded-[2rem] border border-brand-oro/30/10 shadow-sm flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-gold-metallic shrink-0 flex items-center justify-center shadow-md">
                <Phone className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-white">Atención Directa</h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed mb-4">
                  Llamadas o mensajes para atención inmediata.
                </p>
                <a href="https://wa.me/523326060218" className="font-heading font-bold text-brand-oro hover:text-brand-oro transition-colors">
                  +52 33 2606 0218
                </a>
              </div>
            </div>
            
            <div className="bg-white/5/60 p-8 rounded-[2rem] border border-brand-oro/30/10 shadow-sm flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-gold-metallic shrink-0 flex items-center justify-center shadow-md">
                <Mail className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-2 text-white">Correo Electrónico</h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed mb-4">
                  Consultas formales y cotizaciones.
                </p>
                <a href="mailto:info@cuadraimperial.com" className="font-heading font-bold text-brand-oro hover:text-brand-oro transition-colors">
                  info@cuadraimperial.com
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-2/3 bg-[#040405] rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent z-0" />
             <div className="relative z-10">
               <h2 className="font-heading text-3xl md:text-4xl text-brand-cal font-semibold mb-8">Envíanos un Mensaje</h2>
               <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-brand-cal/60 text-xs font-bold uppercase tracking-widest pl-2">Nombre Completo</label>
                     <input type="text" className="w-full bg-white/5/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cal placeholder:text-white/20 focus:outline-none focus:border-brand-oro focus:ring-1 focus:ring-brand-oro transition-colors" placeholder="Juan Pérez" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-brand-cal/60 text-xs font-bold uppercase tracking-widest pl-2">Teléfono / WhatsApp</label>
                     <input type="tel" className="w-full bg-white/5/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cal placeholder:text-white/20 focus:outline-none focus:border-brand-oro focus:ring-1 focus:ring-brand-oro transition-colors" placeholder="+52 000 000 0000" />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-brand-cal/60 text-xs font-bold uppercase tracking-widest pl-2">Correo Electrónico</label>
                   <input type="email" className="w-full bg-white/5/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cal placeholder:text-white/20 focus:outline-none focus:border-brand-oro focus:ring-1 focus:ring-brand-oro transition-colors" placeholder="juan@ejemplo.com" />
                 </div>

                 <div className="space-y-2">
                   <label className="text-brand-cal/60 text-xs font-bold uppercase tracking-widest pl-2">Mensaje</label>
                   <textarea rows={4} className="w-full bg-white/5/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-cal placeholder:text-white/20 focus:outline-none focus:border-brand-oro focus:ring-1 focus:ring-brand-oro transition-colors" placeholder="Me interesa el ejemplar Tjerk..."></textarea>
                 </div>

                 <button type="button" className="w-full relative overflow-hidden px-10 py-5 bg-gold-metallic text-white text-center rounded-2xl font-sans font-bold text-lg tracking-wide shadow-[0_10px_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 group border border-[#FFF2CD]/60 mt-4">
                   <span className="relative z-10">Enviar Mensaje</span>
                   <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
                 </button>
               </form>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
