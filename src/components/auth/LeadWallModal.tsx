"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { X, Lock, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadWallModal() {
  const {
    isLeadWallOpen,
    closeLeadWall,
    leadWallTargetHorse,
    leadWallReason,
    registerLead,
    login,
    loginWithGoogle
  } = useStore();

  const [mode, setMode] = useState<"register" | "login">("register");

  // Register Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("$800,000 - $1,500,000 MXN");
  const [buyerType, setBuyerType] = useState<"Criador" | "Deportista" | "Inversionista" | "Aficionado / Particular">("Deportista");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  if (!isLeadWallOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !city) return;

    setIsSubmitting(true);
    setTimeout(() => {
      registerLead({
        name,
        phone,
        email,
        city,
        budget,
        buyerType,
        source: leadWallTargetHorse ? `Interés en ${leadWallTargetHorse.name}` : leadWallReason
      });
      setIsSubmitting(false);
    }, 400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      login(loginEmail);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLeadWall}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-[#141417] to-[#050507] border-2 border-[#D4AF37]/50 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden z-10"
        >
          {/* Header Banner */}
          <div className="relative px-6 pt-8 pb-4 text-center border-b border-white/10">
            <button
              onClick={closeLeadWall}
              className="absolute top-5 right-5 p-2 text-white/75 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Crest Emblem */}
            <div className="mx-auto w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-3 relative bg-[#09090B]">
              <Image
                src="/images/logo-cuadra-imperial.jpg"
                alt="Cuadra Imperial Loy"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso Exclusivo a Compradores Calificados</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl text-white font-normal leading-snug">
              {leadWallTargetHorse
                ? `Desbloquea la Ficha Técnica de ${leadWallTargetHorse.name}`
                : "Crea tu cuenta gratuita para acceder a toda la información"}
            </h3>

            <p className="text-white/70 text-xs sm:text-sm mt-2 max-w-md mx-auto">
              Visualiza árboles genealógicos, expedientes radiográficos oficiales KFPS, precios directos y contacta al sementalero en vivo.
            </p>

            {/* Tabs Toggle */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  mode === "register"
                    ? "bg-[#D4AF37] text-[#050507] shadow"
                    : "text-white/85 hover:text-white"
                }`}
              >
                Registro Gratuito
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  mode === "login"
                    ? "bg-[#D4AF37] text-[#050507] shadow"
                    : "text-white/85 hover:text-white"
                }`}
              >
                Ya tengo cuenta
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {/* Quick Google Sign In */}
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-md mb-6"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar con Google</span>
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#09090B] px-3 text-[10px] text-white/70 uppercase tracking-widest absolute">
                o completa el formulario
              </span>
            </div>

            {mode === "register" ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Don Antonio Rivera"
                    className="w-full bg-[#050507] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/85 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                      WhatsApp / Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+52 33 0000 0000"
                      className="w-full bg-[#050507] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/85 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@ejemplo.com"
                      className="w-full bg-[#050507] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/85 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                      Ciudad y Estado *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Guadalajara, Jalisco"
                      className="w-full bg-[#050507] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/85 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                      Tipo de Comprador *
                    </label>
                    <select
                      value={buyerType}
                      onChange={(e) => setBuyerType(e.target.value as any)}
                      className="w-full bg-[#050507] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="Criador">Criador / Ganadero</option>
                      <option value="Deportista">Deportista / Jinete de Alta Escuela</option>
                      <option value="Inversionista">Inversionista Ecuestre</option>
                      <option value="Aficionado / Particular">Aficionado / Paseo Particular</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                    Presupuesto Estimado
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#050507] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="Menos de $800,000 MXN">Menos de $800,000 MXN</option>
                    <option value="$800,000 - $1,500,000 MXN">$800,000 - $1,500,000 MXN</option>
                    <option value="$1,500,000 - $2,500,000 MXN">$1,500,000 - $2,500,000 MXN</option>
                    <option value="Más de $2,500,000 MXN">Más de $2,500,000 MXN / Sin límite</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.3)] mt-6 active:scale-98"
                >
                  <span>{isSubmitting ? "Registrando..." : "Crear Cuenta y Ver Ejemplar"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full bg-[#050507] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/85 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#050507] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/85 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.3)] mt-6"
                >
                  <span>{isSubmitting ? "Accediendo..." : "Ingresar a mi Cuenta"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-6 text-[11px] text-white/75">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Privacidad 100% Blindada
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sin llamadas spam
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
