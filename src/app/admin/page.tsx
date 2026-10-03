"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore, Role, Lead, Order } from "@/context/StoreContext";
import { Horse } from "@/data/horses";
import { Product } from "@/data/products";
import {
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Eye,
  MessageCircle,
  FileSpreadsheet,
  Plus,
  Trash2,
  Lock,
  ExternalLink
} from "lucide-react";

export default function AdminPage() {
  const {
    role,
    setRole,
    leads,
    horses,
    products,
    orders,
    updateHorse,
    addHorse,
    deleteHorse,
    addProduct,
    deleteProduct,
    updateOrderStatus
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "horses" | "products" | "orders" | "customers" | "settings"
  >("dashboard");

  const [orderFilter, setOrderFilter] = useState<"ALL" | "HORSE" | "PRODUCT">("ALL");

  const [isCreatingHorse, setIsCreatingHorse] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // New Horse Form State
  const [horseName, setHorseName] = useState("");
  const [horseSubname, setHorseSubname] = useState("");
  const [horseKfps, setHorseKfps] = useState("");
  const [horseAge, setHorseAge] = useState("4 años");
  const [horseHeight, setHorseHeight] = useState("1.68m");
  const [horseLevel, setHorseLevel] = useState<Horse["level"]>("Alta Escuela");
  const [horseLineage, setHorseLineage] = useState("");
  const [horseStatus, setHorseStatus] = useState<Horse["status"]>("DISPONIBLE");
  const [horsePriceNum, setHorsePriceNum] = useState<number | "">("");
  const [horsePriceVis, setHorsePriceVis] = useState<"VISIBLE" | "CONSULTAR">("VISIBLE");
  const [horseLocation, setHorseLocation] = useState("Guadalajara, Jalisco");
  const [horseDesc, setHorseDesc] = useState("");

  // New Product Form State
  const [prodTitle, setProdTitle] = useState("");
  const [prodCategory, setProdCategory] = useState<Product["category"]>("Sillas de Montar");
  const [prodPrice, setProdPrice] = useState<number>(35000);
  const [prodCompare, setProdCompare] = useState<number>(40000);
  const [prodSku, setProdSku] = useState("CIL-NEW-01");
  const [prodStock, setProdStock] = useState<number>(5);
  const [prodDesc, setProdDesc] = useState("");

  // Settings State
  const [whatsappNumber, setWhatsappNumber] = useState("+52 33 2606 0218");
  const [conciergeGreeting, setConciergeGreeting] = useState(
    "Hola 👋 ¿Buscas un caballo frisón para cría, deporte o paseo de gala? Déjame ayudarte."
  );

  const exportLeadsToCSV = () => {
    const headers = ["ID", "Nombre", "Telefono", "Email", "Ciudad", "Presupuesto", "Tipo Comprador", "Caballos Vistos", "Fecha"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.city}"`,
      `"${l.budget}"`,
      `"${l.buyerType}"`,
      `"${l.horsesViewed.join("; ")}"`,
      `"${l.createdAt}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Leads_Cuadra_Imperial_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalLeads = leads.length;
  const leadsToday = leads.filter((l) => {
    const today = new Date().toISOString().slice(0, 10);
    return l.createdAt.startsWith(today);
  }).length || 2;

  const totalStoreRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalEquineInquiries = leads.reduce((sum, l) => sum + l.horsesViewed.length, 0);

  const isSuperAdmin = role === "SUPER_ADMIN";
  const isStaff = role === "STAFF";
  const hasAccess = isSuperAdmin || isStaff;

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-20">
      {/* Role Switcher Simulator Bar */}
      <div className="bg-[#141417] border-b border-[#D4AF37]/30 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <strong className="text-[#D4AF37] font-semibold uppercase tracking-wider">
            Simulador de Roles (Shopify RBAC):
          </strong>
          <span className="text-white/70">
            Rol actual activo: <strong className="text-white">{role}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRole("SUPER_ADMIN")}
            className={`px-3 py-1 rounded-md font-bold uppercase tracking-wider text-[11px] transition-all ${
              role === "SUPER_ADMIN"
                ? "bg-[#D4AF37] text-[#050507] shadow"
                : "bg-white/5 hover:bg-white/10 text-white/70"
            }`}
          >
            👑 SUPER_ADMIN (Dueño)
          </button>
          <button
            onClick={() => setRole("STAFF")}
            className={`px-3 py-1 rounded-md font-bold uppercase tracking-wider text-[11px] transition-all ${
              role === "STAFF"
                ? "bg-blue-500 text-white shadow"
                : "bg-white/5 hover:bg-white/10 text-white/70"
            }`}
          >
            👔 STAFF / EDITOR
          </button>
          <button
            onClick={() => setRole("CUSTOMER")}
            className={`px-3 py-1 rounded-md font-bold uppercase tracking-wider text-[11px] transition-all ${
              role === "CUSTOMER"
                ? "bg-rose-500 text-white shadow"
                : "bg-white/5 hover:bg-white/10 text-white/70"
            }`}
          >
            👤 CUSTOMER (Cliente)
          </button>
        </div>
      </div>

      {!hasAccess ? (
        <div className="max-w-xl mx-auto py-24 px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-3xl text-white">Acceso Restringido a /admin</h2>
          <p className="text-white/85 text-sm">
            Actualmente tu rol es <strong className="text-rose-400">CUSTOMER</strong>. El panel administrativo está reservado para personal autorizado (SUPER_ADMIN o STAFF).
          </p>
          <p className="text-xs text-white/70">
            Utiliza la barra superior de simulación de roles para cambiar a <strong>SUPER_ADMIN</strong> o <strong>STAFF</strong> y probar todas las herramientas.
          </p>
          <button
            onClick={() => setRole("SUPER_ADMIN")}
            className="px-6 py-3 bg-[#D4AF37] text-[#050507] rounded-xl font-heading font-bold text-xs uppercase tracking-wider"
          >
            Cambiar a Rol SUPER_ADMIN
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-[#09090B] border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]">
                  <Image src="/images/logo-cuadra-imperial.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-heading text-sm text-white font-medium uppercase tracking-wider">
                    Panel Imperial
                  </h3>
                  <span className="text-[10px] text-[#D4AF37] font-semibold">
                    {isSuperAdmin ? "Acceso Total Dueño" : "Staff Editor"}
                  </span>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { id: "dashboard", label: "Inicio (KPIs)", icon: LayoutDashboard },
                  { id: "horses", label: "Caballos (CRUD)", icon: Sparkles },
                  { id: "products", label: "Productos Tienda", icon: ShoppingBag },
                  { id: "orders", label: "Pedidos", icon: Package },
                  { id: "customers", label: "Clientes & Leads", icon: Users },
                  ...(isSuperAdmin ? [{ id: "settings", label: "Configuración", icon: Settings }] : [])
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all text-left ${
                        isActive
                          ? "bg-[#D4AF37] text-[#050507] font-bold shadow-md"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] text-white/75 space-y-1">
              <p>Conectado como:</p>
              <p className="text-white font-semibold truncate">{role}</p>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
            {/* TAB: DASHBOARD */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h1 className="font-heading text-3xl text-white font-normal">
                    Panel de Control & KPIs
                  </h1>
                  <p className="text-white/85 text-xs sm:text-sm mt-1">
                    Métricas en tiempo real de leads captados, caballos más cotizados y ventas de tienda.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-2xl bg-[#141417]/80 border border-white/10 space-y-2">
                    <span className="text-xs uppercase tracking-wider text-white/85">Total Leads Calificados</span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-heading text-3xl font-bold text-white">{totalLeads}</span>
                      <span className="text-xs text-emerald-400 font-semibold">+{leadsToday} hoy</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#141417]/80 border border-white/10 space-y-2">
                    <span className="text-xs uppercase tracking-wider text-white/85">Interesados por Caballo</span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-heading text-3xl font-bold text-[#D4AF37]">{totalEquineInquiries}</span>
                      <span className="text-xs text-white/75">Consultas</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#141417]/80 border border-white/10 space-y-2">
                    <span className="text-xs uppercase tracking-wider text-white/85">Tasa de Conversión Lead</span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-heading text-3xl font-bold text-emerald-400">28.4%</span>
                      <span className="text-xs text-white/75">Alta cualificación</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#141417]/80 border border-white/10 space-y-2">
                    <span className="text-xs uppercase tracking-wider text-white/85">Ventas Registradas</span>
                    <div className="flex items-baseline justify-between">
                      <span className="font-heading text-2xl font-bold text-white">
                        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(totalStoreRevenue)}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold">{orders.length} pedidos</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#141417]/50 border border-white/10 space-y-4">
                  <h3 className="font-heading text-lg text-white">
                    Caballos Más Vistos e Interés Comercial
                  </h3>

                  <div className="space-y-3">
                    {horses.slice(0, 4).map((h) => (
                      <div key={h.id} className="p-4 rounded-xl bg-[#050507] border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                            <Image src={h.images[0] || "/images/hero.jpg"} alt={h.name} fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="font-heading text-sm text-white">{h.name}</h4>
                            <p className="text-[11px] text-white/75">{h.level} · {h.status}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-xs">
                          <span className="flex items-center gap-1.5 text-white/70">
                            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> {h.viewsCount || 15} visualizaciones
                          </span>
                          <span className="font-heading text-sm font-bold text-[#D4AF37]">
                            {h.price ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(h.price) : "A Consultar"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HORSES */}
            {activeTab === "horses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-2xl text-white">Gestión de Caballos Frisones</h2>
                    <p className="text-white/85 text-xs">
                      Crear, editar, activar/desactivar visibilidad de precio o marcar como vendidos.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreatingHorse(true)}
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Caballo</span>
                  </button>
                </div>

                {isCreatingHorse && (
                  <div className="p-6 rounded-2xl bg-[#141417] border-2 border-[#D4AF37] space-y-4">
                    <h3 className="font-heading text-lg text-white">Registrar Nuevo Ejemplar</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="text-white/70 block mb-1">Nombre</label>
                        <input
                          type="text"
                          value={horseName}
                          onChange={(e) => setHorseName(e.target.value)}
                          placeholder="Ej. Jasper fan 'e Bosk"
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">Subtítulo</label>
                        <input
                          type="text"
                          value={horseSubname}
                          onChange={(e) => setHorseSubname(e.target.value)}
                          placeholder="Semental Aprobado"
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">Reg. KFPS</label>
                        <input
                          type="text"
                          value={horseKfps}
                          onChange={(e) => setHorseKfps(e.target.value)}
                          placeholder="528004 2022 09812"
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <label className="text-white/70 block mb-1">Precio MXN (Vacío para Consultar)</label>
                        <input
                          type="number"
                          value={horsePriceNum}
                          onChange={(e) => setHorsePriceNum(e.target.value ? Number(e.target.value) : "")}
                          placeholder="Ej. 1200000"
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">Visibilidad de Precio</label>
                        <select
                          value={horsePriceVis}
                          onChange={(e) => setHorsePriceVis(e.target.value as any)}
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        >
                          <option value="VISIBLE">VISIBLE</option>
                          <option value="CONSULTAR">CONSULTAR (Oculto)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">Estado</label>
                        <select
                          value={horseStatus}
                          onChange={(e) => setHorseStatus(e.target.value as any)}
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        >
                          <option value="DISPONIBLE">DISPONIBLE</option>
                          <option value="RESERVADO">RESERVADO</option>
                          <option value="VENDIDO">VENDIDO</option>
                          <option value="EN IMPORTACIÓN">EN IMPORTACIÓN</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">Nivel de Doma</label>
                        <select
                          value={horseLevel}
                          onChange={(e) => setHorseLevel(e.target.value as any)}
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        >
                          <option value="Alta Escuela">Alta Escuela</option>
                          <option value="Doma Clásica">Doma Clásica</option>
                          <option value="Enganche">Enganche</option>
                          <option value="Potro">Potro</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => setIsCreatingHorse(false)}
                        className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          if (!horseName) return;
                          const newHorse: Horse = {
                            id: horseName.toLowerCase().replace(/\s+/g, "-"),
                            slug: horseName.toLowerCase().replace(/\s+/g, "-"),
                            name: horseName,
                            subname: horseSubname || "Semental Frisón KFPS",
                            kfpsNumber: horseKfps || "528004 2022 00000",
                            age: horseAge,
                            birthYear: 2022,
                            height: horseHeight,
                            gender: "Semental",
                            level: horseLevel,
                            discipline: horseLevel,
                            lineage: horseLineage || "Linaje Real Holandés",
                            status: horseStatus,
                            price: horsePriceNum === "" ? null : horsePriceNum,
                            priceVisibility: horsePriceVis,
                            priceUsd: horsePriceNum ? Math.round(Number(horsePriceNum) / 18) : null,
                            tagline: "Nobleza y Estampa Imperial",
                            description: horseDesc || "Ejemplar frisón de pura raza seleccionado para alta escuela.",
                            character: "Temperamento equilibrado y dócil.",
                            studbookClass: "KFPS Stamboek Ster",
                            healthStatus: "14 Rx Limpias · Certificado SENASICA",
                            location: horseLocation,
                            viewsCount: 1,
                            pedigree: {
                              sire: "Alwin 469 Sport",
                              dam: "Wypkje fan 'e Zwarte",
                              sireSire: "Fabe 348",
                              sireDam: "Wobke v.d. Vrijburg",
                              damSire: "Tsjalke 397",
                              damDam: "Geertje f. Zwarte"
                            },
                            achievements: ["Premio KFPS"],
                            veterinary: {
                              senasicaCertified: true,
                              xRaysClearCount: 14,
                              piroplasmosisFree: true,
                              geneticDefectsFree: true,
                              healthPdfUrl: "#"
                            },
                            images: ["/images/tjerk.jpg", "/images/hero.jpg", "/images/portrait.jpg"],
                            featured: true,
                            recommendedProductIds: ["silla-gala-espanola", "cabezada-barroca-oro"]
                          };
                          addHorse(newHorse);
                          setIsCreatingHorse(false);
                          setHorseName("");
                        }}
                        className="px-5 py-2 rounded-lg bg-[#D4AF37] text-[#050507] font-bold text-xs"
                      >
                        Guardar Caballo
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#141417]/60">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#09090B] text-white/75 uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="p-4">Ejemplar</th>
                        <th className="p-4">Reg. KFPS</th>
                        <th className="p-4">Precio / Estado</th>
                        <th className="p-4">Visibilidad</th>
                        <th className="p-4">Vistas</th>
                        <th className="p-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {horses.map((horse) => (
                        <tr key={horse.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0">
                              <Image src={horse.images[0] || "/images/hero.jpg"} alt="" fill className="object-cover" />
                            </div>
                            <div>
                              <strong className="text-white block">{horse.name}</strong>
                              <span className="text-[10px] text-white/75">{horse.level} · {horse.age}</span>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-white/70">{horse.kfpsNumber}</td>
                          <td className="p-4">
                            <span className="font-heading font-semibold text-[#D4AF37] block">
                              {horse.price
                                ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(horse.price)
                                : "A Consultar"}
                            </span>
                            <span className="text-[10px] text-white/75">{horse.status}</span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => {
                                updateHorse({
                                  ...horse,
                                  priceVisibility: horse.priceVisibility === "VISIBLE" ? "CONSULTAR" : "VISIBLE"
                                });
                              }}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                horse.priceVisibility === "VISIBLE"
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                                  : "bg-amber-950 text-amber-300 border border-amber-500/30"
                              }`}
                            >
                              {horse.priceVisibility}
                            </button>
                          </td>
                          <td className="p-4 text-white/70 font-mono">{horse.viewsCount || 10}</td>
                          <td className="p-4 text-right space-x-2">
                            <Link
                              href={`/ejemplares/${horse.id}`}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#D4AF37] hover:text-[#050507] inline-block text-white"
                              title="Ver en vivo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            {isSuperAdmin && (
                              <button
                                onClick={() => deleteHorse(horse.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500 hover:text-white inline-block text-white/70"
                                title="Eliminar caballo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: PRODUCTS */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-2xl text-white">Productos de Guarnicionería & Tienda</h2>
                    <p className="text-white/85 text-xs">
                      Gestión tipo Shopify de inventario, stock, precios y variantes.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreatingProduct(true)}
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Producto</span>
                  </button>
                </div>

                {isCreatingProduct && (
                  <div className="p-6 rounded-2xl bg-[#141417] border-2 border-[#D4AF37] space-y-4">
                    <h3 className="font-heading text-lg text-white">Crear Producto de Tienda</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="text-white/70 block mb-1">Título</label>
                        <input
                          type="text"
                          value={prodTitle}
                          onChange={(e) => setProdTitle(e.target.value)}
                          placeholder="Ej. Silla Española de Alta Escuela"
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">Categoría</label>
                        <select
                          value={prodCategory}
                          onChange={(e) => setProdCategory(e.target.value as any)}
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        >
                          <option value="Sillas de Montar">Sillas de Montar</option>
                          <option value="Cabezadas y Frenos">Cabezadas y Frenos</option>
                          <option value="Cuidados y Nutrición">Cuidados y Nutrición</option>
                          <option value="Equipamiento de Cuadra">Equipamiento de Cuadra</option>
                          <option value="Ropa Ecuestre">Ropa Ecuestre</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">SKU</label>
                        <input
                          type="text"
                          value={prodSku}
                          onChange={(e) => setProdSku(e.target.value)}
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="text-white/70 block mb-1">Precio ($ MXN)</label>
                        <input
                          type="number"
                          value={prodPrice}
                          onChange={(e) => setProdPrice(Number(e.target.value))}
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">Precio de Comparación ($ MXN)</label>
                        <input
                          type="number"
                          value={prodCompare}
                          onChange={(e) => setProdCompare(Number(e.target.value))}
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 block mb-1">Stock Disponible</label>
                        <input
                          type="number"
                          value={prodStock}
                          onChange={(e) => setProdStock(Number(e.target.value))}
                          className="w-full bg-[#050507] border border-white/20 rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button onClick={() => setIsCreatingProduct(false)} className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs">
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          if (!prodTitle) return;
                          const newProd: Product = {
                            id: prodTitle.toLowerCase().replace(/\s+/g, "-"),
                            slug: prodTitle.toLowerCase().replace(/\s+/g, "-"),
                            title: prodTitle,
                            subtitle: "Guarnicionería artesanal de alta escuela",
                            description: prodDesc || "Producto exclusivo elaborado para Cuadra Imperial Loy.",
                            price: prodPrice,
                            compareAtPrice: prodCompare,
                            sku: prodSku,
                            stock: prodStock,
                            category: prodCategory,
                            images: ["/images/portrait.jpg", "/images/hero.jpg"],
                            rating: 5.0,
                            reviewsCount: 1,
                            details: ["Garantía de calidad", "Envío express"]
                          };
                          addProduct(newProd);
                          setIsCreatingProduct(false);
                          setProdTitle("");
                        }}
                        className="px-5 py-2 rounded-lg bg-[#D4AF37] text-[#050507] font-bold text-xs"
                      >
                        Crear Producto
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#141417]/60">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#09090B] text-white/75 uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="p-4">Producto</th>
                        <th className="p-4">Categoría</th>
                        <th className="p-4">SKU</th>
                        <th className="p-4">Precio</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0">
                              <Image src={prod.images[0] || "/images/hero.jpg"} alt="" fill className="object-cover" />
                            </div>
                            <div>
                              <strong className="text-white block">{prod.title}</strong>
                              <span className="text-[10px] text-white/75">{prod.subtitle}</span>
                            </div>
                          </td>
                          <td className="p-4 text-white/70">{prod.category}</td>
                          <td className="p-4 font-mono text-white/75">{prod.sku}</td>
                          <td className="p-4 font-heading font-bold text-[#D4AF37]">
                            {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(prod.price)}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${prod.stock > 0 ? "bg-emerald-950 text-emerald-300" : "bg-rose-950 text-rose-300"}`}>
                              {prod.stock} en stock
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {isSuperAdmin && (
                              <button
                                onClick={() => deleteProduct(prod.id)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500 hover:text-white inline-block text-white/70"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl text-white">Pedidos & Adquisiciones</h2>
                    <p className="text-white/85 text-xs">
                      Supervisión de pedidos de tienda y expedientes de compra de caballos frisones.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {["ALL", "HORSE", "PRODUCT"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setOrderFilter(f as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          orderFilter === f ? "bg-[#D4AF37] text-[#050507]" : "bg-white/5 text-white/70"
                        }`}
                      >
                        {f === "ALL" ? "Todos" : f === "HORSE" ? "🐴 Equinos" : "🛍️ Tienda"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#141417]/60">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#09090B] text-white/75 uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="p-4">Folio</th>
                        <th className="p-4">Comprador</th>
                        <th className="p-4">Tipo</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4 text-right">Actualizar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders
                        .filter((o) =>
                          orderFilter === "ALL" ? true : orderFilter === "HORSE" ? o.hasHorse : !o.hasHorse
                        )
                        .map((order) => (
                          <tr key={order.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-mono font-bold text-white">{order.id}</td>
                            <td className="p-4">
                              <strong className="text-white block">{order.customerName}</strong>
                              <span className="text-[10px] text-white/75">{order.customerPhone} · {order.city}</span>
                            </td>
                            <td className="p-4">
                              {order.hasHorse ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                                  🐴 Caballo Frisón
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/70">
                                  🛍️ Accesorios
                                </span>
                              )}
                            </td>
                            <td className="p-4 font-heading font-bold text-white">
                              {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(order.total)}
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  order.status === "ENTREGADO"
                                    ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                                    : order.status === "ENVIADO"
                                    ? "bg-blue-950 text-blue-300 border border-blue-500/30"
                                    : "bg-amber-950 text-amber-300 border border-amber-500/30"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                className="bg-[#050507] border border-white/20 rounded-lg p-1.5 text-xs text-white"
                              >
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="VERIFICANDO EQUINO">VERIFICANDO EQUINO</option>
                                <option value="ENVIADO">ENVIADO</option>
                                <option value="ENTREGADO">ENTREGADO</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: LEADS / CUSTOMERS */}
            {activeTab === "customers" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl text-white">Leads Calificados & Compradores</h2>
                    <p className="text-white/85 text-xs">
                      Prospectos captados a través del Lead Wall, ficha técnica y botón de interés.
                    </p>
                  </div>

                  <button
                    onClick={exportLeadsToCSV}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Exportar a Excel (CSV)</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#141417]/60">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#09090B] text-white/75 uppercase tracking-wider border-b border-white/10">
                      <tr>
                        <th className="p-4">Prospecto</th>
                        <th className="p-4">WhatsApp / Tel</th>
                        <th className="p-4">Ubicación</th>
                        <th className="p-4">Presupuesto</th>
                        <th className="p-4">Perfil</th>
                        <th className="p-4">Caballos Vistos</th>
                        <th className="p-4 text-right">Contactar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <strong className="text-white block">{lead.name}</strong>
                            <span className="text-[10px] text-white/75">{lead.email}</span>
                          </td>
                          <td className="p-4 font-mono text-[#D4AF37]">{lead.phone}</td>
                          <td className="p-4 text-white/70">{lead.city}</td>
                          <td className="p-4 text-emerald-400 font-semibold">{lead.budget}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-white">
                              {lead.buyerType}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {lead.horsesViewed.map((hId) => (
                                <span key={hId} className="px-2 py-0.5 rounded text-[9.5px] bg-[#141417] border border-white/10 text-white/70">
                                  {hId}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hola ${lead.name}, gusto en saludarte desde Cuadra Imperial Loy. Vimos tu interés en nuestros ejemplares frisones de pura raza.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg font-bold text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 shadow"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === "settings" && isSuperAdmin && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h2 className="font-heading text-2xl text-white">Configuración del Sistema</h2>
                  <p className="text-white/85 text-xs">
                    Parámetros de WhatsApp comercial, concierge automatizado y pasarelas.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#141417]/60 border border-white/10 space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                      Teléfono WhatsApp Oficial para Ventas
                    </label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full bg-[#050507] border border-white/20 rounded-xl p-3 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                      Saludo Automatizado del Chat Concierge
                    </label>
                    <textarea
                      rows={3}
                      value={conciergeGreeting}
                      onChange={(e) => setConciergeGreeting(e.target.value)}
                      className="w-full bg-[#050507] border border-white/20 rounded-xl p-3 text-sm text-white"
                    />
                  </div>

                  <button
                    onClick={() => alert("Configuración guardada exitosamente en el panel.")}
                    className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-bold text-xs uppercase tracking-wider shadow"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
