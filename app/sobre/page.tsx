"use client"

// COPY: claims (20 anos, 5 anos, +100, +2,1 bi, R$10mi, +300 empresas, 40min, GPTW, CRC-PR) pendentes de validação com a Larafy. Fotos da liderança a confirmar.

import dynamic from "next/dynamic"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Award,
  Check,
  Layers,
  Lock,
  ShieldCheck,
  User,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SplitReveal } from "@/components/split-reveal"
import { ConstellationField } from "@/components/constellation-field"
import { CountUp } from "@/components/sections/flash/count-up"
import { CtaButton } from "@/components/ui/cta-button"
import { HudCorners, HudGrid, MetaLabel } from "@/components/ui/editorial"
import {
  fadeUpVariants,
  scrollTransition,
  scrollViewport,
  staggerDelay,
} from "@/lib/scroll-motion"
import WaldirImg from "@/lib/Waldir.png"
import GPTWImg from "@/lib/GPTW.png"
import { Analytics } from "@vercel/analytics/next"

const NoiseGrid = dynamic(
  () => import("@/components/three/noise-grid").then((m) => ({ default: m.NoiseGrid })),
  { ssr: false, loading: () => null },
)

interface StatItem {
  value: React.ReactNode
  label: string
}

const STATS: StatItem[] = [
  { value: <CountUp to={5} suffix=" anos" />, label: "de LaraFy, já entre as maiores do Brasil" },
  { value: <CountUp to={100} prefix="+" />, label: "especialistas das mais diversas áreas fiscais" },
  { value: "+2,1 bi", label: "de cenários tributários mapeados" },
  { value: "R$ 10 mi", label: "de seguro de responsabilidade (apólice nunca acionada)" },
]

interface DifferentialItem {
  icon: LucideIcon
  title: string
  text: string
}

const DIFFERENTIALS: DifferentialItem[] = [
  {
    icon: Zap,
    title: "5 anos em 40 minutos",
    text: "A pré-análise fiscal que levaria semanas, pronta em minutos — sem trabalho manual.",
  },
  {
    icon: Layers,
    title: "+2,1 bilhões de cenários",
    text: "O motor de regras que cruza legislação, setor e histórico real, item a item.",
  },
  {
    icon: ShieldCheck,
    title: "Zero erro humano",
    text: "A máquina elimina a falha operacional. As pessoas fazem o que importa: estratégia.",
  },
]

interface MemberItem {
  name: string
  role: string
  tag: string
  photo?: typeof WaldirImg
}

const MEMBERS: MemberItem[] = [
  { name: "Waldir de Lara Junior", role: "Fundador & CEO", tag: "+20 anos", photo: WaldirImg },
  { name: "Sócio(a)-Fundador(a)", role: "Direção Tributária", tag: "Liderança" },
  { name: "Sócio(a)", role: "Direção de Tecnologia", tag: "Liderança" },
  { name: "Sócio(a)", role: "Direção de Operações", tag: "Liderança" },
]

interface ValueItem {
  index: string
  title: string
  text: string
}

const VALUES: ValueItem[] = [
  { index: "01", title: "Inovação", text: "Tecnologia de ponta para precisão e velocidade." },
  { index: "02", title: "Excelência", text: "Superar expectativas com qualidade técnica." },
  { index: "03", title: "Compromisso", text: "Estratégia personalizada para cada cliente." },
  { index: "04", title: "Transparência", text: "Ética e clareza em relações duradouras." },
]

interface SealItem {
  icon: LucideIcon
  label: string
}

const SEALS: SealItem[] = [
  { icon: ShieldCheck, label: "Apólice R$10mi · nunca acionada" },
  { icon: Award, label: "Certificada GPTW" },
  { icon: Lock, label: "Dados isolados · LGPD" },
]

const TOPICS: string[] = ["Reforma Tributária", "IA no tributário", "O futuro do segmento"]

const PERKS: string[] = [
  "Ambiente certificado GPTW",
  "+100 especialistas para aprender e crescer junto",
  "Tecnologia própria e desafios de ponta no setor",
]

