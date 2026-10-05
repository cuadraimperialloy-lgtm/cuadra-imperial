"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import BrandLogo from "./BrandLogo";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MessageCircle,
  ShoppingBag,
  Search,
  Heart,
  User as UserIcon,
  ChevronDown,
  ArrowRight
} from "lucide-react";

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
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z"/>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const {
    user,
    role,
    isLoggedIn,
    logout,
    openLeadWall,
    openCart,
    cartCount,
    wishlist,
    openSearch
  } = useStore();

  // Prevent background scrolling when mobile full-screen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const links = [
    { name: "Caballos en Venta", href: "/ejemplares" },
    { name: "Tienda", href: "/tienda" },
    { name: "Garantía KFPS", href: "/importacion" },
    { name: "La Cuadra", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <nav className="fixed w-full z-50 transition-all duration-300 bg-[#09090B]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo (Emblem only, links to Home) */}
            <BrandLogo />

            {/* Desktop Nav Links - Clean & Airy */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[11.5px] uppercase tracking-[0.18em] font-medium transition-colors relative py-1.5 ${
                      isActive
                        ? "text-[#D4AF37] font-semibold"
                        : "text-white/80 hover:text-[#D4AF37]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37]" />
                    )}
                  </Link>
                );
              })}

              {(role === "SUPER_ADMIN" || role === "STAFF") && (
                <Link
                  href="/admin"
                  className="text-[11px] uppercase tracking-[0.18em] text-[#D4AF37] hover:text-[#E8C678] font-semibold transition-colors py-1 flex items-center gap-1 border border-[#D4AF37]/40 px-2.5 py-1 rounded-md bg-[#D4AF37]/5"
                >
                  <span>Panel Admin</span>
                </Link>
              )}
            </div>

            {/* Desktop Flags: Mexico, USA, Holanda */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs" title="Operación Internacional: México (Sede Guadalajara) · USA · Holanda (KFPS)">
              <span className="text-sm cursor-help" title="México · Sede Guadalajara">🇲🇽</span>
              <span className="text-sm cursor-help" title="USA · Tránsito y Cuarentena">🇺🇸</span>
              <span className="text-sm cursor-help" title="Holanda · Origen KFPS Stamboek">🇳🇱</span>
            </div>

            {/* Desktop Social Links */}
            <div className="hidden lg:flex items-center gap-2.5 text-white/70">
              <a
                href="https://www.facebook.com/CuadraImperialLoy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition-colors"
                title="Facebook Oficial"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/cuadraimperialloy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition-colors"
                title="Instagram Oficial"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@cuadraimperialloy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition-colors"
                title="TikTok Oficial"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Trigger */}
              <button
                type="button"
                onClick={openSearch}
                className="p-2 sm:p-2.5 rounded-full text-white/80 hover:text-[#D4AF37] hover:bg-white/5 transition-colors"
                title="Buscar en el catálogo"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Indicator (Desktop) */}
              {wishlist.length > 0 && (
                <Link
                  href="/ejemplares"
                  className="hidden sm:flex p-2 sm:p-2.5 rounded-full text-rose-400 hover:bg-white/5 transition-colors relative"
                  title="Favoritos"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[8.5px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                </Link>
              )}

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="p-2 sm:p-2.5 rounded-full text-white/85 hover:text-[#D4AF37] hover:bg-white/5 transition-colors relative"
                title="Bolsa de compra"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#D4AF37] text-[#050507] text-[9.5px] font-black flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Desktop Auth / User Profile */}
              {isLoggedIn ? (
                <div className="hidden sm:block relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141417] border border-[#D4AF37]/50 text-white text-xs font-semibold hover:border-[#D4AF37] transition-all"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="max-w-[90px] truncate">{user?.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#D4AF37] text-[#050507] rounded font-bold">
                      {role === "SUPER_ADMIN" ? "ADMIN" : role === "STAFF" ? "STAFF" : "VIP"}
                    </span>
                    <ChevronDown className="w-3 h-3 text-white/50" />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#09090B] border border-[#D4AF37]/40 shadow-2xl p-3 z-50 text-xs text-white"
                      >
                        <div className="p-2 border-b border-white/10 mb-2">
                          <p className="font-bold text-white truncate">{user?.name}</p>
                          <p className="text-[11px] text-white/60 truncate">{user?.email}</p>
                          <p className="text-[10px] text-[#D4AF37] mt-1 font-semibold uppercase">Rol: {role}</p>
                        </div>

                        {(role === "SUPER_ADMIN" || role === "STAFF") && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white font-medium mb-1"
                          >
                            👑 Panel de Administración
                          </Link>
                        )}

                        <Link
                          href="/tienda"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 font-medium mb-1"
                        >
                          🛍️ Tienda
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-500/20 text-rose-300 font-medium transition-colors"
                        >
                          Cerrar Sesión
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openLeadWall(null, "Acceso a Compradores")}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/60 hover:border-[#D4AF37] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-white/5 transition-all"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Acceso Compradores</span>
                </button>
              )}

              {/* Mobile Hamburger Menu Toggle Button */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-2.5 text-white hover:text-[#D4AF37] rounded-lg hover:bg-white/5 focus:outline-none transition-colors"
                  aria-label="Abrir Menú de Navegación"
                >
                  <Menu className="w-6 h-6 text-white" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* FULL-SCREEN MOBILE OVERLAY MENU (Covers the entire screen) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 w-screen h-[100dvh] z-[100] bg-[#050507] text-white flex flex-col justify-between overflow-y-auto p-6 sm:p-8"
          >
            {/* Top Bar inside Fullscreen Menu */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div onClick={() => setIsOpen(false)}>
                <BrandLogo />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-11 h-11 rounded-full bg-[#141417] border border-[#D4AF37]/50 text-white flex items-center justify-center hover:border-[#D4AF37] active:scale-95 transition-all"
                aria-label="Cerrar Menú"
              >
                <X className="w-6 h-6 text-[#D4AF37]" />
              </button>
            </div>

            {/* Navigation Links - Large Luxury Typography */}
            <div className="py-6 flex flex-col space-y-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-3.5 text-xl sm:text-2xl font-heading tracking-wide border-b border-white/5 transition-all ${
                      isActive ? "text-[#D4AF37] font-semibold pl-2 border-l-2 border-[#D4AF37]" : "text-white/85 hover:text-[#D4AF37]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]/60" />
                  </Link>
                );
              })}

              {(role === "SUPER_ADMIN" || role === "STAFF") && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3.5 text-xl font-heading text-[#D4AF37] border-b border-white/5"
                >
                  <span>👑 Panel Admin</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>
              )}
            </div>

            {/* International Flags: Mexico, USA, Holanda */}
            <div className="py-4 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-2 font-mono">
                Presencia Internacional & Logística
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-full bg-[#141417] border border-white/10 text-white flex items-center gap-2">
                  <span className="text-base">🇲🇽</span> México (Sede)
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#141417] border border-white/10 text-white flex items-center gap-2">
                  <span className="text-base">🇺🇸</span> USA
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#141417] border border-white/10 text-white flex items-center gap-2">
                  <span className="text-base">🇳🇱</span> Holanda (KFPS)
                </span>
              </div>
            </div>

            {/* Social Media Links: Facebook, Instagram, TikTok */}
            <div className="py-4 border-t border-white/10 flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold font-mono">
                Redes Oficiales
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/CuadraImperialLoy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#141417] border border-white/10 hover:border-[#D4AF37] text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
                >
                  <FacebookIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/cuadraimperialloy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#141417] border border-white/10 hover:border-[#D4AF37] text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@cuadraimperialloy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#141417] border border-white/10 hover:border-[#D4AF37] text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
                >
                  <TikTokIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* Bottom Actions: WhatsApp & Acceso */}
            <div className="pt-2 flex flex-col gap-2.5">
              {isLoggedIn ? (
                <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10 flex items-center justify-between">
                  <div>
                    <strong className="text-white text-xs block">{user?.name}</strong>
                    <span className="text-[10px] text-[#D4AF37] font-semibold uppercase">{role}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-semibold"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openLeadWall(null, "Acceso a Compradores");
                  }}
                  className="w-full py-3.5 border-2 border-[#D4AF37] text-white hover:bg-[#D4AF37]/10 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Acceso Compradores (Registro)</span>
                </button>
              )}

              <a
                href="https://wa.me/523326060218?text=Hola,%20me%20interesa%20comprar%20un%20caballo%20fris%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar Asesor por WhatsApp</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
