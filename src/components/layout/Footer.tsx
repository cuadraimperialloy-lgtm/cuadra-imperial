'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#040814] text-white pt-20 pb-8 mt-auto border-t border-[#B8860B]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Brand */}
        <div className="md:col-span-5 flex flex-col">
          <span className="font-heading font-medium text-2xl tracking-widest text-[#B8860B] mb-2 uppercase">
            Cuadra Imperial Loy
          </span>
          <span className="font-script text-white text-2xl mb-4 block">
            Venta de Caballos Frisones de Pura Raza
          </span>
          <p className="font-sans text-white/70 text-xs md:text-sm font-light max-w-sm leading-relaxed mb-6">
            Selección e importación directa desde Frisia, Países Bajos, con registro oficial KFPS, radiografías de exportación y entrega en todo México.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-3 flex flex-col space-y-4">
          <h4 className="font-heading font-semibold tracking-widest uppercase text-[#B8860B] text-xs">Venta & Catálogo</h4>
          <ul className="space-y-2.5 font-sans text-white/80 text-xs uppercase tracking-wider font-semibold">
            <li><Link href="/" className="hover:text-[#B8860B] transition-colors">Inicio</Link></li>
            <li><Link href="/ejemplares" className="hover:text-[#B8860B] transition-colors">Caballos en Venta</Link></li>
            <li><Link href="/importacion" className="hover:text-[#B8860B] transition-colors">Logística de Entrega</Link></li>
            <li><Link href="/nosotros" className="hover:text-[#B8860B] transition-colors">Garantía Zootécnica</Link></li>
            <li><Link href="/contacto" className="hover:text-[#B8860B] transition-colors">Citas en Guadalajara</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4 flex flex-col">
          <h3 className="font-sans text-xs font-semibold text-[#B8860B] mb-4 uppercase tracking-widest">Atención Comercial</h3>
          <ul className="space-y-3 font-sans text-xs md:text-sm text-white/75">
            <li>
              <a 
                href="https://wa.me/523326060218" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8860B] transition-colors font-bold"
              >
                +52 33 2606 0218 (Llamadas & WhatsApp)
              </a>
            </li>
            <li>
              <a href="mailto:info@cuadraimperial.com" className="hover:text-[#B8860B] transition-colors">
                info@cuadraimperial.com
              </a>
            </li>
            <li className="pt-1 text-white/50">
              Guadalajara, Jalisco, México
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium text-white/50 gap-4">
        <p>&copy; {new Date().getFullYear()} Cuadra Imperial Loy. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <Link href="/privacidad" className="hover:text-[#B8860B] transition-colors">
            Aviso de Privacidad
          </Link>
          <Link href="/terminos" className="hover:text-[#B8860B] transition-colors">
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
