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
import WaldirImg from "@/lib/Waldir.png"
import { Building2, Cpu, Scale, BarChart3, Users, Award, Heart, Target } from "lucide-react"

const empresas = [
  {
    icon: Cpu,
    nome: "LaraFy",
    descricao:
      "Consultoria tributária tecnológica. Combina inteligência artificial e análise humana especializada para otimização fiscal com precisão cirúrgica.",
    destaque: "Tecnologia exclusiva + inteligência humana",
  },
  {
    icon: Scale,
    nome: "Lara Tax",
    descricao:
      "Braço jurídico-tributário do grupo, focado em segurança jurídica, contencioso fiscal e defesa administrativa.",
    destaque: "Segurança jurídica e contencioso fiscal",
  },
  {
    icon: BarChart3,
    nome: "Lara IA",
    descricao:
      "Desenvolvimento de tecnologia proprietária para análise de dados fiscais, automação de processos e inteligência tributária.",
    destaque: "Tecnologia proprietária e automação",
  },
]

const timeline = [
  {
    ano: "2019",
    titulo: "Fundação",
    descricao: "Waldir de Lara funda o grupo com a visão de unir tecnologia e expertise tributária.",
  },
  {
    ano: "2020",
    titulo: "Tecnologia Própria",
    descricao: "Desenvolvimento da plataforma exclusiva de análise fiscal e diagnóstico inteligente.",
  },
  {
    ano: "2022",
    titulo: "Expansão Nacional",
    descricao: "O grupo atinge atuação em todo o território nacional com mais de 50 especialistas.",
  },
  {
    ano: "2023",
    titulo: "Selo GPTW",
    descricao: "Reconhecimento como Great Place to Work, consolidando a cultura de excelência.",
  },
  {
    ano: "2024",
    titulo: "+100 Colaboradores",
    descricao: "O grupo ultrapassa a marca de 100 profissionais altamente especializados.",
  },
  {
    ano: "2025",
    titulo: "Lara IA",
    descricao: "Lançamento da Lara IA, braço de inteligência artificial do grupo focado em automação e análise preditiva tributária.",
  },
  {
    ano: "2026",
    titulo: "Referência Nacional",
    descricao: "Consolidação como uma das maiores referências em inteligência tributária do Brasil, com atuação em todos os estados.",
  },
]

const cultura = [
  {
    icon: Target,
    titulo: "Precisão",
    descricao: "Cada decisão é baseada em dados e análise rigorosa.",
  },
  {
    icon: Award,
    titulo: "Ética",
    descricao: "Transparência e legalidade em todas as operações.",
  },
  {
    icon: Heart,
    titulo: "Pessoas",
    descricao: "Valorizamos cada colaborador — selo GPTW comprova.",
  },
  {
    icon: Cpu,
    titulo: "Inovação",
    descricao: "Tecnologia exclusiva que potencializa resultados.",
  },
]

