"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/header"
import { SplitReveal } from "@/components/split-reveal"
import { Magnetic } from "@/components/magnetic"
import { Footer } from "@/components/footer"
import {scrollViewport,scrollTransition,fadeUpVariants,slideLeftVariants,slideRightVariants,staggerDelay,} from "@/lib/scroll-motion"
import { Search, FileText, Scale, Users, ShieldCheck, BarChart3, ArrowRight } from "lucide-react"
import { Analytics } from "@vercel/analytics/next"

const etapas = [
  {
    numero: "01",
    icon: Search,
    titulo: "Varredura Total",
    descricao:
      "Análise estratégica do seu histórico tributário. Transformamos dados em oportunidades e orientamos decisões com confiança.",
  },
  {
    numero: "02",
    icon: BarChart3,
    titulo: "Diagnóstico Inteligente",
    descricao:
      "Nossa tecnologia exclusiva cruza milhares de variáveis fiscais para identificar oportunidades que o seu ERP ignora.",
  },
  {
    numero: "03",
    icon: FileText,
    titulo: "Fundamentação Técnica",
    descricao:
      "Cada centavo recuperado possui lastro legal e documental. Nada é feito sem embasamento sólido.",
  },
  {
    numero: "04",
    icon: Scale,
    titulo: "Segurança Jurídica",
    descricao:
      "Validação jurídica completa de cada oportunidade, garantindo proteção total contra riscos fiscais.",
  },
  {
    numero: "05",
    icon: Users,
    titulo: "Execução Especializada",
    descricao:
      "Equipe altamente especializada implementa as ações — 100% baseados em inteligência e dados.",
  },
  {
    numero: "06",
    icon: ShieldCheck,
    titulo: "Blindagem Contínua",
    descricao:
      "Monitoramento permanente da sua operação para garantir que cada decisão tributária permaneça segura e atualizada.",
  },
]

const diferenciais = [
  {
    titulo: "Tecnologia Exclusiva",
    descricao: "Plataforma proprietária que analisa dados fiscais com precisão que nenhum software genérico consegue.",
  },
  {
    titulo: "Zero Risco",
    descricao: "Não encontramos oportunidades reais e seguras para o seu negócio? Você não paga nada por isso.",
  },
  {
    titulo: "Transparência Total",
    descricao: "Painel em tempo real para acompanhar cada etapa do processo, do diagnóstico à implementação.",
  },
]

export default function MetodoPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative bg-[#04101f] pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#04101f] via-[#061425] to-[#04101f]" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
            <motion.p
              className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#00e5ff]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              O Método LaraFy
            </motion.p>
            <SplitReveal as="h1" className="mt-4 text-3xl font-display font-bold uppercase leading-tight text-white lg:text-6xl">
              Precisão cirúrgica em{" "}
              <span className="text-[#00e5ff]">cada etapa</span>
            </SplitReveal>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Um processo estruturado que combina tecnologia exclusiva com
              inteligência humana para entregar resultados reais — com segurança
              jurídica e zero risco.
            </motion.p>
          </div>
        </section>

        {/* Etapas */}
        <section className="relative bg-[#020a14] py-20 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              <h2 className="text-2xl font-display font-bold uppercase text-white lg:text-4xl">
                Como funciona
              </h2>
              <p className="mt-4 text-[#8ba3c0]">
                6 etapas para transformar impostos em estratégia
              </p>
            </motion.div>

            <div className="space-y-6">
              {etapas.map((etapa, index) => (
                <motion.div
                  key={etapa.numero}
                  className="group relative flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-[#00e5ff]/15 bg-[#061425]/60 p-6 sm:p-8 transition-all duration-300 hover:border-[#00e5ff]/40 hover:bg-[#061425]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={index % 2 === 0 ? slideLeftVariants : slideRightVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(index) }}
                >
                  <div className="flex items-center gap-4 sm:min-w-[140px]">
                    <span className="text-4xl font-display font-bold text-[#00e5ff]/20 lg:text-5xl">
                      {etapa.numero}
                    </span>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#00e5ff]/10">
                      <etapa.icon className="h-6 w-6 text-[#00e5ff]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {etapa.titulo}
                    </h3>
                    <p className="text-[#8ba3c0] leading-relaxed">
                      {etapa.descricao}
                    </p>
                  </div>
                  {index < etapas.length - 1 && (
                    <div className="hidden lg:flex items-center">
                      <ArrowRight className="h-5 w-5 text-[#00e5ff]/30" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais do Método */}
        <section className="relative bg-[#04101f] py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
              <motion.div
                className="flex-1"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideLeftVariants}
                transition={scrollTransition}
              >
                <p className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-[#00e5ff]">
                  Por que funciona
                </p>
                <h2 className="mt-4 text-2xl font-display font-bold uppercase text-white lg:text-4xl">
                  O diferencial está nos detalhes
                </h2>
                <p className="mt-6 text-[#8ba3c0] leading-relaxed">
                  Entregamos as oportunidades de recuperação e de segurança jurídica
                  a longo prazo, mas, principalmente, entregamos a paz de espírito de
                  que a operação está 100% adequada.
                </p>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                >
                  <Magnetic><a
                    href="/#contato"
                    className="cta-button mt-8 inline-block rounded-full bg-[#00e5ff] px-10 py-4 text-base font-bold uppercase tracking-wider text-[#04101f] glow-effect"
                  >
                    Solicitar Diagnóstico Gratuito
                  </a></Magnetic>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex-1 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideRightVariants}
                transition={scrollTransition}
              >
                {diferenciais.map((item, index) => (
                  <motion.div
                    key={item.titulo}
                    className="rounded-2xl border border-[#00e5ff]/15 bg-[#061425]/60 p-6 transition-all duration-300 hover:border-[#00e5ff]/40"
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollViewport}
                    variants={fadeUpVariants}
                    transition={{ ...scrollTransition, delay: staggerDelay(index + 1) }}
                  >
                    <h3 className="text-lg font-bold text-[#00e5ff] mb-2">
                      {item.titulo}
                    </h3>
                    <p className="text-[#8ba3c0] leading-relaxed">
                      {item.descricao}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Zero Risco */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#020a14]">
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <motion.h2
              className="text-5xl font-display font-bold uppercase text-white lg:text-8xl tracking-tight"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              ZERO
            </motion.h2>
            <motion.p
              className="mt-4 text-xl font-bold text-white lg:text-3xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              risco de investir sem retorno
            </motion.p>
            <motion.p
              className="mx-auto mt-6 max-w-xl text-[#8ba3c0] text-lg"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Recuperar o passado é obrigação. Planejar o futuro é vantagem competitiva.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(3) }}
            >
              <Magnetic><a
                href="/#contato"
                className="cta-button mt-8 inline-block rounded-full bg-[#00e5ff] px-10 py-4 text-base font-bold uppercase tracking-wider text-[#04101f] glow-effect"
              >
                Simule os impactos da Reforma Tributária
              </a></Magnetic>
            </motion.div>
          </div>
        </section>
        <Analytics/>
      </main>
      <Footer />
    </>
  )
}
