"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { STORE_CATEGORIES, Product } from "@/data/products";
import {
  ShoppingBag,
  Star,
  Filter,
  Search,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TiendaPage() {
  const { products, addToCart, openCart } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(65000);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "Todos" && p.category !== selectedCategory) {
        return false;
      }
      if (p.price > maxPrice) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [products, selectedCategory, maxPrice, searchQuery]);

  const handleOpenProductModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants?.[0]?.options[0] || "");
    setQuantity(1);
  };

  const handleAddToCart = (product: Product, variant?: string, qty: number = 1) => {
    addToCart({
      type: "PRODUCT",
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0] || "/images/hero.jpg",
      quantity: qty,
      sku: product.sku,
      variant: variant || (product.variants?.[0]?.options[0] ?? undefined)
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto bg-[#09090B]">
      {/* Banner / Store Header */}
      <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-r from-[#1C1C21] via-[#141417] to-[#050507] border border-[#D4AF37]/40 p-8 sm:p-14 shadow-2xl">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Guarnicionería & Alta Escuela</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl text-white font-normal leading-tight tracking-tight">
            Tienda Oficial Cuadra Imperial
          </h1>
          <p className="text-white/75 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Equipamiento exclusivo para el caballo Frisón y su jinete. Monturas artesanales de gala, cabezadas en piel europea con herrajes dorados y nutrición especializada.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/80">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF37]" /> Envío express a todo México
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Garantía artesanal de 5 años
            </span>
          </div>
        </div>
      </div>

      {/* Main Controls & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {STORE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#D4AF37] text-[#050507] shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold"
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Price Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141417] border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/70 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white uppercase tracking-wider"
          >
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Filtro ({filteredProducts.length})</span>
          </button>
        </div>
      </div>

      {/* Expandable Price Slider */}
      {isFilterOpen && (
        <div className="mb-8 p-5 rounded-2xl bg-[#141417]/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex justify-between text-xs text-white/80 mb-2">
              <span>Precio máximo:</span>
              <strong className="text-[#D4AF37] font-heading text-sm">
                {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(maxPrice)}
              </strong>
            </div>
            <input
              type="range"
              min="3000"
              max="65000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#D4AF37]"
            />
          </div>

          <button
            onClick={() => {
              setMaxPrice(65000);
              setSelectedCategory("Todos");
              setSearchQuery("");
            }}
            className="text-xs text-white/85 hover:text-[#D4AF37] underline whitespace-nowrap"
          >
            Restablecer filtros
          </button>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const formattedPrice = new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0
          }).format(product.price);

          const formattedCompare = product.compareAtPrice
            ? new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
                maximumFractionDigits: 0
              }).format(product.compareAtPrice)
            : null;

          return (
            <div
              key={product.id}
              className="group rounded-2xl bg-[#141417]/40 border border-white/10 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.12)] transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div
                onClick={() => handleOpenProductModal(product)}
                className="relative aspect-square w-full overflow-hidden bg-black/60 cursor-pointer"
              >
                <Image
                  src={product.images[0] || "/images/hero.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#050507]/90 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                    {product.badge}
                  </span>
                )}

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] text-white/90 flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#D4AF37] fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => handleOpenProductModal(product)}
                    className="font-heading text-lg font-medium text-white group-hover:text-[#D4AF37] transition-colors leading-snug cursor-pointer"
                  >
                    {product.title}
                  </h3>
                  <p className="text-white/85 text-xs line-clamp-2 mt-1">
                    {product.subtitle}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>En stock ({product.stock} disponibles)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-2xl font-bold text-white">
                      {formattedPrice}
                    </span>
                    {formattedCompare && (
                      <span className="text-xs text-white/70 line-through">
                        {formattedCompare}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2.5 px-3 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Agregar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenProductModal(product)}
                      className="p-2.5 rounded-lg border border-white/20 hover:border-[#D4AF37] text-white/80 hover:text-white transition-colors"
                      title="Ver detalles"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#09090B] border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-white/85 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Images */}
                <div className="space-y-3">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/10">
                    <Image
                      src={selectedProduct.images[0] || "/images/hero.jpg"}
                      alt={selectedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {selectedProduct.images.length > 1 && (
                    <div className="flex gap-2">
                      {selectedProduct.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 bg-black"
                        >
                          <Image src={img} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                      {selectedProduct.category} · SKU: {selectedProduct.sku}
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl text-white font-normal mt-1">
                      {selectedProduct.title}
                    </h2>
                    <p className="text-white/85 text-xs sm:text-sm mt-2 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    {/* Features */}
                    <div className="mt-4 space-y-1.5">
                      {selectedProduct.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Variants */}
                    {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                      <div className="mt-6 space-y-3">
                        {selectedProduct.variants.map((v) => (
                          <div key={v.name}>
                            <label className="block text-[11px] uppercase tracking-wider text-white/85 font-semibold mb-1">
                              {v.name}
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {v.options.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setSelectedVariant(opt)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                    selectedVariant === opt
                                      ? "bg-[#D4AF37] text-[#050507] border-[#D4AF37] font-bold"
                                      : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="font-heading text-3xl font-bold text-white">
                        {new Intl.NumberFormat("es-MX", {
                          style: "currency",
                          currency: "MXN",
                          maximumFractionDigits: 0
                        }).format(selectedProduct.price)}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold">
                        Stock disponible: {selectedProduct.stock} unidades
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/20 rounded-xl overflow-hidden bg-[#050507]">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 text-sm text-white/70 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-4 text-xs font-bold text-white">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                          className="px-3 py-2 text-sm text-white/70 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          handleAddToCart(selectedProduct, selectedVariant, quantity);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Agregar al Carrito</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
