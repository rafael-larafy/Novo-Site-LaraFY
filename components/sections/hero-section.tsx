"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
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
  const [isMobile, setIsMobile] = useState(false)
  const [mobileVideoEnded, setMobileVideoEnded] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)")
    setIsMobile(mq.matches)
    const handler = () => setIsMobile(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const isApple =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent))
    setIsIOS(isApple)
    const safari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    setIsSafari(safari)
  }, [])

  const noWebM = isIOS || isSafari

  useEffect(() => {
    if (isMobile && !mobileVideoEnded && animationVideoRef.current && !noWebM) {
      animationVideoRef.current.currentTime = 0
      animationVideoRef.current.play()
    }
  }, [isMobile, mobileVideoEnded, noWebM])

  const handleVideoMouseEnter = () => {
    if (noWebM) return
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

  const handleVideoEnded = () => {
    if (isMobile) setMobileVideoEnded(true)
  }

  const handleMobileClick = () => {
    if (!isMobile || noWebM) return
    setMobileVideoEnded(false)
    const video = animationVideoRef.current
    if (video) {
      video.currentTime = 0
      video.play()
    }
  }

  const showVideo = noWebM ? false : (isMobile ? !mobileVideoEnded : isVideoHovered)
  const showImage = noWebM ? true : (isMobile ? mobileVideoEnded : !isVideoHovered)

  const youtubeEmbedUrl = "https://www.youtube.com/embed/s9xk77X4m5c?autoplay=1&mute=1&loop=1&playlist=s9xk77X4m5c&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"

  const videoOpacity = 1
  const overlayOpacity = 0.90

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#012e43]">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
        style={{ opacity: videoOpacity }}
      >
        <iframe
          src={youtubeEmbedUrl}
          title="Background video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "100vw",
            height: "56.25vw",
            minWidth: "177.78vh",
            minHeight: "100vh",
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden
        style={{ backgroundColor: `rgba(1, 46, 67, ${overlayOpacity})` }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-42 pb-8 lg:px-2">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            className="flex-1 space-y-4 order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideLeftVariants}
            transition={scrollTransition}
          >
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl lg:text-7xl">
              <span className="text-[#00e5ff]">REDUZA </span>
              <span className="text-[#00e5ff]">IMPOSTOS </span>
              <span className="text-[#00e5ff]">COM PRECISÃO</span>
              <br />
            </h1>
            <p className="max-w-lg text-lg leading-justify text-[#ffffff]">
            Zero riscos e milhões em lucro. Tecnologia exclusiva orientada para decisão tributária estratégica.
            </p>
            <a
              href="#contato"
              className="cta-button inline-block rounded-full bg-[#00e5ff] px-8 py-4 text-base sm:text-sm font-bold uppercase tracking-wider text-[#0a1628] glow-effect text-center lg:text-left"
            >
              Quero receber um diagnóstico
            </a>
          </motion.div>

          <motion.div
            className="flex-1 relative order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideRightVariants}
            transition={scrollTransition}
          >
            <div
              className="relative w-full cursor-pointer overflow-visible"
              style={{ isolation: "isolate" }}
              onMouseEnter={handleVideoMouseEnter}
              onMouseLeave={handleVideoMouseLeave}
              onClick={handleMobileClick}
            >
              <Image
                src="/Tablet-mockup.png"
                alt="LaraTAX Dashboard"
                width={1920}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 1020px"
                className="w-full h-auto scale-[1.50] lg:scale-[1.7] origin-center transition-opacity duration-300"
                style={{ opacity: showImage ? 1 : 0 }}
              />
              {!noWebM && (
                <div
                  className="absolute inset-0 overflow-visible"
                  style={{
                    mixBlendMode: "lighten",
                    opacity: showVideo ? 1 : 0,
                  }}
                >
                  <video
                    ref={animationVideoRef}
                    className="absolute inset-0 w-full h-auto scale-[1.50] lg:scale-[1.7] origin-center transition-opacity duration-300"
                    style={{ background: "transparent" }}
                    autoPlay={isMobile}
                    loop={!isMobile}
                    muted
                    playsInline
                    onEnded={handleVideoEnded}
                  >
                    <source src="/Site Larafy animations.webm" type="video/webm" />
                  </video>
                </div>
              )}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-[#0066ff]/40 blur-xl rounded-full" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-4 pt-30 pb-12 lg:px-6 lg:pt-30 lg:pb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollTransition}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-10">
            <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 text-center px-3 md:px-6 border-b md:border-b-0 md:border-r border-[#ffffff]/20 w-full pb-6 md:pb-0 min-w-0">
              <span className="text-5xl font-extrabold text-[#ffffff] md:text-4xl lg:text-5xl">
                +<AnimatedCounter target={20} />
              </span>
              <span className="text-3x1 font-medium text-[#ffffff]/80 text-left leading-tight">
                Anos de<br />Experiência
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 text-center px-3 md:px-6 border-b md:border-b-0 md:border-r border-[#ffffff]/20 w-full pb-6 md:pb-0 min-w-0">
              <span className="text-5xl font-extrabold text-[#ffffff] md:text-4xl lg:text-5xl">
                +<AnimatedCounter target={100} />
              </span>
              <span className="text-3x1 font-medium text-[#ffffff]/80 text-left leading-tight">
                Especialistas
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 text-center px-3 md:px-6 pb-0 min-w-0 w-full">
              <Image src={BrasilImg} alt="Mapa do Brasil" width={144} height={144} sizes="100px" className="w-25 h-auto md:w-20 lg:w-20" loading="lazy" />
              <span className="text-3x1 font-medium text-[#ffffff]/80 text-left leading-tight">
                Atuação<br />Nacional
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
