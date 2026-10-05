'use client';

import Link from 'next/link';
import BrandLogo from './BrandLogo';

// Social Media Inline SVGs
const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#050507] text-white pt-16 sm:pt-20 pb-8 mt-auto border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
        
        {/* Brand & Socials */}
        <div className="md:col-span-5 flex flex-col space-y-4">
          <BrandLogo />
          <span className="font-script text-[#D4AF37] text-2xl block">
            Venta e Importación de Caballos Frisones de Pura Raza
          </span>
          <p className="font-sans text-white/70 text-xs md:text-sm font-light max-w-sm leading-relaxed">
            Selección directa en Frisia, Países Bajos. Registros oficiales KFPS, 14 radiografías grado 1, seguro internacional clavo a clavo y entrega garantizada en todo el territorio mexicano.
          </p>

          {/* Social Media Links */}
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://www.facebook.com/CuadraImperialLoy/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#141417] border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all"
              title="Facebook Oficial"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/cuadraimperialloy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#141417] border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all"
              title="Instagram Oficial"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@cuadraimperialloy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#141417] border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all"
              title="TikTok Oficial"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-4 flex flex-col space-y-4">
          <h4 className="font-heading font-semibold tracking-widest uppercase text-[#D4AF37] text-xs">
            Navegación & Marketplace
          </h4>
          <ul className="space-y-2.5 font-sans text-white/80 text-xs uppercase tracking-wider font-semibold">
            <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
            <li><Link href="/ejemplares" className="hover:text-[#D4AF37] transition-colors">Caballos en Venta</Link></li>
            <li><Link href="/tienda" className="hover:text-[#D4AF37] transition-colors">Tienda de Guarnicionería</Link></li>
            <li><Link href="/importacion" className="hover:text-[#D4AF37] transition-colors">Logística & SENASICA</Link></li>
            <li><Link href="/nosotros" className="hover:text-[#D4AF37] transition-colors">Garantía Zootécnica</Link></li>
            <li><Link href="/admin" className="hover:text-[#D4AF37] transition-colors text-[#D4AF37]">Acceso Administrativo (/admin)</Link></li>
          </ul>
        </div>

        {/* Contact & Countries */}
        <div className="md:col-span-3 flex flex-col space-y-4">
          <h3 className="font-sans text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">
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

          <div className="pt-2 border-t border-white/10">
            <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">
              Países de Operación
            </span>
            <div className="flex items-center gap-3 text-sm">
              <span title="México">🇲🇽 MX</span>
              <span title="USA">🇺🇸 US</span>
              <span title="Holanda">🇳🇱 NL</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium text-white/75 gap-4">
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
