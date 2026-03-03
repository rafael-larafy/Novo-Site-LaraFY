"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ConfiancaSection } from "@/components/sections/confianca-section"
import { ReformaTributariaSection } from "@/components/sections/reforma-tributaria-section"
import { CeoSection } from "@/components/sections/ceo-section"
import { BlindagemSection } from "@/components/sections/blindagem-section"
import { DiferencialSection } from "@/components/sections/diferencial-section"
import { TransparenciaSection } from "@/components/sections/transparencia-section"
import { PainelLarafy } from "@/components/sections/painel-larafy"
import { ZeroRiscoSection } from "@/components/sections/zero-risco-section"
import { ReformaCardSection } from "@/components/sections/reforma-card-section"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    // Initialize scroll animations with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    // Observe all animated elements
    document.querySelectorAll(
      ".animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale"
    ).forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />  
        <ReformaTributariaSection />
        <CeoSection />
        <BlindagemSection />
        <DiferencialSection />
        <TransparenciaSection />
        <PainelLarafy />
        <ZeroRiscoSection />
        <ReformaCardSection />
        <ConfiancaSection />  
      </main>
    </>
  )
}
