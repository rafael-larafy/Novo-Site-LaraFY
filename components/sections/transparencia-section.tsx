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
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-8">
          {/* Left - Title */}
          <div className={`flex-1 ${isVisible ? 'animate-slide-left animate-visible' : 'animate-slide-left'}`}>
            <h2 className="mt-1 mb-1 text-2xl font-extrabold leading-tight text-[#00e5ff] lg:text-4xl text-balance max-w-xl">
              Transparência e Método:
              <br />
              um processo claro para ir
              <br />
              da estratégia à ação.
            </h2>
          </div>

          {/* Right - Description */}
          <div className={`flex-1 ${isVisible ? 'animate-slide-right animate-visible' : 'animate-slide-right'}`}>
            <p className="text-white text-base lg:text-lg leading-relaxed max-w-md lg:ml-auto">
              Nosso Planejamento Tributário não é um documento de gaveta. É um plano
              de ação completo e implementado com um processo claro, focado em
              resultado e com método validado:
            </p>
          </div>
        </div>
      </div>

      {/* Painel interativo LaraFy dentro da mesma section */}
      <PainelLarafy />
    </section>
  )
}
