"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { MessageSquare, X, Send, MessageCircle, Bot, Sparkles, User as UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  action?: {
    label: string;
    whatsappText?: string;
    openLeadWall?: boolean;
  };
}

export default function ChatConcierge() {
  const {
    user,
    proactiveChatTriggered,
    dismissProactiveChat,
    openLeadWall,
    leadWallTargetHorse,
    horses
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  // Requirement 4: Mensaje automático al entrar
  useEffect(() => {
    if (!hasShownWelcome) {
      const timer = setTimeout(() => {
        setMessages([
          {
            id: "msg-welcome",
            sender: "bot",
            text: "Hola 👋 ¿Buscas un caballo frisón para cría, deporte o paseo de gala? Déjame ayudarte a encontrar el ejemplar ideal para tus metas.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            action: {
              label: "Ver Ejemplares Disponibles",
              whatsappText: "Hola, me gustaría recibir asesoría para elegir el mejor caballo frisón disponible."
            }
          }
        ]);
        setHasShownWelcome(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasShownWelcome]);

  // Requirement 4: Si el usuario ve 2 caballos sin registrarse: mensaje proactivo
  useEffect(() => {
    if (proactiveChatTriggered && !user) {
      setIsOpen(true);
      setMessages((prev) => [
        ...prev,
        {
          id: "msg-proactive-" + Date.now(),
          sender: "bot",
          text: "Quizás esto te interesa: ¿Quieres que te envíe por WhatsApp los mejores ejemplares según tu presupuesto?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          action: {
            label: "💬 Enviar por WhatsApp",
            whatsappText: "Hola, vi varios ejemplares en su web y me gustaría recibir por WhatsApp las opciones recomendadas según mi presupuesto."
          }
        }
      ]);
      dismissProactiveChat();
    }
  }, [proactiveChatTriggered, user, dismissProactiveChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputText;
    setInputText("");

    // Automated smart concierge response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: `Excelente consulta. Un asesor de Cuadra Imperial Loy puede enviarte videos de prueba y pedigrees oficiales de inmediato a tu WhatsApp. ¿Deseas conectarte ahora?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: {
          label: "Hablar con Asesor en WhatsApp",
          whatsappText: `Hola, estaba chateando en la web sobre: "${query}". Mi usuario es ${user ? user.name : "Visitante VIP"} y me gustaría más información.`
        }
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  const handleActionClick = (action: ChatMessage["action"]) => {
    if (!action) return;
    if (action.openLeadWall && !user) {
      openLeadWall(null, "Conectar con Asesor");
      return;
    }
    if (action.whatsappText) {
      const url = `https://wa.me/523326060218?text=${encodeURIComponent(action.whatsappText)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Proactive Speech Bubble Notification when closed */}
        {!isOpen && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="hidden sm:block cursor-pointer bg-[#09090B] border border-[#D4AF37]/50 rounded-2xl p-3.5 shadow-2xl max-w-xs text-xs text-white backdrop-blur-xl relative group hover:border-[#D4AF37]"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-[#D4AF37] font-semibold text-[11px] uppercase tracking-wider">
                Concierge Ecuestre
              </strong>
            </div>
            <p className="text-white/80 line-clamp-2">
              {messages[messages.length - 1].text}
            </p>
          </motion.div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#141417] hover:bg-[#1C1C21] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 relative"
          aria-label="Abrir chat concierge"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#D4AF37]" />
          ) : (
            <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
          )}

          {/* Indicator dot */}
          {!isOpen && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#09090B]" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md bg-[#050507] border-2 border-[#D4AF37]/50 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#141417] to-[#050507] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37] bg-black shrink-0">
                  <Image
                    src="/images/logo-cuadra-imperial.jpg"
                    alt="Cuadra Imperial Loy"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-sm text-white font-medium">
                    Concierge Cuadra Imperial
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>En línea · Respuesta inmediata</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/75 hover:text-white rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#09090B]/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                      msg.sender === "user"
                        ? "bg-[#D4AF37] text-[#050507] rounded-br-none font-medium"
                        : "bg-[#141417] text-white border border-white/10 rounded-bl-none"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span
                      className={`text-[9px] mt-1 block ${
                        msg.sender === "user" ? "text-[#050507]/60 text-right" : "text-white/70"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>

                  {msg.action && (
                    <button
                      type="button"
                      onClick={() => handleActionClick(msg.action)}
                      className="mt-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-transform hover:scale-102"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>{msg.action.label}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2.5 bg-[#050507] border-t border-white/5 flex flex-wrap gap-2 text-[11px]">
              <button
                onClick={() => {
                  const url = `https://wa.me/523326060218?text=${encodeURIComponent(
                    "Hola, deseo consultar el precio y condiciones de entrega del caballo frisón Tjerk van de Zwarte."
                  )}`;
                  window.open(url, "_blank");
                }}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 text-white/80 shrink-0 whitespace-nowrap transition-colors"
              >
                🐴 Consultar semental
              </button>
              <button
                onClick={() => {
                  const url = `https://wa.me/523326060218?text=${encodeURIComponent(
                    "Hola, me interesa agendar una videollamada para ver los caballos en la hacienda de Guadalajara."
                  )}`;
                  window.open(url, "_blank");
                }}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 text-white/80 shrink-0 whitespace-nowrap transition-colors"
              >
                📹 Agendar videollamada
              </button>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#050507] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-[#141417] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/70 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C678] text-[#050507] transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
