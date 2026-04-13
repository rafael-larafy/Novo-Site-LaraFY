"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {scrollViewport,scrollTransition,fadeUpVariants,slideLeftVariants,slideRightVariants,staggerDelay,} from "@/lib/scroll-motion"
import {Award,Heart,TrendingUp,Users,Cpu,MapPin,Briefcase,Clock,ChevronRight,} from "lucide-react"
import { Analytics } from "@vercel/analytics/next"

const beneficios = [
  {
    icon: Award,
    titulo: "Selo GPTW",
    descricao: "Reconhecidos como Great Place to Work — aqui as pessoas realmente importam.",
  },
  {
    icon: TrendingUp,
    titulo: "Crescimento Acelerado",
    descricao: "Plano de carreira estruturado com oportunidades reais de evolução.",
  },
  {
    icon: Cpu,
    titulo: "Tecnologia de Ponta",
    descricao: "Trabalhe com ferramentas exclusivas e inovação constante.",
  },
  {
    icon: Heart,
    titulo: "Bem-estar",
    descricao: "Benefícios completos, flexibilidade e equilíbrio entre vida pessoal e profissional.",
  },
  {
    icon: Users,
    titulo: "Time de Elite",
    descricao: "Colabore com mais de 100 especialistas altamente qualificados.",
  },
  {
    icon: MapPin,
    titulo: "Atuação Nacional",
    descricao: "Oportunidades presenciais, híbridas e remotas em todo o Brasil.",
  },
]

const vagas = [
  {
    titulo: "Lorem Ipsum Dolor Sit",
    area: "Lorem Ipsum",
    local: "Lorem Ipsum, SP",
    tipo: "Presencial",
  },
  {
    titulo: "Lorem Ipsum Amet Consectetur",
    area: "Lorem Ipsum",
    local: "Remoto",
    tipo: "Remoto",
  },
  {
    titulo: "Lorem Ipsum Adipiscing Elit",
    area: "Lorem Ipsum",
    local: "Lorem Ipsum, SP",
    tipo: "Híbrido",
  },
  {
    titulo: "Lorem Ipsum Sed Do",
    area: "Lorem Ipsum",
    local: "Lorem Ipsum, SP",
    tipo: "Presencial",
  },
  {
    titulo: "Lorem Ipsum Eiusmod Tempor",
    area: "Lorem Ipsum",
    local: "Remoto",
    tipo: "Remoto",
  },
]

const pilares = [
  "Precisão em tudo que fazemos",
  "Ética como princípio inegociável",
  "Resultado sustentável para todos",
  "Inovação como motor de crescimento",
]

export default function CarreirasPage() {
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
              Carreiras
            </motion.p>
            <motion.h1
              className="mt-4 text-3xl font-black uppercase leading-tight text-white lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Construa o futuro da{" "}
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
              Faça parte de um time certificado GPTW que une tecnologia,
              expertise e cultura de excelência.
            </motion.p>
          </div>
        </section>

        {/* Cultura */}
        <section className="relative bg-[#020c18] py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div
                className="flex-1 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideLeftVariants}
                transition={scrollTransition}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-[#00e5ff]">
                  Nossa Cultura
                </p>
                <h2 className="text-2xl font-black uppercase text-white lg:text-4xl">
                  Mais do que um lugar para trabalhar
                </h2>
                <p className="text-[#8ba3c0] leading-relaxed">
                  Na LaraFy acreditamos que resultados extraordinários nascem de pessoas
                  que se sentem valorizadas. Por isso construímos um ambiente onde
                  tecnologia, colaboração e propósito caminham juntos.
                </p>
                <ul className="space-y-3">
                  {pilares.map((pilar, index) => (
                    <motion.li
                      key={pilar}
                      className="flex items-center gap-3 text-[#c5d9f3]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={scrollViewport}
                      variants={fadeUpVariants}
                      transition={{ ...scrollTransition, delay: staggerDelay(index + 2) }}
                    >
                      <ChevronRight className="h-4 w-4 text-[#00e5ff] flex-shrink-0" />
                      <span>{pilar}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="flex-1"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideRightVariants}
                transition={scrollTransition}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/images/AdobeStock_699471030.jpeg"
                    alt="Equipe LaraFy"
                    width={640}
                    height={420}
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="w-full h-auto object-cover rounded-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020c18]/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="rounded-lg bg-[#00e5ff]/20 backdrop-blur-sm border border-[#00e5ff]/30 px-4 py-2">
                      <span className="text-sm font-bold text-[#00e5ff]">
                        Certificada GPTW
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
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
              <h2 className="text-2xl font-black uppercase text-white lg:text-4xl">
                Por que trabalhar na LaraFy
              </h2>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {beneficios.map((item, index) => (
                <motion.div
                  key={item.titulo}
                  className="rounded-2xl border border-[#1e3a5f]/40 bg-[#0d1f3c]/60 p-8 transition-all duration-300 hover:border-[#00e5ff]/40 hover:bg-[#0d1f3c]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(index) }}
                >
                  <div className="mb-5 inline-flex rounded-xl bg-[#00e5ff]/10 p-3">
                    <item.icon className="h-7 w-7 text-[#00e5ff]" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white">{item.titulo}</h3>
                  <p className="text-sm text-[#8ba3c0] leading-relaxed">{item.descricao}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vagas */}
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
                Vagas Abertas
              </h2>
              <p className="mt-4 text-[#8ba3c0]">
                Encontre a oportunidade ideal para você
              </p>
            </motion.div>

            <div className="space-y-4">
              {vagas.map((vaga, index) => (
                <motion.a
                  key={vaga.titulo}
                  href="/#contato"
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#1e3a5f]/40 bg-[#0d1f3c]/60 p-6 transition-all duration-300 hover:border-[#00e5ff]/40 hover:bg-[#0d1f3c]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(index) }}
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                      {vaga.titulo}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#8ba3c0]">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {vaga.area}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {vaga.local}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {vaga.tipo}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#8ba3c0] group-hover:text-[#00e5ff] transition-colors flex-shrink-0" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-[#0a1628] py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.h2
              className="text-2xl font-black uppercase text-[#00e5ff] lg:text-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              Não encontrou sua vaga?
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Envie seu currículo e faça parte do nosso banco de talentos.
              Estamos sempre em busca de pessoas que querem fazer a diferença.
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
                Enviar Currículo
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Analytics/>
      <Footer />
    </>
  )
}
