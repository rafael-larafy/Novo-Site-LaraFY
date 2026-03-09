"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  scrollViewport,
  scrollTransition,
  slideLeftVariants,
  slideRightVariants,
  fadeUpVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import BrasilImg from "../../lib/Brasil.png"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      setCount(current >= target ? target : Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [hasStarted, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a1628]">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="/Video LP (V2).mp4"
      />
      <div className="absolute inset-0 bg-[#0a1628]/80 z-[1]" aria-hidden />

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

        {/* Stats - conectado ao hero */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-8 pb-12 lg:px-8 lg:pt-12 lg:pb-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
            <motion.div
              className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              <span className="text-4xl font-extrabold text-[#ffffff] lg:text-5xl">
                +<AnimatedCounter target={5} />
              </span>
              <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
                Anos de<br />Mercado
              </span>
            </motion.div>
            <motion.div
              className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              <span className="text-4xl font-extrabold text-[#ffffff] lg:text-5xl">
                +<AnimatedCounter target={100} />
              </span>
              <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
                Especialistas
              </span>
            </motion.div>
            <motion.div
              className="flex-1 flex items-center justify-center gap-3 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(3) }}
            >
              <img src={typeof BrasilImg === "string" ? BrasilImg : (BrasilImg as { src?: string }).src ?? ""} alt="Mapa do Brasil" className="w-30 h-auto lg:w-20" />
              <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
                Atuacao<br />Nacional
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
