'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc = "https://cdn.coverr.co/videos/coverr-a-black-horse-running-in-the-snow-3733/1080p.mp4", title = "Ejemplar en Movimiento" }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-negro/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-[#16130F] rounded-3xl overflow-hidden shadow-2xl border border-brand-oro/30 z-10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <span className="font-heading font-semibold text-white tracking-wide text-sm md:text-base">
                {title} · <span className="text-brand-oro font-normal">Cuadra Imperial Loy</span>
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Cerrar video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Tu navegador no soporta reproducción de video HTML5.
              </video>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
