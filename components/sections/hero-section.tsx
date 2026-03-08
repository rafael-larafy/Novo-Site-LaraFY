"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  slideLeftVariants,
  slideRightVariants,
} from "@/lib/scroll-motion"
export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a1628]">
      {/* Background glow effect */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-[200px] h-[200px] bg-[#00e5ff]/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0066ff]/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            className="flex-1 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-balance lg:text-7xl">
              <span className="text-[#00e5ff]">REDUZIMOS</span>
              <br />
              <span className="text-[#00e5ff]">IMPOSTOS</span>
              <br />
              <span className="text-[#00e5ff]">COM PRECISAO</span>
              <br />
              <span className="text-[#00e5ff]">CIRURGICA</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#8ba3c0]">
              A decisao tributaria que seu negocio precisa, com resultados e ZERO riscos.
              Decisoes sustentadas por tecnologia exclusiva e execucao orientada a
              exito financeiro.
            </p>
            <a
              href="#contato"
              className="cta-button inline-block rounded-full bg-[#00e5ff] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0a1628] glow-effect"
            >
              Solicitar Diagnostico Tributario Estrategico
            </a>
          </motion.div>

          {/* Right content - Tablet mockup */}
          <motion.div
            className="flex-1 relative"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Tablet frame */}
              <div className="relative mx-auto w-full max-w-[560px] rounded-2xl border-[6px] border-[#2a3a50] bg-[#0d1d33] p-4 shadow-2xl shadow-[#0066ff]/10 transition-all duration-700 ease-out group-hover:shadow-[#00e5ff]/20 group-hover:shadow-3xl group-hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#1a2a40]">
                  {/* Dashboard content simulation */}
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#8ba3c0] transition-all duration-500 group-hover:text-[#a8c4e0]">
                      <span className="text-[#00e5ff] font-semibold">{'Diagnostico'}</span>
                      <span>{'/'}</span>
                      <span>{'Analises e Cruzamentos'}</span>
                    </div>
                    <div className="bg-[#0d1d33] rounded-lg p-3">
                      <p className="text-xs font-bold text-[#ffffff] mb-2 transition-all duration-500 group-hover:text-[#00e5ff]">ANALISE GERENCIAL</p>
                      <p className="text-[10px] text-[#00e5ff]">INFORMACOES GERENCIAIS</p>
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {[
                          { label: "Resultados", value: "853.064.298,51" },
                          { label: "Oportunidades", value: "39,16 M" },
                          { label: "A Explorar", value: "1,98 M" },
                          { label: "Certificadas", value: "6,01 M" },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="bg-[#1a2a40] rounded p-2 text-center transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:bg-[#1e3350] group-hover:shadow-lg group-hover:shadow-[#00e5ff]/5"
                            style={{ transitionDelay: `${i * 80}ms` }}
                          >
                            <p className="text-[8px] text-[#8ba3c0]">{item.label}</p>
                            <p className="text-[10px] font-bold text-[#ffffff]">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div
                          className="bg-[#1a2a40] rounded p-2 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:bg-[#1e3350] group-hover:shadow-lg group-hover:shadow-[#00e5ff]/5"
                          style={{ transitionDelay: '350ms' }}
                        >
                          <p className="text-[8px] text-[#8ba3c0]">{'ICMS e Restituicao'}</p>
                          <p className="text-xs font-bold text-[#ffffff]">766.281.204,96</p>
                        </div>
                        <div
                          className="bg-[#1a2a40] rounded p-2 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:bg-[#1e3350] group-hover:shadow-lg group-hover:shadow-[#00e5ff]/5"
                          style={{ transitionDelay: '430ms' }}
                        >
                          <p className="text-[8px] text-[#8ba3c0]">{'Total Recuperado'}</p>
                          <p className="text-xs font-bold text-[#ffffff]">12.437.996,76</p>
                        </div>
                      </div>
                      {/* Charts simulation */}
                      <div className="mt-3 flex gap-2">
                        <div className="flex-1 bg-[#1a2a40] rounded p-2 h-16 flex items-end gap-1 transition-all duration-500 ease-out group-hover:bg-[#1e3350]" style={{ transitionDelay: '500ms' }}>
                          {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t transition-all duration-700 ease-out"
                              style={{
                                height: isHovered ? `${h}%` : `${h * 0.3}%`,
                                backgroundColor: isHovered ? 'rgba(0, 229, 255, 0.8)' : 'rgba(0, 229, 255, 0.4)',
                                transitionDelay: `${550 + i * 60}ms`,
                              }}
                            >
                              <span className="sr-only">{`Barra ${i + 1}`}</span>
                            </div>
                          ))}
                        </div>
                        <div
                          className="flex-1 bg-[#1a2a40] rounded p-2 h-16 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-[#1e3350]"
                          style={{ transitionDelay: '500ms' }}
                        >
                          <div className="w-10 h-10 rounded-full border-4 border-[#00e5ff]/40 border-r-transparent transition-all duration-700 group-hover:border-[#00e5ff] group-hover:border-r-transparent group-hover:rotate-180" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow under tablet */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-[#0066ff]/40 blur-xl rounded-full transition-all duration-700 group-hover:bg-[#00e5ff]/50 group-hover:w-[90%] group-hover:h-6" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
