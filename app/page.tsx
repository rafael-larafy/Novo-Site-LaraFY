"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { HomeAnimations } from "@/components/sections/home-animations"
import { Footer } from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"

const SectionPlaceholder = () => <div className="min-h-[300px] bg-[#04101f]" />

const FunnelForm = dynamic(
  () => import("@/components/sections/funnel/funnel-form").then((mod) => ({ default: mod.FunnelForm })),
  { ssr: true, loading: SectionPlaceholder }
)

const FunnelSolucoes = dynamic(
  () => import("@/components/sections/funnel/funnel-solucoes").then((mod) => ({ default: mod.FunnelSolucoes })),
  { ssr: true, loading: SectionPlaceholder }
)

const FunnelTecnologia = dynamic(
  () => import("@/components/sections/funnel/funnel-tecnologia").then((mod) => ({ default: mod.FunnelTecnologia })),
  { ssr: true, loading: SectionPlaceholder }
)

const FunnelDiferenciais = dynamic(
  () => import("@/components/sections/funnel/funnel-diferenciais").then((mod) => ({ default: mod.FunnelDiferenciais })),
  { ssr: true, loading: SectionPlaceholder }
)

const FunnelClientes = dynamic(
  () => import("@/components/sections/funnel/funnel-clientes").then((mod) => ({ default: mod.FunnelClientes })),
  { ssr: true, loading: SectionPlaceholder }
)

const FunnelCta = dynamic(
  () => import("@/components/sections/funnel/funnel-cta").then((mod) => ({ default: mod.FunnelCta })),
  { ssr: true, loading: SectionPlaceholder }
)

export default function Home() {
  return (
    <>
      <Header />
      <HomeAnimations />
      <main className="overflow-x-hidden bg-[#04101f] text-white">
        <HeroSection />
        <FunnelForm />
        <FunnelSolucoes />
        <FunnelTecnologia />
        <FunnelDiferenciais />
        <FunnelClientes />
        <FunnelCta />
      </main>
      <Analytics />
      <Footer />
    </>
  )
}
