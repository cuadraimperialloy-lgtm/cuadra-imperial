import Image from "next/image";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#09090B] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2">
            <span className="font-script text-brand-oro text-5xl mb-4 block">Nuestra Pasión</span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
              El Legado Imperial
            </h1>
            
            <div className="space-y-6 font-sans text-white/80 text-lg leading-relaxed">
              <p>
                Fundada por verdaderos apasionados del caballo frisón, <strong className="text-white">Cuadra Imperial</strong> nace con el propósito de elevar el estándar ecuestre en México. Nos especializamos exclusivamente en la raza frisona, asegurando que cada ejemplar que tocamos representa la excelencia pura de los Países Bajos.
              </p>
              <p>
                No somos simples intermediarios; somos criadores y conocedores. Trabajamos directamente con las mejores cuadras certificadas por la <strong>KFPS (Koninklijke Vereniging "Het Friesch Paarden-Stamboek")</strong> en Leeuwarden, Holanda.
              </p>
              <p>
                Nuestro compromiso es la transparencia absoluta. Entendemos que adquirir un caballo de élite es una inversión emocional y financiera. Por ello, ofrecemos una gestión clara, asesoría zootécnica y un proceso logístico donde tu tranquilidad es la máxima prioridad.
              </p>
            </div>
          </div>

          {/* Right: Majestic Imagery */}
          <div className="w-full lg:w-1/2 flex gap-6 h-[70vh]">
            <div className="w-1/2 h-full relative rounded-t-full overflow-hidden shadow-2xl mt-12">
              <Image src="/images/portrait.jpg" alt="Cuadra Imperial" fill className="object-cover" />
            </div>
            <div className="w-1/2 h-full relative rounded-b-full overflow-hidden shadow-2xl mb-12">
              <Image src="/images/hero.jpg" alt="Instalaciones Cuadra Imperial" fill className="object-cover grayscale-[20%]" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
