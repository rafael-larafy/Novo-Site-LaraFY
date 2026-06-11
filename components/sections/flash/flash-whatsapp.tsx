"use client";

// COPY: números e claims pendentes de validação com a Larafy.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_NUMBER = "5541999999999"; // TODO: número real da Larafy
const WHATSAPP_MESSAGE = "Olá! Quero um diagnóstico tributário para minha empresa.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function FlashWhatsapp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a LaraFy no WhatsApp"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-[90] grid h-14 w-14 place-items-center rounded-full bg-[#07e0ff] shadow-[0_12px_30px_-8px_rgba(7,224,255,0.45)] transition-transform duration-200 hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#002e43]" aria-hidden>
            <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 00-.7.3A2.8 2.8 0 006 9.3c0 1.7 1.2 3.3 1.4 3.5a11 11 0 004.2 3.7c2.2.9 2.2.6 2.6.6.4 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
