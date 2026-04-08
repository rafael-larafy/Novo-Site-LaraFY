"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  scrollViewport,
  scrollTransition,
  fadeUpVariants,
  slideLeftVariants,
  slideRightVariants,
  staggerDelay,
} from "@/lib/scroll-motion"
import { TrendingUp, ShieldCheck, Clock, Building2 } from "lucide-react"

const cases = [
  {
    setor: "Indústria",
    titulo: "Recuperação tributária em indústria de grande porte",
    descricao:
      "Identificamos créditos fiscais acumulados e oportunidades de recuperação administrativa que o ERP da empresa não detectava.",
    resultados: [
      { label: "Créditos recuperados", valor: "R$ 4,2M" },
      { label: "Tempo de execução", valor: "90 dias" },
      { label: "ROI do projeto", valor: "12x" },
    ],
    destaque: "Economia recorrente de R$ 180 mil/mês após adequação.",
  },
  {
    setor: "Varejo",
    titulo: "Blindagem fiscal para rede varejista",
    descricao:
      "Realizamos uma varredura completa das operações fiscais, corrigindo inconsistências e criando uma blindagem tributária robusta.",
    resultados: [
      { label: "Riscos eliminados", valor: "R$ 8,5M" },
      { label: "Operações analisadas", valor: "+50 mil" },
      { label: "Conformidade", valor: "100%" },
    ],
    destaque: "Zero autuações fiscais desde a implementação do projeto.",
  },
  {
    setor: "Serviços",
    titulo: "Planejamento tributário estratégico",
    descricao:
      "Reestruturamos o modelo tributário de uma empresa de serviços, otimizando a carga fiscal de forma legal e sustentável.",
    resultados: [
      { label: "Redução de carga", valor: "32%" },
      { label: "Economia anual", valor: "R$ 2,1M" },
      { label: "Segurança jurídica", valor: "Total" },
    ],
    destaque: "Modelo sustentável aprovado em auditoria externa.",
  },
  {
    setor: "Agronegócio",
    titulo: "Diagnóstico fiscal em operação agroindustrial",
    descricao:
      "Mapeamos toda a cadeia tributária de uma agroindústria, identificando benefícios fiscais não aproveitados e créditos presumidos.",
    resultados: [
      { label: "Benefícios identificados", valor: "R$ 6,3M" },
      { label: "Créditos presumidos", valor: "R$ 1,8M" },
      { label: "Prazo de retorno", valor: "45 dias" },
    ],
    destaque: "Recuperação de créditos dos últimos 5 anos com total respaldo jurídico.",
  },
]

const parceiros = [
  { src: "/1bhH4F5IOXDtWdgplmK3aYv7A.png", alt: "Hedge Tax Consultoria Tributária" },
  { src: "/iju07z4UblNiFlAMY6nLEMkJTY.png", alt: "Planning" },
  { src: "/V9JhK28b3pDvQ0CCGD6CORGho.png", alt: "evox FISCAL" },
  { src: "/YCJlx2HqsRXmH9zcqvaanj9gU.png", alt: "IBPTOLA Business, Tax & Education" },
  { src: "/22pK2BzqFG2aQ72TkcJr2gZl6OM.webp", alt: "Marins Bertoldi" },
  { src: "/cShhepLkLpC5xavHlRoAeffEpDI.webp", alt: "AG tax" },
]

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative bg-[#0a1628] pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
            <motion.p
              className="text-sm font-semibold uppercase tracking-widest text-[#00e5ff]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              Cases de Sucesso
            </motion.p>
            <motion.h1
              className="mt-4 text-3xl font-black uppercase leading-tight text-white lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Resultados que{" "}
              <span className="text-[#00e5ff]">falam por si</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Conheça histórias reais de empresas que transformaram sua gestão
              tributária com o método LaraFy.
            </motion.p>
          </div>
        </section>

        {/* Cases */}
        <section className="relative bg-[#020c18] py-20 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 space-y-12">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.titulo}
                className="rounded-2xl border border-[#1e3a5f]/40 bg-[#0d1f3c]/60 overflow-hidden transition-all duration-300 hover:border-[#00e5ff]/30"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={index % 2 === 0 ? slideLeftVariants : slideRightVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              >
                <div className="p-8 lg:p-10">
                  {/* Setor tag */}
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-4 w-4 text-[#00e5ff]" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#00e5ff]">
                      {caseItem.setor}
                    </span>
                  </div>

                  {/* Título e descrição */}
                  <h3 className="text-xl font-bold text-white mb-3 lg:text-2xl">
                    {caseItem.titulo}
                  </h3>
                  <p className="text-[#8ba3c0] leading-relaxed mb-8 max-w-3xl">
                    {caseItem.descricao}
                  </p>

                  {/* Resultados */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {caseItem.resultados.map((resultado) => (
                      <div
                        key={resultado.label}
                        className="rounded-xl bg-[#0a1628]/80 p-5 text-center"
                      >
                        <p className="text-2xl font-extrabold text-[#00e5ff] lg:text-3xl">
                          {resultado.valor}
                        </p>
                        <p className="mt-1 text-xs text-[#8ba3c0] uppercase tracking-wide">
                          {resultado.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Destaque */}
                  <div className="flex items-start gap-3 rounded-xl bg-[#00e5ff]/5 border border-[#00e5ff]/20 p-4">
                    <ShieldCheck className="h-5 w-5 text-[#00e5ff] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#c5d9f3] font-medium">
                      {caseItem.destaque}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Parceiros */}
        <section className="relative bg-[#0a1628] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.h2
              className="text-center text-lg font-semibold text-[#c5d9f3] uppercase tracking-wider mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              Parceiros e clientes que confiam na LaraFy
            </motion.h2>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-8 lg:gap-14"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              {parceiros.map((logo) => (
                <div
                  key={logo.alt}
                  className="grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={64}
                    sizes="(max-width: 1024px) 80px, 160px"
                    className="h-10 w-auto object-contain lg:h-14"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-[#020c18] py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.h2
              className="text-2xl font-black uppercase text-[#00e5ff] lg:text-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              Sua empresa pode ser o próximo case
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Solicite um diagnóstico tributário estratégico e descubra quanto
              sua empresa pode economizar — com zero risco.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              <a
                href="/#contato"
                className="cta-button mt-8 inline-block rounded-full bg-[#00e5ff] px-10 py-4 text-base font-bold uppercase tracking-wider text-[#0a1628] glow-effect"
              >
                Solicitar Diagnóstico Gratuito
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
