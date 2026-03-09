"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { ConfiancaSection } from "@/components/sections/confianca-section"
import { ReformaTributariaSection } from "@/components/sections/reforma-tributaria-section"
import { CeoSection } from "@/components/sections/ceo-section"
import { BlindagemSection } from "@/components/sections/blindagem-section"
import { DiferencialSection } from "@/components/sections/diferencial-section"
import { TransparenciaSection } from "@/components/sections/transparencia-section"
import { ZeroRiscoSection } from "@/components/sections/zero-risco-section"
import { ReformaCardSection } from "@/components/sections/reforma-card-section"
import { LogosCarouselSection } from "@/components/sections/logos-carousel-section"
import { DiagnosticoSection } from "@/components/sections/diagnostico-section"
import { ContatoSection } from "@/components/sections/contato-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ReformaTributariaSection />
        <CeoSection />
        <BlindagemSection />
        <DiferencialSection />
        <TransparenciaSection />
        <ZeroRiscoSection />
        <ReformaCardSection />
        <ConfiancaSection />
        <LogosCarouselSection />
        <DiagnosticoSection />
        <ContatoSection />
      </main>
      <Footer />
    </>
  )
}