const outlinePill =
  "inline-flex items-center justify-center rounded-full border hairline px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[border-color,color] hover:border-[#00e5ff]/50 hover:text-[#00e5ff]"

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-[#04101f] text-white">
        {/* 1 — HERO */}
        <section
          id="topo"
          className="relative overflow-hidden bg-[#04101f] pt-32 pb-20 text-white lg:pt-40"
        >
          <NoiseGrid className="absolute inset-0 opacity-80" />
          <div
            className="absolute left-1/2 top-1/3 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.18),transparent_65%)]"
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
            <MetaLabel className="text-[#00e5ff]">A LaraFy</MetaLabel>
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="mt-4 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white text-balance"
            >
              20 anos de tributos. Uma obsessão por{" "}
              <span className="text-[#00e5ff]">precisão</span>.
            </motion.h1>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
              className="mx-auto mt-6 max-w-[52ch] text-lg text-white/65"
            >
              A LaraFy nasceu para provar que decisão tributária se toma com dado, não com
              achismo. Em 5 anos, virou uma das maiores consultorias tributárias do Brasil —
              com uma tecnologia que nenhuma outra tem.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(3) }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <CtaButton href="/#contato">Agendar diagnóstico gratuito</CtaButton>
              <a href="#carreiras" className={outlinePill}>
                Trabalhe conosco
              </a>
            </motion.div>
          </div>
        </section>

        {/* 2 — STAT BAND */}
        <section className="relative overflow-hidden bg-[#061425] text-white">
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline lg:grid-cols-4"
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#061425]/60 p-6 lg:p-8"
                >
                  <p className="font-display text-4xl tabular-nums text-[#00e5ff] lg:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-white/55">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3 — HISTÓRIA */}
        <section
          id="quem-somos"
          className="relative overflow-hidden bg-[#04101f] text-white"
        >
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">01 — Quem somos</MetaLabel>
            <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SplitReveal
                  as="h2"
                  type="words"
                  className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
                >
                  Precisão é o que nos move — e o que nos diferencia.
                </SplitReveal>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(1) }}
                  className="mt-6 space-y-5 text-base text-white/65 sm:text-lg"
                >
                  <p>
                    Somos uma consultoria tributária de alta performance, especialista no
                    regime mais complexo do Brasil: o{" "}
                    <strong className="text-white">Lucro Real e Presumido</strong>. Em apenas 5
                    anos, nos tornamos referência nacional unindo o que ninguém mais une —
                    profundidade técnica e tecnologia desenvolvida internamente.
                  </p>
                  <p>
                    Enquanto o mercado decide por estimativa, a LaraFy decide por{" "}
                    <strong className="text-white">dado real</strong>. Essa é a diferença entre
                    prometer e entregar — e por que mais de 300 empresas high-ticket confiam na
                    nossa execução.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border hairline bg-gradient-to-br from-[#0a2740] to-[#020a14]"
                aria-hidden
              >
                <ConstellationField
                  className="absolute inset-0 h-full w-full p-8"
                  count={7}
                  radius={36}
                />
                <span className="absolute bottom-4 left-4 meta-label text-[#5f86a6]">
                  2,1 bi cenários · mapeados
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4 — FUNDADOR */}
        <section
          id="fundador"
          className="relative overflow-hidden bg-[#061425] text-white"
        >
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">02 — O fundador</MetaLabel>
            <div className="mt-8 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={scrollTransition}
                className="relative aspect-[1/1.15] overflow-hidden rounded-2xl border hairline bg-gradient-to-b from-[#0a4f6e] to-[#001b27]"
              >
                <Image
                  src={WaldirImg}
                  alt="Waldir de Lara Junior, Fundador e CEO da LaraFy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-full w-full object-cover object-top"
                />
                <div
                  className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,rgba(0,229,255,0.22),transparent_60%)]"
                  aria-hidden
                />
                <div className="absolute bottom-4 left-4 rounded-xl border hairline bg-[#04101f]/85 px-4 py-3">
                  <p className="font-bold text-white">Waldir de Lara Junior</p>
                  <p className="text-sm text-white/55">Fundador &amp; CEO</p>
                </div>
              </motion.div>

              <div>
                <SplitReveal
                  as="h2"
                  type="words"
                  className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
                >
                  Uma das maiores mentes tributárias do Brasil.
                </SplitReveal>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(1) }}
                  className="mt-6 space-y-5 text-base text-white/65 sm:text-lg"
                >
                  <p>
                    Contador com{" "}
                    <strong className="text-white">mais de 20 anos de mercado</strong>, Waldir
                    construiu sua reputação na assertividade e no foco obsessivo em tecnologia.
                    Antes da LaraFy, fundou uma das taxtechs mais reconhecidas do país.
                  </p>
                  <p>
                    Mapeou{" "}
                    <strong className="text-white">mais de 2,1 bilhões de cenários tributários</strong>{" "}
                    e desenvolveu a{" "}
                    <strong className="text-white">única tecnologia do Brasil</strong> capaz de
                    fazer a pré-análise fiscal dos últimos 5 anos de uma empresa do Lucro Real ou
                    Presumido em, em média,{" "}
                    <strong className="text-white">40 minutos</strong> — eliminando o trabalho
                    manual e o erro humano, para a equipe focar no que dá resultado: a análise
                    estratégica.
                  </p>
                </motion.div>

                <motion.blockquote
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                  className="my-6 border-l-2 border-[#00e5ff] pl-5 text-lg italic text-white"
                >
                  O olhar atento e a tecnologia certa recuperam o que passa despercebido — e isso
                  aparece direto no caixa.
                </motion.blockquote>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(3) }}
                >
                  <p className="text-sm text-white/60">
                    Hoje, palestra por todo o Brasil sobre os temas que vão definir o setor:
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {TOPICS.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2 text-sm text-white/70"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" aria-hidden />
                        {topic}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 — DIFERENCIAL */}
        <section
          id="diferencial"
          className="relative overflow-hidden bg-[#04101f] text-white"
        >
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">03 — O que nos torna únicos</MetaLabel>
            <SplitReveal
              as="h2"
              type="words"
              className="mt-8 font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
            >
              Tecnologia que vira precisão.
            </SplitReveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {DIFFERENTIALS.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.article
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollViewport}
                    variants={fadeUpVariants}
                    transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                    className="rounded-2xl border hairline bg-[#061425]/60 p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#00e5ff]/35 lg:p-8"
                  >
                    <span className="inline-flex rounded-xl bg-[#00e5ff]/10 p-3" aria-hidden>
                      <Icon className="h-6 w-6 text-[#00e5ff]" strokeWidth={1.75} />
                    </span>
                    <h4 className="mt-5 font-display text-lg font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{item.text}</p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6 — SÓCIOS & FUNDADORES */}
        <section
          id="socios"
          className="relative overflow-hidden bg-[#061425] text-white"
        >
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">04 — Sócios &amp; Fundadores</MetaLabel>
            <SplitReveal
              as="h2"
              type="words"
              className="mt-8 font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
            >
              As pessoas por trás da precisão.
            </SplitReveal>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="mt-5 max-w-2xl text-base text-white/60 sm:text-lg"
            >
              A liderança que une décadas de experiência tributária à visão de tecnologia.
            </motion.p>

            <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {MEMBERS.map((member, i) => (
                <motion.article
                  key={member.name + i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                >
                  <div className="relative aspect-[1/1.1] overflow-hidden rounded-xl border hairline bg-gradient-to-b from-[#0a2740] to-[#020a14]">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={`${member.name}, ${member.role} da LaraFy`}
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center" aria-hidden>
                        <User className="h-12 w-12 text-white/20" strokeWidth={1.5} />
                      </span>
                    )}
                  </div>
                  <h4 className="mt-4 font-bold text-white">{member.name}</h4>
                  <p className="text-sm text-white/55">{member.role}</p>
                  <span className="mt-2 inline-flex rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 px-3 py-1 text-xs font-semibold text-[#00e5ff]">
                    {member.tag}
                  </span>
                </motion.article>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-white/45">
              Nomes e fotos da liderança a confirmar.
            </p>
          </div>
        </section>

        {/* 7 — NOSSA GENTE / CULTURA */}
        <section
          id="cultura"
          className="relative overflow-hidden bg-[#04101f] text-white"
        >
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">05 — Nossa gente</MetaLabel>
            <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SplitReveal
                  as="h2"
                  type="words"
                  className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
                >
                  Mais de 100 especialistas, um só padrão: excelência.
                </SplitReveal>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(1) }}
                  className="mt-6 max-w-2xl text-base text-white/65 sm:text-lg"
                >
                  Somos certificados{" "}
                  <strong className="text-white">GPTW — Great Place To Work</strong>. Reunimos
                  especialistas das mais diversas áreas fiscais e tributárias, num ambiente que
                  valoriza tecnologia, autonomia e desenvolvimento.
                </motion.p>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                  className="mt-7"
                >
                  <Image
                    src={GPTWImg}
                    alt="Selo Great Place To Work — LaraFy certificada"
                    sizes="160px"
                    className="h-16 w-auto"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {VALUES.map((value, i) => (
                  <motion.div
                    key={value.index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollViewport}
                    variants={fadeUpVariants}
                    transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                    className="rounded-xl border hairline bg-[#061425]/60 p-5"
                  >
                    <span className="meta-label text-[#00e5ff]">{value.index}</span>
                    <h4 className="mt-3 font-bold text-white">{value.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{value.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8 — SEGURANÇA */}
        <section
          id="seguranca"
          className="relative overflow-hidden bg-[#061425] text-white"
        >
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">06 — Segurança</MetaLabel>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="relative mx-auto mt-8 max-w-3xl rounded-2xl border hairline bg-[#04101f]/60 p-8 text-center lg:p-14"
            >
              <HudCorners />
              <SplitReveal
                as="h2"
                type="words"
                className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-white text-balance"
              >
                Processos tão precisos que a apólice de R$10 milhões nunca foi usada.
              </SplitReveal>
              <p className="mx-auto mt-5 max-w-2xl text-base text-white/60 sm:text-lg">
                Mantemos um seguro de responsabilidade de R$10 milhões para eventuais erros — e em
                todos esses anos, nunca precisamos acioná-lo. É a prova de quão seguras são as
                nossas estratégias e movimentações.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {SEALS.map((seal) => {
                  const Icon = seal.icon
                  return (
                    <span
                      key={seal.label}
                      className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2.5 text-sm text-white/70"
                    >
                      <Icon className="h-4 w-4 text-[#00e5ff]" strokeWidth={2} aria-hidden />
                      {seal.label}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 9 — TRABALHE CONOSCO */}
        <section
          id="carreiras"
          className="relative overflow-hidden bg-[#04101f] text-white"
        >
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">07 — Trabalhe conosco</MetaLabel>
            <div className="mt-8 grid items-center gap-12 rounded-2xl border hairline bg-[#061425]/50 p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <SplitReveal
                  as="h2"
                  type="words"
                  className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
                >
                  Venha construir o futuro do tributário no Brasil.
                </SplitReveal>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(1) }}
                  className="mt-6 max-w-2xl text-base text-white/65 sm:text-lg"
                >
                  Se você quer trabalhar onde tecnologia e tributos andam juntos — e ser
                  reconhecido por isso — seu lugar é aqui.
                </motion.p>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                  className="mt-6 space-y-3"
                >
                  {PERKS.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-white/70">
                      <span
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#00e5ff]/10"
                        aria-hidden
                      >
                        <Check className="h-3.5 w-3.5 text-[#00e5ff]" strokeWidth={2.5} />
                      </span>
                      {perk}
                    </li>
                  ))}
                </motion.ul>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(3) }}
                  className="mt-8"
                >
                  <a href="/carreiras" className={outlinePill}>
                    Ver vagas abertas
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl border hairline bg-gradient-to-br from-[#0a2740] to-[#020a14]"
                aria-hidden
              >
                <ConstellationField
                  className="absolute inset-0 h-full w-full p-8"
                  count={6}
                  radius={34}
                />
                <Users className="relative h-12 w-12 text-[#00e5ff]" strokeWidth={1.5} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 10 — CTA FINAL */}
        <section className="relative overflow-hidden bg-[#020a14] text-white">
          <HudGrid />
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 text-center lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">08 — Comece agora</MetaLabel>
            <SplitReveal
              as="h2"
              type="words"
              className="mx-auto mt-8 max-w-3xl font-display text-[clamp(2rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white text-balance"
            >
              Conheça a precisão LaraFy na prática.
            </SplitReveal>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg"
            >
              Agende um diagnóstico — 5 anos de apuração analisados em 40 minutos, sem achismo.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <CtaButton href="/#contato">Agendar diagnóstico gratuito</CtaButton>
              <a href="/#contato" className={outlinePill}>
                Falar com especialista
              </a>
            </motion.div>
          </div>
        </section>
        <Analytics />
      </main>
      <Footer />
    </>
  )
}
