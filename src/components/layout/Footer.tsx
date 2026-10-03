'use client';

import Link from 'next/link';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-[#040405] text-white pt-20 pb-8 mt-auto border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Brand */}
        <div className="md:col-span-5 flex flex-col space-y-4">
          <BrandLogo />
          <span className="font-script text-[#D4AF37] text-2xl block">
            Venta e Importación de Caballos Frisones de Pura Raza
          </span>
          <p className="font-sans text-white/70 text-xs md:text-sm font-light max-w-sm leading-relaxed">
            Selección directa en Frisia, Países Bajos. Registros oficiales KFPS, 14 radiografías grado 1, seguro internacional clavo a clavo y entrega garantizada en todo el territorio mexicano.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-4 flex flex-col space-y-4">
          <h4 className="font-heading font-semibold tracking-widest uppercase text-[#D4AF37] text-xs">
            Navegación & Marketplace
          </h4>
          <ul className="space-y-2.5 font-sans text-white/80 text-xs uppercase tracking-wider font-semibold">
            <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
            <li><Link href="/ejemplares" className="hover:text-[#D4AF37] transition-colors">Caballos en Venta (Teaser)</Link></li>
            <li><Link href="/tienda" className="hover:text-[#D4AF37] transition-colors">Tienda de Guarnicionería</Link></li>
            <li><Link href="/importacion" className="hover:text-[#D4AF37] transition-colors">Logística & SENASICA</Link></li>
            <li><Link href="/nosotros" className="hover:text-[#D4AF37] transition-colors">Garantía Zootécnica</Link></li>
            <li><Link href="/admin" className="hover:text-[#D4AF37] transition-colors text-[#D4AF37]">Acceso Administrativo (/admin)</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3 flex flex-col">
          <h3 className="font-sans text-xs font-semibold text-[#D4AF37] mb-4 uppercase tracking-widest">
            Atención Comercial
          </h3>
          <ul className="space-y-3 font-sans text-xs md:text-sm text-white/75">
            <li>
              <a 
                href="https://wa.me/523326060218" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] transition-colors font-bold text-white flex items-center gap-1.5"
              >
                <span>+52 33 2606 0218</span>
              </a>
              <span className="text-[10px] text-white/70 block">Llamadas & WhatsApp Oficial</span>
            </li>
            <li>
              <a href="mailto:info@cuadraimperial.com" className="hover:text-[#D4AF37] transition-colors">
                ventas@cuadraimperial.com
              </a>
            </li>
            <li className="pt-1 text-white/75 text-xs">
              Hacienda Cuadra Imperial · Guadalajara, Jalisco, México
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium text-white/75 gap-4">
        <p>&copy; {new Date().getFullYear()} Cuadra Imperial Loy. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          <Link href="/privacidad" className="hover:text-[#D4AF37] transition-colors">
            Aviso de Privacidad
          </Link>
          <Link href="/terminos" className="hover:text-[#D4AF37] transition-colors">
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
