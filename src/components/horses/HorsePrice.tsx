"use client";

import React from "react";
import { Horse } from "@/data/horses";
import { useStore } from "@/context/StoreContext";
import { ShoppingCart, MessageCircle, Video, ShieldCheck, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface HorsePriceProps {
  horse: Horse;
  isCompact?: boolean;
}

export default function HorsePrice({ horse, isCompact = false }: HorsePriceProps) {
  const { addToCart, openCart, openLeadWall, isLoggedIn } = useStore();
  const router = useRouter();

  // Price Logic strictly per prompt:
  // SI horse.price NO ES NULL Y > 0 y priceVisibility !== 'CONSULTAR':
  const hasValidPrice =
    horse.price !== null &&
    horse.price !== undefined &&
    horse.price > 0 &&
    horse.priceVisibility !== "CONSULTAR";

  const formattedPriceMxn = horse.price
    ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(horse.price)
    : "";

  const formattedPriceUsd = horse.priceUsd
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(horse.priceUsd)
    : horse.price
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(horse.price / 18))
    : "";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      openLeadWall(horse, "Reservar o comprar este ejemplar");
      return;
    }
    if (!hasValidPrice || !horse.price) return;

    addToCart({
      type: "HORSE",
      id: horse.id,
      name: horse.name,
      price: horse.price,
      image: horse.images[0] || "/images/hero.jpg",
      quantity: 1,
      horseKfps: horse.kfpsNumber,
      sku: `EQUINO-${horse.kfpsNumber.replace(/\s+/g, "")}`
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(e);
    openCart();
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Prompt specification:
    // Lleva a WhatsApp con mensaje: "Hola, quiero más detalles del caballo ${horse.name} ID ${horse.id}"
    const text = encodeURIComponent(
      `Hola, quiero más detalles del caballo ${horse.name} ID ${horse.id} (Registro KFPS: ${horse.kfpsNumber})`
    );
    window.open(`https://wa.me/523326060218?text=${text}`, "_blank");
  };

  const handleScheduleVideoCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hola Cuadra Imperial Loy, deseo agendar una videollamada en vivo para ver la morfología y prueba de montura del caballo "${horse.name}" ID: ${horse.id}`
    );
    window.open(`https://wa.me/523326060218?text=${text}`, "_blank");
  };

  if (isCompact) {
    // Card teaser mode
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          {hasValidPrice ? (
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight">
                {formattedPriceMxn}
              </span>
              <span className="text-[10px] text-white/75 uppercase tracking-widest font-mono">
                ~ {formattedPriceUsd} USD
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#B8860B]/15 text-[#D4AF37] border border-[#B8860B]/40">
                Precio a Consultar
              </span>
              <span className="text-[9px] text-white/75 tracking-wider mt-0.5">
                Venta personalizada
              </span>
            </div>
          )}
        </div>

        {/* Buttons in Card */}
        <div className="flex items-center gap-2 pt-1">
          {hasValidPrice ? (
            <>
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-2.5 px-3 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Agregar al Carrito</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="flex-1 py-2.5 px-3 bg-[#105232] hover:bg-[#156e43] text-emerald-100 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-emerald-500/30 shadow-md active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Consultar por WhatsApp</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Full Detail Mode (on /ejemplares/[id] or /caballos/[slug])
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141417]/90 to-[#050507]/90 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
            {hasValidPrice ? "Valor de Inversión Zootécnica" : "Cotización Especializada"}
          </span>
          {hasValidPrice ? (
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {formattedPriceMxn}
              </span>
              <span className="text-sm sm:text-base text-[#D4AF37] font-mono font-medium">
                ({formattedPriceUsd} USD)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl text-lg sm:text-2xl font-heading font-bold uppercase tracking-wider bg-[#B8860B]/20 text-[#D4AF37] border border-[#B8860B]/50">
                Precio a Consultar
              </span>
              <span className="text-xs text-white/85">
                (Atención directa con Director de Cuadra)
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-2 rounded-xl self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Contrato notariado & SENASICA</span>
        </div>
      </div>

      {/* Action Buttons as Required */}
      <div className="pt-6 flex flex-col sm:flex-row gap-4">
        {hasValidPrice ? (
          <>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-4 px-6 bg-transparent hover:bg-white/5 text-white border-2 border-[#D4AF37] rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg hover:border-[#E8C678]"
            >
              <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
              <span>Agregar al Carrito</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 py-4 px-6 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] font-heading"
            >
              <span>Comprar Ahora</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="flex-1 py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Solicitar Precio por WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleScheduleVideoCall}
              className="flex-1 py-4 px-6 bg-transparent hover:bg-white/5 text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4 text-[#D4AF37]" />
              <span>Agendar Videollamada</span>
            </button>
          </>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-white/85 gap-2">
        <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
          <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Modalidad: 1 solo pago (1 exhibición · Sin MSI)
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Incluye 14 radiografías de exportación
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Seguro internacional clavo a clavo
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Entrega en van especializado en todo México
        </span>
      </div>
    </div>
  );
}
