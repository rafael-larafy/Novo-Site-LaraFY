"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { PainelLarafy } from "./painel-larafy"

export function TransparenciaSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.15)

  return (
    <section ref={ref} className="relative py-16 lg:py-24 overflow-hidden bg-[#0a1628]">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-2 h-2 bg-[#00e5ff] rounded-full" />
        <div className="absolute top-20 right-40 w-1 h-1 bg-[#00e5ff] rounded-full" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-[#00e5ff] rounded-full" />
        {[20, 35, 50, 65, 80].map((top, i) => (
          <div
            key={i}
            className="absolute bg-[#00e5ff]/20 rounded-full"
            style={{
              top: `${top}%`,
              right: `${5 + i * 8}%`,
              width: '1.5px',
              height: '1.5px',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left - Title */}
          <div className={`flex-1 ${isVisible ? 'animate-slide-left animate-visible' : 'animate-slide-left'}`}>
            <h2 className="text-3xl font-extrabold leading-tight text-[#00e5ff] lg:text-5xl text-balance">
              Transparencia e Metodo: um processo claro para ir da estrategia a ação.
            </h2>
          </div>

          {/* Right - Description */}
          <div className={`flex-1 ${isVisible ? 'animate-slide-right animate-visible' : 'animate-slide-right'}`}>
            <p className="text-[#8ba3c0] text-lg leading-relaxed">
              Nosso Planejamento Tributario nao e um documento de gaveta. E um plano
              de acao completo e implementado com um processo claro, focado em
              resultado e com metodo validado:S
            </p>
          </div>
        </div>
      </div>

      {/* Painel interativo LaraFy dentro da mesma section */}
      <PainelLarafy />
    </section>
  )
}
