"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { X, ShoppingBag, Trash2, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    hasHorseInCart,
    cartTotal,
    cartCount
  } = useStore();

  if (!isCartOpen) return null;

  const formattedTotal = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(cartTotal);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-[#050507] border-l border-[#D4AF37]/30 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-heading text-lg text-white uppercase tracking-wider">
                  Bolsa Imperial ({cartCount})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-white/75 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                aria-label="Cerrar bolsa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Equine Buyer Notice as required */}
            {hasHorseInCart && (
              <div className="m-4 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300 font-semibold mb-1">
                    Verificación de Adquisición Equina
                  </strong>
                  La compra de equinos requiere verificación oficial. Nuestro asesor ecuestre te contactará en un plazo máximo de 2 horas para coordinar la inspección veterinaria, contrato notariado y logística de transporte especializado.
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/85 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-white/85 text-sm font-light">Tu bolsa está vacía</p>
                  <Link
                    href="/ejemplares"
                    onClick={closeCart}
                    className="mt-4 px-6 py-2.5 bg-[#D4AF37] text-[#050507] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#E8C678] transition-colors"
                  >
                    Explorar Caballos
                  </Link>
                </div>
              ) : (
                cart.map((item) => {
                  const itemPriceFormatted = new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                    maximumFractionDigits: 0
                  }).format(item.price);

                  return (
                    <div
                      key={item.id + (item.variant || "")}
                      className="p-4 rounded-xl bg-[#141417]/60 border border-white/10 flex gap-4 items-center group hover:border-[#D4AF37]/30 transition-colors"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          {item.type === "HORSE" ? (
                            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                              Ejemplar Equino KFPS
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-white/10 text-white/70">
                              Tienda Imperial
                            </span>
                          )}
                        </div>

                        <h4 className="font-heading text-sm text-white font-medium truncate">
                          {item.name}
                        </h4>

                        {item.variant && (
                          <p className="text-[11px] text-white/75">Opción: {item.variant}</p>
                        )}
                        {item.horseKfps && (
                          <p className="text-[11px] text-[#D4AF37]/80 font-mono">
                            Reg. {item.horseKfps}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-heading text-sm font-bold text-[#D4AF37]">
                            {itemPriceFormatted}
                          </span>

                          {item.type === "PRODUCT" ? (
                            <div className="flex items-center border border-white/20 rounded-md overflow-hidden bg-[#050507]">
                              <button
                                onClick={() => updateQuantity(item.id, -1, item.variant)}
                                className="px-2 py-0.5 text-xs text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-semibold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1, item.variant)}
                                className="px-2 py-0.5 text-xs text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-white/70 italic">Único ejemplar</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="p-2 text-white/85 hover:text-rose-400 transition-colors"
                        title="Eliminar de la bolsa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with Checkout CTA */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#09090B] space-y-4">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-white/85 uppercase tracking-wider text-xs">Total Estimado</span>
                  <span className="font-heading text-2xl font-bold text-white">
                    {formattedTotal}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-white/75">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pagos encriptados con seguridad bancaria de 256 bits</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                >
                  <span>Proceder al Pago Seguro</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
