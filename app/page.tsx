"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { HomeAnimations } from "@/components/sections/home-animations"
import { Footer } from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"

const SectionPlaceholder = () => <div className="min-h-[300px] bg-[#0a1628]" />

const ReformaTributariaSection = dynamic(
  () => import("@/components/sections/reforma-tributaria-section").then((mod) => ({ default: mod.ReformaTributariaSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const CeoSection = dynamic(
  () => import("@/components/sections/ceo-section").then((mod) => ({ default: mod.CeoSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const BlindagemSection = dynamic(
  () => import("@/components/sections/blindagem-section").then((mod) => ({ default: mod.BlindagemSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const TransparenciaSection = dynamic(
  () => import("@/components/sections/transparencia-section").then((mod) => ({ default: mod.TransparenciaSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const ZeroRiscoSection = dynamic(
  () => import("@/components/sections/zero-risco-section").then((mod) => ({ default: mod.ZeroRiscoSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const ReformaCardSection = dynamic(
  () => import("@/components/sections/reforma-card-section").then((mod) => ({ default: mod.ReformaCardSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const ConfiancaSection = dynamic(
  () => import("@/components/sections/confianca-section").then((mod) => ({ default: mod.ConfiancaSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const LogosCarouselSection = dynamic(
  () => import("@/components/sections/logos-carousel-section").then((mod) => ({ default: mod.LogosCarouselSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const DiagnosticoSection = dynamic(
  () => import("@/components/sections/diagnostico-section").then((mod) => ({ default: mod.DiagnosticoSection })),
  { ssr: true, loading: SectionPlaceholder }
)

const ContatoSection = dynamic(
  () => import("@/components/sections/contato-section").then((mod) => ({ default: mod.ContatoSection })),
  { ssr: true, loading: SectionPlaceholder }
)

export default function Home() {
  return (
    <>
      <Header />
      <HomeAnimations />
      <main className="overflow-x-hidden">
        <HeroSection />
        <ReformaTributariaSection />
        <CeoSection />
        <BlindagemSection />
        <TransparenciaSection />
        <ZeroRiscoSection />
        <ReformaCardSection />
        <ConfiancaSection />
        <LogosCarouselSection />
        <DiagnosticoSection />
        <ContatoSection />
      </main>
      <Analytics/>
      <Footer />
    </>
  )
}
