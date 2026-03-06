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
import { ZeroRiscoSection } from "@/components/sections/zero-risco-section"
import { ReformaCardSection } from "@/components/sections/reforma-card-section"

export default function Home() {
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
        <ZeroRiscoSection />
        <ReformaCardSection />
        <ConfiancaSection />  
      </main>
    </>
  )
}
