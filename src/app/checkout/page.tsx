"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Truck,
  CreditCard,
  Building,
  Wallet
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, hasHorseInCart, cartTotal, createOrder, user } = useStore();

  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(user?.city || "");

  // Equine specific fields as requested
  const [dni, setDni] = useState("");
  const [ranchDestination, setRanchDestination] = useState("");
  const [equineExperience, setEquineExperience] = useState("Intermedia (Más de 5 años)");
  const [vetReference, setVetReference] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<
    "Mercado Pago" | "Transferencia SPEI" | "PayPal" | "Tarjeta Débito/Crédito"
  >("Transferencia SPEI");

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl text-white mb-4">No hay artículos en tu bolsa</h2>
        <p className="text-white/85 text-sm mb-6">
          Agrega ejemplares de pura raza o productos de guarnicionería para continuar.
        </p>
        <Link
          href="/ejemplares"
          className="px-6 py-3 bg-[#D4AF37] text-[#050507] rounded-xl text-xs font-bold uppercase tracking-wider inline-block"
        >
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customerName,
        customerPhone,
        customerEmail,
        address,
        city,
        hasHorse: hasHorseInCart,
        status: hasHorseInCart ? "VERIFICANDO EQUINO" : "PENDIENTE",
        total: cartTotal,
        paymentMethod,
        items: cart,
        equineDetails: hasHorseInCart
          ? {
              dni,
              ranchDestination,
              equineExperience,
              vetReference
            }
          : undefined
      });
      setCompletedOrder(order);
      setIsProcessing(false);
    }, 1200);
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen pt-36 pb-24 px-6 max-w-3xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#141417] border-2 border-[#D4AF37] shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
            {completedOrder.hasHorse
              ? "Solicitud de Adquisición Equina Registrada"
              : "Pedido de Tienda Confirmado"}
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl text-white">
            ¡Gracias por tu compra, {completedOrder.customerName}!
          </h1>

          <div className="p-4 rounded-xl bg-[#050507] border border-white/10 text-xs text-white/70 max-w-md mx-auto space-y-2 text-left">
            <div className="flex justify-between">
              <span>Folio de Pedido:</span>
              <strong className="text-white font-mono">{completedOrder.id}</strong>
            </div>
            <div className="flex justify-between">
              <span>Monto Total:</span>
              <strong className="text-[#D4AF37] font-heading text-sm">
                {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(completedOrder.total)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Método de Pago:</span>
              <span className="text-white">{completedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Estado:</span>
              <span className="text-amber-400 font-semibold">{completedOrder.status}</span>
            </div>
          </div>

          {completedOrder.hasHorse ? (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-left text-xs text-amber-200">
              <strong className="block text-amber-300 font-semibold mb-1">
                Próximos Pasos con tu Ejemplar Frisón:
              </strong>
              Nuestro Director Técnico y Médico Veterinario te contactarán en menos de 2 horas a tu teléfono ({completedOrder.customerPhone}) para:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/80">
                <li>Validar la inspección médica y expediente radiográfico KFPS.</li>
                <li>Firmar el contrato de compraventa y garantía zootécnica.</li>
                <li>Agendar el traslado especializado hasta {completedOrder.equineDetails?.ranchDestination || "tu rancho"}.</li>
              </ul>
            </div>
          ) : (
            <p className="text-white/85 text-xs">
              Recibirás la guía de rastreo de paquetería express directamente en tu correo electrónico ({completedOrder.customerEmail}).
            </p>
          )}

          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#050507] font-heading font-bold text-xs uppercase tracking-wider"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedTotal = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(cartTotal);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto bg-[#09090B]">
      <Link
        href="/ejemplares"
        className="inline-flex items-center gap-2 text-white/85 hover:text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Seguir Comprando
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl text-white font-normal">
              Finalizar Pedido Seguro
            </h1>
            <p className="text-white/85 text-xs sm:text-sm mt-1">
              Ingresa tus datos de facturación, entrega y métodos de pago oficiales.
            </p>
          </div>

          {/* Equine Buyer Banner Notice if horse is in cart */}
          {hasHorseInCart && (
            <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500/50 text-amber-200 text-xs flex gap-3 items-start shadow-xl">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-heading text-sm mb-1">
                  Adquisición Equina de Alto Valor
                </strong>
                La compra de equinos requiere verificación oficial. Nuestro asesor ecuestre te contactará en un plazo máximo de 2 horas para coordinar la inspección veterinaria, contrato notariado y logística de transporte especializado en van acolchado.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Buyer Contact */}
            <div className="p-6 rounded-2xl bg-[#141417]/60 border border-white/10 space-y-4">
              <h3 className="font-heading text-lg text-white font-medium flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#050507] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span>Datos del Comprador</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Don Antonio Rivera"
                    className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+52 33 0000 0000"
                    className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="comprador@ejemplo.com"
                  className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                    Dirección de Facturación / Envío *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle y Número, Colonia"
                    className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
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
                    className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* If Cart Contains Horse: Mandatory Equine Verification Fields */}
            {hasHorseInCart && (
              <div className="p-6 rounded-2xl bg-[#1C1C21]/50 border-2 border-[#D4AF37]/50 space-y-4 shadow-lg">
                <h3 className="font-heading text-lg text-[#D4AF37] font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#050507] text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>Expediente de Custodia Equina (Requisito Oficial)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                      CURP / DNI / Identificación Oficial *
                    </label>
                    <input
                      type="text"
                      required
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      placeholder="CURP o RFC del titular"
                      className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                      Rancho / Hípico / Establo de Destino *
                    </label>
                    <input
                      type="text"
                      required
                      value={ranchDestination}
                      onChange={(e) => setRanchDestination(e.target.value)}
                      placeholder="Hacienda San José, Caballerizas #4"
                      className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                      Experiencia Ecuestre
                    </label>
                    <select
                      value={equineExperience}
                      onChange={(e) => setEquineExperience(e.target.value)}
                      className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Avanzada (Más de 10 años / Criador)">Avanzada (Más de 10 años / Criador)</option>
                      <option value="Intermedia (3 a 10 años)">Intermedia (3 a 10 años)</option>
                      <option value="Principiante con personal de caballeriza">Principiante con personal de caballeriza</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 font-semibold mb-1">
                      Veterinario de Referencia (Opcional)
                    </label>
                    <input
                      type="text"
                      value={vetReference}
                      onChange={(e) => setVetReference(e.target.value)}
                      placeholder="Nombre del MVZ o clínica habitual"
                      className="w-full bg-[#050507] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="p-6 rounded-2xl bg-[#141417]/60 border border-white/10 space-y-4">
              <h3 className="font-heading text-lg text-white font-medium flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#050507] text-xs font-bold flex items-center justify-center">
                  {hasHorseInCart ? "3" : "2"}
                </span>
                <span>Método de Pago Seguro</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "Transferencia SPEI", label: "Transferencia Interbancaria SPEI", icon: Building },
                  { id: "Mercado Pago", label: "Mercado Pago (Meses / Saldo)", icon: Wallet },
                  { id: "Tarjeta Débito/Crédito", label: "Tarjeta de Crédito / Débito", icon: CreditCard },
                  { id: "PayPal", label: "PayPal Internacional", icon: ShieldCheck }
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        paymentMethod === m.id
                          ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white"
                          : "bg-[#050507] border-white/10 text-white/70 hover:border-white/30"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${paymentMethod === m.id ? "text-[#D4AF37]" : "text-white/70"}`} />
                      <span className="text-xs font-semibold">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] rounded-xl font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-98"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? "Procesando Orden Segura..." : `Confirmar y Pagar ${formattedTotal}`}</span>
            </button>
          </form>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-6 rounded-3xl bg-[#141417]/80 border border-white/10 shadow-2xl space-y-6">
            <h3 className="font-heading text-xl text-white font-medium pb-4 border-b border-white/10">
              Resumen de la Orden ({cart.length})
            </h3>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id + (item.variant || "")} className="flex gap-3 items-center">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                      {item.type === "HORSE" ? "Caballo Frisón" : "Tienda"}
                    </span>
                    <h4 className="font-heading text-sm text-white truncate">{item.name}</h4>
                    {item.variant && <p className="text-[11px] text-white/75">{item.variant}</p>}
                    <span className="text-xs text-white/70">Cant: {item.quantity}</span>
                  </div>
                  <span className="font-heading text-sm font-bold text-white shrink-0">
                    {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Subtotal:</span>
                <span className="text-white">{formattedTotal}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Envío / Flete:</span>
                <span className="text-emerald-400 font-semibold">
                  {hasHorseInCart ? "Coordinación en Van VIP Incluida" : "Gratis"}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-white/10 font-bold text-white">
                <span className="font-heading">Total Final:</span>
                <span className="font-heading text-2xl text-[#D4AF37]">{formattedTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
