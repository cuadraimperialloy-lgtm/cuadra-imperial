"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Horse } from "@/data/horses";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/data/products";
import { Check, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";

interface CrossSellingBundleProps {
  horse: Horse;
}

export default function CrossSellingBundle({ horse }: CrossSellingBundleProps) {
  const { products, addToCart, openCart, isLoggedIn, openLeadWall } = useStore();

  // Find matching products from horse recommendedProductIds or fallback
  const matchingProducts: Product[] = products.filter((p) =>
    horse.recommendedProductIds?.includes(p.id)
  ).slice(0, 3);

  // If none matched, pick 3 default products
  const recommendedItems = matchingProducts.length > 0 ? matchingProducts : products.slice(0, 3);

  // Checkbox state for products
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    recommendedItems.map((p) => p.id)
  );

  const hasHorsePrice =
    horse.price !== null &&
    horse.price !== undefined &&
    horse.price > 0 &&
    horse.priceVisibility !== "CONSULTAR";

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const selectedProducts = recommendedItems.filter((p) => selectedProductIds.includes(p.id));
  const productsSubtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  // 10% discount on the equipment pack when purchased together with the horse!
  const equipmentDiscount = Math.round(productsSubtotal * 0.1);
  const discountedEquipmentTotal = productsSubtotal - equipmentDiscount;

  const totalBundlePrice = (horse.price || 0) + discountedEquipmentTotal;

  const handleBuyPack = () => {
    if (!isLoggedIn) {
      openLeadWall(horse, "Adquirir este paquete ecuestre completo");
      return;
    }

    if (hasHorsePrice && horse.price) {
      // Add horse to cart
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
    }

    // Add selected discounted products to cart
    selectedProducts.forEach((prod) => {
      const discountedItemPrice = Math.round(prod.price * 0.9);
      addToCart({
        type: "PRODUCT",
        id: prod.id,
        name: `${prod.title} (Descuento Pack 10%)`,
        price: discountedItemPrice,
        image: prod.images[0] || "/images/hero.jpg",
        quantity: 1,
        sku: prod.sku,
        variant: prod.variants?.[0]?.options[0]
      });
    });

    openCart();
  };

  if (recommendedItems.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Guarnicionería & Alta Escuela</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-white font-normal">
            {hasHorsePrice
              ? "Llévalo Completo y Equipado"
              : "Equipos Recomendados para este Ejemplar"}
          </h2>
          <p className="text-white/85 text-sm mt-1 max-w-xl">
            {hasHorsePrice
              ? "Guarnicionería a medida diseñada para la cruz ancha y porte barroco del caballo frisón. Ahorra 10% en accesorios al adquirirlos en pack con tu ejemplar."
              : "Complementa la doma y cuidado de este caballo con accesorios artesanales probados por nuestros jinetes profesionales."}
          </p>
        </div>

        {!hasHorsePrice && (
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050507] text-xs font-bold uppercase tracking-wider transition-all self-start md:self-auto"
          >
            <span>Ver Tienda Completa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Grid of Recommended Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedItems.map((prod) => {
          const isSelected = selectedProductIds.includes(prod.id);
          const formattedProdPrice = new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0
          }).format(prod.price);

          return (
            <div
              key={prod.id}
              onClick={() => hasHorsePrice && toggleProduct(prod.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                hasHorsePrice
                  ? isSelected
                    ? "bg-[#141417]/90 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer"
                    : "bg-[#09090B]/80 border-white/10 opacity-70 cursor-pointer hover:border-white/30"
                  : "bg-[#09090B]/80 border-white/10"
              }`}
            >
              <div>
                {/* Product Image */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-black/60 border border-white/10">
                  <Image
                    src={prod.images[0] || "/images/hero.jpg"}
                    alt={prod.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {hasHorsePrice && (
                    <div
                      className={`absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                        isSelected
                          ? "bg-[#D4AF37] border-[#D4AF37] text-[#050507]"
                          : "bg-black/60 border-white/30 text-transparent"
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                  {prod.badge && (
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#050507]/90 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <span className="text-[10px] uppercase tracking-widest text-white/75 block mb-1">
                  {prod.category}
                </span>
                <h4 className="font-heading text-base text-white font-medium mb-1">
                  {prod.title}
                </h4>
                <p className="text-white/85 text-xs line-clamp-2 mb-3">
                  {prod.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-heading text-lg font-bold text-[#D4AF37]">
                    {formattedProdPrice}
                  </span>
                  {hasHorsePrice && isSelected && (
                    <span className="text-[10px] text-emerald-400 block font-semibold">
                      -10% en pack
                    </span>
                  )}
                </div>

                {!hasHorsePrice && (
                  <Link
                    href={`/tienda?categoria=${encodeURIComponent(prod.category)}`}
                    className="px-4 py-2 bg-white/5 hover:bg-[#D4AF37] hover:text-[#050507] rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-colors"
                  >
                    Ver en Tienda
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Bundle Summary Bar (If Horse Has Price) */}
      {hasHorsePrice && selectedProducts.length > 0 && (
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1C1C21]/90 via-[#141417]/90 to-[#050507]/90 border-2 border-[#D4AF37]/50 shadow-[0_0_35px_rgba(212,175,55,0.25)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 backdrop-blur-xl">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Descuento Exclusivo por Pack
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-white">
              Llévate a {horse.name} + {selectedProducts.length} accesorios de alta gama
            </h3>
            <p className="text-white/70 text-xs sm:text-sm">
              Precio total normal:{" "}
              <span className="line-through text-white/75">
                {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format((horse.price || 0) + productsSubtotal)}
              </span>{" "}
              ·{" "}
              <strong className="text-emerald-400 font-bold">
                ¡Ahorras {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(equipmentDiscount)}!
              </strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-4 lg:shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[11px] uppercase tracking-wider text-white/75 block">Total con Descuento</span>
              <span className="font-heading text-3xl sm:text-4xl font-bold text-white">
                {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(totalBundlePrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleBuyPack}
              className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Comprar Pack Completo con Accesorios</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
