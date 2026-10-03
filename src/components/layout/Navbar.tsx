"use client";

import { useState } from "react";
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

  const links = [
    { name: "Caballos en Venta", href: "/ejemplares" },
    { name: "Tienda", href: "/tienda" },
    { name: "Garantía KFPS", href: "/importacion" },
    { name: "La Cuadra", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-[#09090B]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo (Emblem only, links to Home) */}
          <BrandLogo />

          {/* Desktop Nav Links - Clean & Airy */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9 ml-6">
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
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-white hover:text-[#D4AF37] rounded-lg hover:bg-white/5 focus:outline-none transition-colors"
                aria-label="Abrir Menú de Navegación"
              >
                {isOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-[#050507] border-t border-[#D4AF37]/30 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              
              {/* Navigation Links */}
              <div className="space-y-1">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center justify-between text-sm uppercase tracking-widest font-medium py-3 border-b border-white/5 transition-colors ${
                        isActive ? "text-[#D4AF37] font-bold" : "text-white/85 hover:text-[#D4AF37]"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/30" />
                    </Link>
                  );
                })}

                {(role === "SUPER_ADMIN" || role === "STAFF") && (
                  <Link
                    href="/admin"
                    className="flex items-center justify-between text-sm uppercase tracking-widest text-[#D4AF37] font-bold py-3 border-b border-white/5"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>👑 Panel de Administración</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>
                )}
              </div>

              {/* Wishlist on Mobile */}
              {wishlist.length > 0 && (
                <Link
                  href="/ejemplares"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2.5 text-xs text-rose-400 font-semibold uppercase tracking-wider"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Favoritos Guardados</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px]">
                    {wishlist.length}
                  </span>
                </Link>
              )}

              {/* User Profile or Lead Wall Access */}
              <div className="pt-2 flex flex-col gap-3">
                {isLoggedIn ? (
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
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
                      Salir
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
