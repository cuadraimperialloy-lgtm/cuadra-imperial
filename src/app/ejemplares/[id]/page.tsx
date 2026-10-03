"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Play,
  MessageCircle,
  Video,
  FileText,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Eye,
  Heart,
  Scale,
  Award,
  Lock,
  Download,
  Share2
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { STATUS_COLORS } from "@/data/horses";
import HorsePrice from "@/components/horses/HorsePrice";
import CrossSellingBundle from "@/components/horses/CrossSellingBundle";
import VideoModal from "@/components/ui/VideoModal";

export default function HorseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const {
    horses,
    isLoggedIn,
    user,
    openLeadWall,
    toggleWishlist,
    isInWishlist,
    addToComparison,
    isComparing,
    trackHorseView
  } = useStore();

  const horse = horses.find((h) => h.id === resolvedParams.id || h.slug === resolvedParams.id) || horses[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"basics" | "pedigree" | "achievements" | "veterinary" | "location">("basics");

  useEffect(() => {
    if (horse) {
      trackHorseView(horse.id);
    }
  }, [horse?.id]);

  const statusConfig = STATUS_COLORS[horse.status];
  const inWishlist = isInWishlist(horse.id);
  const comparing = isComparing(horse.id);

  // Requirement 4: Botón gigante: "Me interesa este caballo" -> Dispara WhatsApp + guarda intención
  const handleGiantInterest = () => {
    const buyerName = user ? user.name : "Comprador Interesado";
    const buyerPhone = user ? user.phone : "";
    const text = encodeURIComponent(
      `Hola, me interesa el caballo ${horse.name} ID:${horse.id}. Mi usuario es: ${buyerName} ${buyerPhone}`
    );
    window.open(`https://wa.me/523326060218?text=${text}`, "_blank");
  };

  const handleScheduleVisit = () => {
    const text = encodeURIComponent(
      `Hola Cuadra Imperial Loy, deseo agendar una visita privada en Guadalajara para realizar prueba de montura y revisar al caballo "${horse.name}" (ID: ${horse.id}).`
    );
    window.open(`https://wa.me/523326060218?text=${text}`, "_blank");
  };

  return (
    <>
      <div className="min-h-screen pt-28 pb-32 bg-[#09090B]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
          
          {/* Top Bar Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link 
              href="/ejemplares" 
              className="inline-flex items-center gap-2 text-white/85 hover:text-[#D4AF37] transition-colors font-sans text-xs font-semibold tracking-widest uppercase"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al Catálogo de Venta
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => addToComparison(horse.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  comparing ? "bg-[#D4AF37] text-[#050507] border-[#D4AF37]" : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{comparing ? "En Comparativa" : "Comparar"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(horse.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  inWishlist ? "bg-rose-600 text-white border-rose-600" : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-current" : ""}`} />
                <span>{inWishlist ? "Favorito" : "Guardar"}</span>
              </button>
            </div>
          </div>

          {/* If user is NOT logged in, show protected teaser banner with Lead Wall prompt */}
          {!isLoggedIn && (
            <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-[#1C1C21] via-[#141417] to-[#050507] border-2 border-[#D4AF37] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 text-[#D4AF37]">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl text-white font-medium">
                    Ficha Técnica y Genealogía Protegida
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-0.5">
                    Estás en Modo Previa. Registra tus datos para desbloquear el árbol genealógico completo, videos de doma y reportes radiográficos oficiales.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openLeadWall(horse, "Desbloquear ficha técnica y pedigree")}
                className="w-full md:w-auto px-6 py-3.5 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-heading font-bold text-xs uppercase tracking-widest shrink-0 shadow-lg"
              >
                Crear Cuenta Gratuita
              </button>
            </div>
          )}

          {/* Main Visual & Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Visual Gallery & Media (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div 
                onClick={() => setIsVideoOpen(true)}
                className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-black/70 border border-white/10"
              >
                <Image 
                  src={horse.images[activeImageIndex] || horse.images[0] || "/images/hero.jpg"} 
                  alt={horse.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  priority
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-2xl">
                    <Play className="w-8 h-8 text-white ml-1 fill-white" />
                  </div>
                </div>
                
                {/* Video Tag */}
                <div className="absolute bottom-5 right-5">
                  <span className="px-4 py-2 bg-[#050507]/85 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 border border-[#D4AF37]/50 shadow-lg">
                    <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-current" /> Ver Movimientos en Video
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span 
                    style={{ backgroundColor: statusConfig.bg, color: statusConfig.text }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg border ${statusConfig.border}`}
                  >
                    {statusConfig.label}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                    KFPS Reg: {horse.kfpsNumber}
                  </span>
                </div>

                {/* Social Proof Counter */}
                <div className="absolute bottom-5 left-5">
                  <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] text-white/90 flex items-center gap-1.5 border border-white/10">
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{horse.viewsCount || 14} personas vieron este ejemplar hoy</span>
                  </span>
                </div>
              </div>

              {/* Thumbnails Strip */}
              <div className="grid grid-cols-4 gap-3">
                {horse.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-video rounded-xl overflow-hidden shadow-md transition-all border-2 bg-black/50 ${
                      activeImageIndex === idx ? 'border-[#D4AF37] scale-102' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${horse.name} vista ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Trust Seals Bar */}
              <div className="p-5 rounded-2xl bg-[#141417]/50 border border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs">
                <div className="flex items-center gap-2 text-white/90">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <strong className="block font-semibold">Compra Verificada por Veterinario</strong>
                    <span className="text-[10px] text-white/75">Certificación KFPS & SENASICA</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white/90">
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <strong className="block font-semibold">Pasaporte Equino Oficial</strong>
                    <span className="text-[10px] text-white/75">Microchip y ADN verificado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Commercial & Action Panel (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Semental Pura Raza Frisón</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl text-white font-normal leading-tight tracking-tight">
                  {horse.name}
                </h1>

                <p className="text-sm sm:text-base text-white/70 mt-2 font-light">
                  {horse.tagline}
                </p>

                {/* Quick specs pill */}
                <div className="grid grid-cols-3 gap-2 p-4 rounded-xl bg-[#141417]/70 border border-white/10 text-xs my-6">
                  <div>
                    <span className="text-white/70 block text-[10px] uppercase tracking-wider">Edad</span>
                    <strong className="text-white text-sm">{horse.age}</strong>
                  </div>
                  <div>
                    <span className="text-white/70 block text-[10px] uppercase tracking-wider">Alzada</span>
                    <strong className="text-white text-sm">{horse.height}</strong>
                  </div>
                  <div>
                    <span className="text-white/70 block text-[10px] uppercase tracking-wider">Linaje</span>
                    <strong className="text-white text-sm truncate block">{horse.lineage}</strong>
                  </div>
                </div>

                {/* Componente Obligatorio: <HorsePrice horse={horse} /> */}
                <HorsePrice horse={horse} />

                {/* Requirement 3: Botón gigante "Me interesa este caballo" */}
                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={handleGiantInterest}
                    className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-heading font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(37,211,102,0.35)] active:scale-98"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Me interesa este caballo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleScheduleVisit}
                    className="w-full py-3.5 px-6 bg-[#141417] hover:bg-[#1C1C21] text-white border border-[#D4AF37]/50 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4 text-[#D4AF37]" />
                    <span>Solicitar Visita / Videollamada en Directo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Tabs Section */}
          <div className="mt-20">
            <div className="flex flex-wrap border-b border-white/10 gap-2 pb-2">
              {[
                { id: "basics", label: "1. Datos Básicos & Morfología" },
                { id: "pedigree", label: "2. Genealogía / Pedigree" },
                { id: "achievements", label: "3. Logros & Palmarés" },
                { id: "veterinary", label: "4. Sanidad / Veterinaria (PDFs)" },
                { id: "location", label: "5. Ubicación & Instalaciones" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (!isLoggedIn && (tab.id === "pedigree" || tab.id === "veterinary")) {
                      openLeadWall(horse, `Consultar ${tab.label}`);
                      return;
                    }
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-6 py-4 text-xs font-heading uppercase tracking-widest border-b-2 font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "border-[#D4AF37] text-[#D4AF37] bg-white/5"
                      : "border-transparent text-white/85 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Datos Básicos */}
            {activeTab === "basics" && (
              <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl text-white">Descripción Zootécnica</h3>
                  <p className="text-white/70 leading-relaxed font-light">{horse.description}</p>
                  
                  <div className="p-4 rounded-xl bg-[#141417]/50 border border-white/10">
                    <strong className="text-[#D4AF37] text-xs uppercase tracking-wider block mb-1">
                      Temperamento & Manejo
                    </strong>
                    <p className="text-white/80 text-xs">{horse.character}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#141417]/50 border border-white/10 space-y-3">
                  <h4 className="font-heading text-lg text-white mb-2">Ficha Registral KFPS</h4>
                  <div className="flex justify-between py-2 border-b border-white/5 text-xs">
                    <span className="text-white/75">Libro Genealógico:</span>
                    <span className="text-white font-medium">{horse.studbookClass}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5 text-xs">
                    <span className="text-white/75">Año de Nacimiento:</span>
                    <span className="text-white font-medium">{horse.birthYear}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5 text-xs">
                    <span className="text-white/75">Capa:</span>
                    <span className="text-white font-medium">Negro Azabache (Zwart) sin marcas</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5 text-xs">
                    <span className="text-white/75">Especialidad de Doma:</span>
                    <span className="text-white font-medium">{horse.discipline}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Pedigree (Interactive Visual Tree) */}
            {activeTab === "pedigree" && (
              <div className="py-8">
                <h3 className="font-heading text-2xl text-white mb-6">
                  Árbol Genealógico Oficial KFPS
                </h3>

                <div className="p-6 sm:p-8 rounded-3xl bg-[#141417]/80 border border-[#D4AF37]/30 shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {/* Level 1: Horse */}
                    <div className="p-5 rounded-2xl bg-[#D4AF37]/15 border-2 border-[#D4AF37] flex flex-col justify-center text-center shadow-lg">
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">Ejemplar Titular</span>
                      <strong className="text-white text-lg font-heading block">{horse.name}</strong>
                      <span className="text-xs text-[#D4AF37] font-mono mt-1">KFPS {horse.kfpsNumber}</span>
                    </div>

                    {/* Level 2: Parents */}
                    <div className="flex flex-col justify-around gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-center">
                        <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block mb-0.5">Padre (Sire)</span>
                        <strong className="text-white text-xs sm:text-sm block">{horse.pedigree.sire}</strong>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-center">
                        <span className="text-[10px] uppercase tracking-wider text-rose-400 font-bold block mb-0.5">Madre (Dam)</span>
                        <strong className="text-white text-xs sm:text-sm block">{horse.pedigree.dam}</strong>
                      </div>
                    </div>

                    {/* Level 3: Grandparents */}
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
                      <div className="p-3 rounded-xl bg-[#050507] border border-white/10 text-center">
                        <span className="text-[9px] uppercase tracking-widest text-white/70 block">Abuelo Paterno</span>
                        <span className="text-white text-xs font-semibold">{horse.pedigree.sireSire}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#050507] border border-white/10 text-center">
                        <span className="text-[9px] uppercase tracking-widest text-white/70 block">Abuela Paterna</span>
                        <span className="text-white text-xs font-semibold">{horse.pedigree.sireDam}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#050507] border border-white/10 text-center">
                        <span className="text-[9px] uppercase tracking-widest text-white/70 block">Abuelo Materno</span>
                        <span className="text-white text-xs font-semibold">{horse.pedigree.damSire}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#050507] border border-white/10 text-center">
                        <span className="text-[9px] uppercase tracking-widest text-white/70 block">Abuela Materna</span>
                        <span className="text-white text-xs font-semibold">{horse.pedigree.damDam}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Logros & Palmarés */}
            {activeTab === "achievements" && (
              <div className="py-8 space-y-4">
                <h3 className="font-heading text-2xl text-white mb-4">Palmarés en Países Bajos y México</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {horse.achievements.map((ach, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#141417]/60 border border-white/10 flex items-start gap-3">
                      <Award className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{ach}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Sanidad / Veterinaria */}
            {activeTab === "veterinary" && (
              <div className="py-8 space-y-6">
                <div className="p-6 rounded-2xl bg-[#141417]/60 border border-white/10">
                  <h3 className="font-heading text-xl text-white mb-2">Expediente Médico de Exportación</h3>
                  <p className="text-white/70 text-xs sm:text-sm mb-6">
                    {horse.healthStatus}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-6">
                    <div className="p-4 rounded-xl bg-[#050507] border border-white/10 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="block text-white">14 Radiografías Grado 1</strong>
                        <span className="text-white/75">Hombros, corvejones, menudillos limpios</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#050507] border border-white/10 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="block text-white">Piroplasmosis Negativa</strong>
                        <span className="text-white/75">Certificación cELISA internacional</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#050507] border border-white/10 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="block text-white">Genética Certificada</strong>
                        <span className="text-white/75">Libre de enanismo e hidrocefalia</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#descargar-pdf"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Descargando informe médico veterinario oficial KFPS en PDF.");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#050507] rounded-xl font-bold text-xs uppercase tracking-wider shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Certificado Veterinario (PDF)</span>
                  </a>
                </div>
              </div>
            )}

            {/* Tab 5: Ubicación */}
            {activeTab === "location" && (
              <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl text-white">Instalaciones de Cuadra Imperial</h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    Nuestros ejemplares se encuentran alojados en amplios boxes climatizados de 4x4m con bebederos automáticos y pistas de arena sílice para exhibición y prueba de montura.
                  </p>
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span>{horse.location}</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#141417]/50 border border-white/10 space-y-3 text-xs">
                  <strong className="text-white block font-heading text-base">Citas Privadas para Prueba</strong>
                  <p className="text-white/85">
                    Recibimos a criadores y clientes de toda la República con previa cita. Contamos con transporte privado desde el Aeropuerto de Guadalajara.
                  </p>
                  <button
                    onClick={handleScheduleVisit}
                    className="px-5 py-2.5 bg-[#D4AF37] text-[#050507] rounded-xl font-bold uppercase tracking-wider"
                  >
                    Agendar Cita en Guadalajara
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Requirement 4: Cross-Selling Bundle Section */}
          <CrossSellingBundle horse={horse} />

        </div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="https://cdn.coverr.co/videos/coverr-a-black-horse-running-in-the-snow-3733/1080p.mp4"
        title={horse.name}
      />
    </>
  );
}
