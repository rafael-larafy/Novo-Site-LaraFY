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
import { SplitReveal } from "@/components/split-reveal"
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
    <section className="relative min-h-screen overflow-hidden bg-[#0a1628] pt-32 pb-20 lg:pt-40">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]"/>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden style={{opacity: videoOpacity}}>
        <iframe src={youtubeEmbedUrl} title="Background Video" className=" absolute top1/2 left 1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" style={{width:"100vw", height:"56.25vw", minHeight:"177.78vh", minWidth:"100vh"}}
        allow="autoplay; encrypted-media" allowFullScreen />
      </div>
      <div className="absolute inset-0 z-[1]" aria-hidden style={{backgroundColor: `rgba(10, 22, 40, ${overlayOpacity})`}} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex  flex-col lg:flex-row items-center lg:gap-16">
          <motion.div className="flex-1 space-y-6 order-2 lg:order-1 text-center lg:text-left" 
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={slideLeftVariants}
          transition={scrollTransition}>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#00e5ff]"> LaraFy — Inteligência Tributária </p>
            <SplitReveal as="h1" type="words" className="text-3xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-7xl text-balance">Reduza impostos com</SplitReveal>
            <p className="">Zero riscos e milhões em lucro. Tecnologia exclusiva orientada para decisão tributária estratégica.</p>
            <a href=""> Quero receber um diagnóstico</a>
          </motion.div>
        </div>
      </div>
      

    </section>)}