'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "523326060218";
  const message = "Hola, estoy interesado en recibir información sobre los ejemplares frisones.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <motion.a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden w-16 h-16 flex items-center justify-center bg-gold-metallic text-[#1D1D1F] rounded-full shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300 group border border-[#FFF2CD]/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
        <MessageCircle className="relative z-10 w-7 h-7" strokeWidth={2} />
      </motion.a>
    </motion.div>
  );
}