export default function GrupoPage() {
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
              O Grupo
            </motion.p>
            <motion.h1
              className="mt-4 text-3xl font-black uppercase leading-tight text-white lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Um ecossistema completo de{" "}
              <span className="text-[#00e5ff]">inteligência tributária</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Tecnologia, jurídico e consultoria integrados para entregar
              resultados com precisão, segurança e escala.
            </motion.p>
          </div>
        </section>

        {/* Empresas do Grupo */}
        <section className="relative bg-[#020c18] py-20 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              <h2 className="text-2xl font-black uppercase text-white lg:text-4xl">
                Nossas Empresas
              </h2>
              <p className="mt-4 text-[#8ba3c0]">
                Cada empresa do grupo atua de forma integrada para cobrir toda a cadeia tributária
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3">
              {empresas.map((empresa, index) => (
                <motion.div
                  key={empresa.nome}
                  className="group relative rounded-2xl border border-[#1e3a5f]/40 bg-[#0d1f3c]/60 p-8 transition-all duration-300 hover:border-[#00e5ff]/40 hover:bg-[#0d1f3c]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(index) }}
                >
                  <div className="mb-5 inline-flex rounded-xl bg-[#00e5ff]/10 p-3">
                    <empresa.icon className="h-7 w-7 text-[#00e5ff]" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{empresa.nome}</h3>
                  <p className="text-[#8ba3c0] leading-relaxed mb-4">
                    {empresa.descricao}
                  </p>
                  <div className="flex items-center gap-2 rounded-lg bg-[#00e5ff]/5 border border-[#00e5ff]/20 px-4 py-2">
                    <Building2 className="h-4 w-4 text-[#00e5ff] flex-shrink-0" />
                    <span className="text-xs text-[#c5d9f3] font-medium">
                      {empresa.destaque}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Liderança */}
        <section className="relative overflow-hidden bg-[#0a1628] py-20 lg:py-32">
          <div className="absolute inset-0">
            <Image
              src="/images/AdobeStock_699471030.jpeg"
              alt=""
              fill
              className="object-cover opacity-10"
              sizes="100vw"
              loading="lazy"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <motion.div
                className="flex-1 relative"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideLeftVariants}
                transition={scrollTransition}
              >
                <div className="relative w-full max-w-[420px] mx-auto aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent z-10" />
                  <Image
                    src={WaldirImg}
                    alt="Waldir de Lara - Founder e CEO"
                    width={420}
                    height={420}
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <motion.div
                className="flex-1 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideRightVariants}
                transition={scrollTransition}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-[#00e5ff]">
                  Liderança
                </p>
                <h2 className="text-2xl font-black uppercase leading-tight text-white lg:text-4xl">
                  Waldir de Lara
                </h2>
                <p className="text-sm text-[#00e5ff] font-semibold uppercase tracking-wide">
                  Founder &amp; CEO
                </p>
                <blockquote className="border-l-4 border-[#00e5ff] pl-5">
                  <p className="text-lg font-bold italic text-[#00e5ff] lg:text-xl leading-snug">
                    &ldquo;A linha tênue entre o erro e o acerto está em como foi analisado.&rdquo;
                  </p>
                </blockquote>
                <p className="text-[#8ba3c0] leading-relaxed">
                  Com visão estratégica e compromisso inabalável com resultados,
                  Waldir de Lara construiu um ecossistema tributário que une o melhor
                  da tecnologia com a inteligência humana — provando que é possível
                  reduzir impostos com precisão, ética e segurança jurídica.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative bg-[#020c18] py-20 lg:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              <h2 className="text-2xl font-black uppercase text-white lg:text-4xl">
                Nossa Trajetória
              </h2>
            </motion.div>

            <div className="relative">
              {/* Linha central */}
              <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-[#1e3a5f]/60" />

              <div className="space-y-10">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.ano}
                    className={`relative flex flex-col lg:flex-row items-start gap-6 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollViewport}
                    variants={index % 2 === 0 ? slideLeftVariants : slideRightVariants}
                    transition={{ ...scrollTransition, delay: staggerDelay(index) }}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00e5ff] ring-4 ring-[#020c18] z-10" />

                    {/* Content */}
                    <div className={`flex-1 pl-14 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:text-left"}`}>
                      <span className="text-3xl font-black text-[#00e5ff]/30">{item.ano}</span>
                      <h3 className="text-lg font-bold text-white mt-1">{item.titulo}</h3>
                      <p className="text-[#8ba3c0] text-sm mt-2 leading-relaxed">{item.descricao}</p>
                    </div>

                    {/* Spacer para o lado oposto */}
                    <div className="hidden lg:block flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cultura */}
        <section className="relative bg-[#0a1628] py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-[#00e5ff]">
                Selo Great Place to Work
              </p>
              <h2 className="mt-4 text-2xl font-black uppercase text-white lg:text-4xl">
                Nossa Cultura
              </h2>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {cultura.map((valor, index) => (
                <motion.div
                  key={valor.titulo}
                  className="rounded-2xl border border-[#1e3a5f]/40 bg-[#0d1f3c]/60 p-8 text-center transition-all duration-300 hover:border-[#00e5ff]/40 hover:bg-[#0d1f3c]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(index) }}
                >
                  <div className="mb-5 inline-flex rounded-xl bg-[#00e5ff]/10 p-3">
                    <valor.icon className="h-7 w-7 text-[#00e5ff]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{valor.titulo}</h3>
                  <p className="text-sm text-[#8ba3c0] leading-relaxed">{valor.descricao}</p>
                </motion.div>
              ))}
            </div>
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
              Faça parte desta história
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Conheça o grupo que está transformando a gestão tributária no Brasil.
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
                Entre em Contato
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
