"use client"

import { useEffect, useRef, useState } from "react"
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
  const animationVideoRef = useRef<HTMLVideoElement>(null)
  const [isVideoHovered, setIsVideoHovered] = useState(false)

  const handleVideoMouseEnter = () => {
    setIsVideoHovered(true)
    const video = animationVideoRef.current
    if (!video) return
    video.currentTime = 0
    video.play()
  }

  const handleVideoMouseLeave = () => {
    setIsVideoHovered(false)
    const video = animationVideoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

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

          {/* Right content - Video */}
          <motion.div
            className="flex-1 relative"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <div
              className="relative w-full cursor-pointer"
              style={{ isolation: "isolate" }}
              onMouseEnter={handleVideoMouseEnter}
              onMouseLeave={handleVideoMouseLeave}
            >
              {/* Imagem estática - visível sem hover */}
              <img
                src="/Tablet-mockup.png"
                alt="LaraTAX Dashboard"
                className="w-full h-auto scale-[1.7] origin-center transition-opacity duration-300"
                style={{ opacity: isVideoHovered ? 0 : 1 }}
              />
              {/* Vídeo - visível no hover */}
              <video
                ref={animationVideoRef}
                className="absolute inset-0 w-full h-auto scale-[1.7] origin-center transition-opacity duration-300"
                style={{
                  mixBlendMode: "lighten",
                  background: "transparent",
                  opacity: isVideoHovered ? 1 : 0,
                }}
                loop
                muted
                playsInline
                src="/Site Larafy animations.webm"
              />
              {/* Glow under */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-[#0066ff]/40 blur-xl rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Stats - conectado ao hero */}
        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-6 pt-30 pb-12 lg:px-8 lg:pt-16 lg:pb-16 border-t border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollTransition}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
            <div className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20">
              <span className="text-4xl font-extrabold text-[#ffffff] lg:text-5xl">
                +<AnimatedCounter target={5} />
              </span>
              <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
                Anos de<br />Mercado
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20">
              <span className="text-4xl font-extrabold text-[#ffffff] lg:text-5xl">
                +<AnimatedCounter target={100} />
              </span>
              <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
                Especialistas
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-3 text-center">
              <img src={typeof BrasilImg === "string" ? BrasilImg : (BrasilImg as { src?: string }).src ?? ""} alt="Mapa do Brasil" className="w-30 h-auto lg:w-20" />
              <span className="text-sm font-medium text-[#ffffff]/80 text-left leading-tight">
                Atuacao<br />Nacional
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
