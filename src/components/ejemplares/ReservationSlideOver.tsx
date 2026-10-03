'use client';
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Building2, CreditCard } from "lucide-react";
import { useState } from "react";

export default function ReservationSlideOver({ isOpen, onClose, horse }: { isOpen: boolean, onClose: () => void, horse: any }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'transfer' | null>(null);

  // Math for the deposit
  const total = horse.priceUsd || 45000; 
  const deposit = total * 0.20;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040405]/80 backdrop-blur-sm z-[100]"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#09090B] shadow-2xl z-[101] flex flex-col border-l border-brand-oro/30/20"
          >
            {/* Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-brand-oro/30/20">
              <h2 className="font-heading text-2xl font-bold text-white">Reserva Exclusiva</h2>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              
              {/* Product Summary */}
              <div className="flex gap-4 items-center mb-8 p-4 bg-white/5/50 rounded-2xl border border-brand-oro/30/10">
                <div className="w-20 h-20 rounded-xl bg-[#040405] overflow-hidden relative shrink-0">
                  <img src={horse.images[0]} className="w-full h-full object-cover" alt="Caballo" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-oro">Ejemplar Seleccionado</span>
                  <h3 className="font-heading text-xl font-bold text-white">{horse.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                     <p className="font-sans text-xs text-white/85">{horse.level}</p>
                     <p className="font-sans text-xs font-bold text-white">{formatMoney(total)}</p>
                  </div>
                </div>
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <p className="font-sans text-white/80 text-sm leading-relaxed mb-6">
                    Paso 1 de 2: Información de Contacto. El ejemplar será bloqueado una vez que se confirme el anticipo del 20%.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-white/85 text-xs font-bold uppercase tracking-widest pl-2">Nombre Completo</label>
                      <input type="text" className="w-full bg-white/5 border border-brand-oro/30/20 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-oro focus:ring-1 transition-colors" />
                    </div>
                    <div>
                      <label className="text-white/85 text-xs font-bold uppercase tracking-widest pl-2">WhatsApp</label>
                      <input type="tel" className="w-full bg-white/5 border border-brand-oro/30/20 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-oro focus:ring-1 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-brand-oro/30/20 mb-6">
                    <h4 className="font-heading text-lg font-semibold text-white mb-4">Resumen Financiero</h4>
                    <div className="flex justify-between text-sm mb-2 text-white/70">
                      <span>Valor Total del Ejemplar</span>
                      <span>{formatMoney(total)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-white border-t border-brand-oro/30/10 pt-4 mt-2">
                      <span>Anticipo a Pagar (20%)</span>
                      <span className="text-brand-oro">{formatMoney(deposit)}</span>
                    </div>
                  </div>

                  <h4 className="font-heading text-lg font-semibold text-white mb-4">Método de Pago</h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => setPaymentMethod('transfer')}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'transfer' ? 'border-brand-oro bg-brand-oro/5' : 'border-brand-oro/30/20 bg-white/5 hover:border-brand-oro/30/50'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'transfer' ? 'bg-brand-oro text-white' : 'bg-black/5 text-white/75'}`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Transferencia SPEI / Wire</p>
                        <p className="text-xs text-white/85 mt-0.5">Sin comisiones adicionales</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'paypal' ? 'border-[#003087] bg-[#003087]/5' : 'border-brand-oro/30/20 bg-white/5 hover:border-brand-oro/30/50'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'paypal' ? 'bg-[#003087] text-white' : 'bg-black/5 text-white/75'}`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#003087] text-sm">PayPal</p>
                        <p className="text-xs text-white/85 mt-0.5">Paga con tarjeta de crédito o débito</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full py-10">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                    <ShieldCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-4">Solicitud Recibida</h3>
                  <p className="font-sans text-white/70 text-sm leading-relaxed max-w-sm mb-8">
                    {paymentMethod === 'paypal' 
                      ? `Te hemos enviado un enlace de PayPal seguro para completar el pago de ${formatMoney(deposit)}.` 
                      : `Te hemos enviado por WhatsApp las instrucciones para la transferencia bancaria de ${formatMoney(deposit)}.`}
                    <br/><br/>
                    Una vez reflejado el pago, {horse.name} quedará bloqueado comercialmente a tu nombre.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/5 border-t border-brand-oro/30/10">
              {step === 1 && (
                <button onClick={() => setStep(2)} className="w-full relative overflow-hidden px-8 py-4 bg-[#040405] text-white text-center rounded-xl font-sans font-bold text-sm tracking-widest uppercase hover:-translate-y-1 transition-transform group">
                  <span className="relative z-10">Continuar al Pago</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
                </button>
              )}
              {step === 2 && (
                <button 
                  onClick={() => setStep(3)} 
                  disabled={!paymentMethod}
                  className={`w-full relative overflow-hidden px-8 py-4 text-center rounded-xl font-sans font-bold text-sm tracking-widest uppercase transition-all ${paymentMethod ? 'bg-gold-metallic text-white shadow-lg hover:-translate-y-1' : 'bg-black/10 text-black/40 cursor-not-allowed'}`}
                >
                  Confirmar Reserva por {formatMoney(deposit)}
                </button>
              )}
              {step === 3 && (
                <button onClick={onClose} className="w-full px-8 py-4 bg-[#040405]/5 text-white text-center rounded-xl font-sans font-bold text-sm tracking-widest uppercase hover:bg-[#040405]/10 transition-colors">
                  Cerrar Panel
                </button>
              )}
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
