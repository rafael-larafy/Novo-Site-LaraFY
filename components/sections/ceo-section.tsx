"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import WaldirImg from "../../lib/Waldir.png"

export function CeoSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1)

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0a1628] pt-10 pb-16 lg:pt-16 lg:pb-32">
      {/* Background tech pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0066ff]/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className={`flex-1 space-y-8 ${isVisible ? 'animate-slide-left animate-visible' : 'animate-slide-left'}`}>
            <h2 className="text-3xl font-black uppercase leading-tight text-[#00e5ff] lg:text-5xl text-balance">
              A linha tenue entre o erro e o acerto esta em como foi analisado.
            </h2>
            <div className="space-y-4">
              <p className="text-[#8ba3c0] leading-relaxed">
                <span className="text-[#ffffff] font-semibold">
                  Na LaraFy, a tecnologia proprietaria e o sistema nervoso
                  invisivel que processa bilhoes de dados.
                </span>{" "}
                Mas quem toma a decisao, desenha a estrategia e assina a responsabilidade
                e o nosso time de especialistas.
              </p>
            </div>
            <a
              href="#contato"
              className="cta-button inline-block rounded-full bg-[#00e5ff] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0a1628]"
            >
              Solicitar Diagnostico Tributario Estrategico
            </a>
          </div>

          {/* Right - CEO */}
          <div className={`flex-1 relative ${isVisible ? 'animate-slide-right animate-visible' : 'animate-slide-right'}`}>
            <div className="relative flex items-end justify-center">
              <div className="relative w-72 h-96 lg:w-[520px] lg:h-[620px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent z-10" />
                <img
                  src={WaldirImg.src || WaldirImg}
                  alt="Waldir de Lara - Founder e CEO da LaraFy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
