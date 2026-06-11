"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { EcosystemConstellation } from "@/components/ecosystem-constellation"


export function BrazilDetail({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // ESC para fechar + trava o scroll do body enquanto aberto
  useEffect(() => {
    if (!open) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#04101f]/45 backdrop-blur-xl backdrop-saturate-150"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_120%_at_50%_42%,rgba(4,16,31,0.12)_0%,rgba(4,16,31,0.74)_72%)]"
          />

          <div
            className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <EcosystemConstellation />
            </motion.div>

            <motion.div
              className="space-y-4 rounded-3xl bg-[#04101f]/60 p-6 text-center shadow-[0_8px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 lg:p-8 lg:text-left"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-[#00e5ff]">
                Ecossistema Larafy
              </p>
              <h2 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
                A Larafy atende o Brasil inteiro
              </h2>
              <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia.
              </p>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Voltar"
            className="absolute left-6 top-6 z-[120] inline-flex items-center gap-2 rounded-full bg-[#00e5ff] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[#04101f] shadow-[0_0_24px_rgba(0,229,255,0.45)] transition hover:bg-[#5cefff] hover:shadow-[0_0_32px_rgba(0,229,255,0.75)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
