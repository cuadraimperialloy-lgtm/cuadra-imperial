"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Caballos en Venta", href: "/ejemplares" },
    { name: "Garantía & Proceso", href: "/importacion" },
    { name: "La Cuadra", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-[#070D1B]/95 backdrop-blur-md border-b border-[#B8860B]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop & Mobile Main Row */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#B8860B] bg-[#B8860B]/10 flex items-center justify-center font-heading font-bold text-xs text-[#B8860B] group-hover:bg-[#B8860B] group-hover:text-[#0B1528] transition-colors">
              CIL
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-heading font-light tracking-[0.15em] text-white uppercase group-hover:text-[#B8860B] transition-colors">
                Cuadra Imperial
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#B8860B]/80 font-sans hidden sm:block">
                Frisones de Pura Raza · México
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-[#B8860B] font-semibold transition-colors relative py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://wa.me/523326060218?text=Hola,%20me%20interesa%20comprar%20un%20caballo%20fris%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#B8860B] hover:bg-[#D9B25A] text-[#0B1528] rounded-md font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Ventas</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-[#B8860B] focus:outline-none"
              aria-label="Menú"
            >
              {isOpen ? <X className="w-6 h-6 text-[#B8860B]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#070D1B] border-t border-[#B8860B]/20 overflow-hidden"
          >
            <div className="px-5 py-6 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm uppercase tracking-widest text-white/90 hover:text-[#B8860B] font-medium py-1.5 border-b border-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href="https://wa.me/523326060218?text=Hola,%20me%20interesa%20comprar%20un%20caballo%20fris%C3%B3n."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#B8860B] text-[#0B1528] rounded-md font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar Asesor de Venta</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
