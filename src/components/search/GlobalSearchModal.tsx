"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { Search, X, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalSearchModal() {
  const { isSearchOpen, closeSearch, horses, products, isLoggedIn, openLeadWall } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return { horses: [], products: [] };
    const q = query.toLowerCase();

    const matchedHorses = horses.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.lineage.toLowerCase().includes(q) ||
        h.level.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
    );

    const matchedProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    return { horses: matchedHorses, products: matchedProducts };
  }, [query, horses, products]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-[#09090B] border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl p-6 z-10 overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="relative flex items-center border-b border-white/10 pb-4">
            <Search className="w-5 h-5 text-[#D4AF37] absolute left-2" />
            <input
              type="text"
              autoFocus
              placeholder="Buscar caballos frisones, sillas, cabezadas o equipos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent pl-10 pr-10 text-white text-base placeholder:text-white/70 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 text-white/75 hover:text-white mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="p-2 text-white/75 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions when query is empty */}
          {!query.trim() && (
            <div className="py-8">
              <span className="text-[11px] uppercase tracking-wider text-white/70 font-semibold block mb-3">
                Búsquedas Populares
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Semental Alta Escuela",
                  "Yegua Kroon",
                  "Silla Española",
                  "Cabezada Barroca",
                  "Kit Cuidado Crines",
                  "Potro KFPS"
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 text-xs text-white/80 hover:text-[#D4AF37] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() && (
            <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-6 pr-2">
              {/* Horses */}
              {results.horses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-3">
                    <span>Caballos Frisones ({results.horses.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.horses.map((horse) => (
                      <div
                        key={horse.id}
                        onClick={() => {
                          closeSearch();
                          if (!isLoggedIn) {
                            openLeadWall(horse, "Ver ficha técnica");
                          } else {
                            router.push(`/ejemplares/${horse.id}`);
                          }
                        }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                            <Image
                              src={horse.images[0] || "/images/hero.jpg"}
                              alt={horse.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-heading text-sm text-white group-hover:text-[#D4AF37] transition-colors">
                              {horse.name}
                            </h4>
                            <p className="text-[11px] text-white/75">
                              {horse.level} · {horse.age} · {horse.status}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {results.products.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-3">
                    <span>Equipamiento & Tienda ({results.products.length})</span>
                  </div>
                  <div className="space-y-2">
                    {results.products.map((prod) => (
                      <Link
                        key={prod.id}
                        href="/tienda"
                        onClick={closeSearch}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                            <Image
                              src={prod.images[0] || "/images/hero.jpg"}
                              alt={prod.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-heading text-sm text-white group-hover:text-[#D4AF37] transition-colors">
                              {prod.title}
                            </h4>
                            <p className="text-[11px] text-white/75">
                              {prod.category} ·{" "}
                              {new Intl.NumberFormat("es-MX", {
                                style: "currency",
                                currency: "MXN",
                                maximumFractionDigits: 0
                              }).format(prod.price)}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.horses.length === 0 && results.products.length === 0 && (
                <div className="text-center py-12 text-white/75 text-sm">
                  No se encontraron resultados para &quot;{query}&quot;. Intenta con otra palabra clave.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
