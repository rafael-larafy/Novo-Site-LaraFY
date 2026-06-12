"use client"

// COPY: claims numéricos (26,5%, 8,8%, 17,7%, +2,1 bi, +20 anos, +300 empresas) pendentes de validação com a Larafy.

import dynamic from "next/dynamic"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeftRight,
  Check,
  Coins,
  Cpu,
  LineChart,
  Plus,
  ShieldAlert,
  Tags,
  X,
  type LucideIcon,
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SplitReveal } from "@/components/split-reveal"
import { CtaButton } from "@/components/ui/cta-button"
import { HudGrid, MetaLabel } from "@/components/ui/editorial"
import {
  fadeUpVariants,
  scrollTransition,
  scrollViewport,
  staggerDelay,
} from "@/lib/scroll-motion"
import WaldirImg from "@/lib/Waldir.png"
import { Analytics } from "@vercel/analytics/next"

const IvaGauge = dynamic(
  () => import("@/components/three/iva-gauge").then((m) => ({ default: m.IvaGauge })),
  { ssr: false, loading: () => <div className="h-full w-full" /> }
)
const ReformSimulator = dynamic(
  () =>
    import("@/components/sections/reforma/reform-simulator").then((m) => ({
      default: m.ReformSimulator,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[420px] rounded-2xl border hairline bg-[#061425]/60" />
    ),
  }
)

interface DataCard {
  value: string
  highlight?: boolean
  title: string
  description: string
}

const DATA_CARDS: DataCard[] = [
  {
    value: "5 → 2",
    title: "Tributos unificados",
    description:
      "PIS, COFINS, ICMS, ISS e IPI dão lugar a CBS e IBS (o IVA Dual), mais o novo Imposto Seletivo.",
  },
  {
    value: "26,5%",
    highlight: true,
    title: "Teto do IVA",
    description:
      "Soma de referência CBS + IBS definida pela LC 214/2025. Pode chegar a ~28% com as exceções setoriais.",
  },
  {
    value: "Crédito amplo",
    title: "Não cumulatividade plena",
    description:
      "O imposto incide só sobre o valor agregado. Fim do efeito cascata — e mais crédito recuperável na cadeia.",
  },
  {
    value: "Split payment",
    title: "Recolhimento no pagamento",
    description:
      "O imposto é separado automaticamente na hora da transação. Muda o capital de giro e a conciliação.",
  },
  {
    value: "No destino",
    title: "Cobrança onde se consome",
    description:
      "O tributo passa a ser devido no destino, encerrando a guerra fiscal entre estados.",
  },
  {
    value: "8 anos",
    title: "De transição",
    description:
      "De 2026 a 2033, dois sistemas convivem. A fase 2029–2032 é a mais sensível para ICMS e ISS.",
  },
]

interface TimelineNode {
  year: string
  tag: string
  description: string
  key: boolean
}

const TIMELINE: TimelineNode[] = [
  {
    year: "2023",
    tag: "EC 132",
    description:
      "A reforma é promulgada. Nascem o IVA Dual (CBS + IBS) e o Imposto Seletivo.",
    key: false,
  },
  {
    year: "2025",
    tag: "LC 214",
    description:
      "Regulamentação. Define o teto de 26,5% e as regras do novo sistema.",
    key: false,
  },
  {
    year: "2026",
    tag: "Fase de teste",
    description:
      "CBS a 0,9% e IBS a 0,1% na nota (simbólicos). Tributos antigos seguem. Adaptação de ERPs.",
    key: true,
  },
  {
    year: "2027",
    tag: "CBS cheia",
    description:
      "Fim de PIS e COFINS. CBS plena. Entra o Imposto Seletivo. IPI a zero (exceto ZFM).",
    key: true,
  },
  {
    year: "2028",
    tag: "Consolidação",
    description:
      "Ajustes do modelo federal e atualização das alíquotas de referência.",
    key: false,
  },
  {
    year: "2029–32",
    tag: "Transição estadual",
    description:
      "ICMS e ISS caem gradualmente enquanto o IBS sobe. Dois regimes convivem.",
    key: true,
  },
  {
    year: "2033",
    tag: "Sistema pleno",
    description:
      "ICMS e ISS extintos. IVA Dual a 100% — CBS 8,8% + IBS 17,7%.",
    key: true,
  },
]

interface Deliverable {
  icon: LucideIcon
  title: string
  description: string
}

const DELIVERABLES: Deliverable[] = [
  {
    icon: LineChart,
    title: "Projeção ano a ano",
    description:
      "O impacto da carga em cada fase da transição, de 2026 a 2033.",
  },
  {
    icon: Coins,
    title: "Mapa de créditos",
    description:
      "Os créditos reais já identificados no diagnóstico, integrados à simulação.",
  },
  {
    icon: ArrowLeftRight,
    title: "Impacto do split payment",
    description:
      "Como o recolhimento automático afeta o seu capital de giro e a conciliação.",
  },
  {
    icon: Tags,
    title: "Reprecificação recomendada",
    description: "O quanto repassar — sem perder margem e sem cobrar a mais.",
  },
  {
    icon: ShieldAlert,
    title: "Sinalização de riscos",
    description:
      "Pontos de atenção fiscal antes que virem custo ou autuação.",
  },
  {
    icon: Cpu,
    title: "+2,1 bilhões de cenários",
    description:
      "Tudo processado pelo motor proprietário — precisão que nenhuma outra entrega.",
  },
]

interface FaqItem {
  question: string
  answer: string
}

const FAQ: FaqItem[] = [
  {
    question: "O que é o IVA Dual (CBS e IBS)?",
    answer:
      "É o novo modelo sobre o consumo: a CBS (federal, no lugar de PIS e COFINS) e o IBS (estadual e municipal, no lugar de ICMS e ISS). Juntos formam um IVA com crédito amplo e cobrança no destino. A soma de referência tem teto de 26,5%.",
  },
  {
    question: "Quando começa a cobrança de verdade?",
    answer:
      "2026 é fase de teste (CBS 0,9% e IBS 0,1%, simbólicos). A CBS plena começa em 2027, com o fim de PIS e COFINS. O IBS sobe gradualmente de 2029 a 2032. Em 2033 o sistema novo opera 100%.",
  },
  {
    question: "O que é o Split Payment?",
    answer:
      "É a separação automática do imposto no momento do pagamento. Não é só uma mudança de TI: afeta capital de giro, conciliação bancária e gestão de crédito. Por isso entra no nosso estudo desde já.",
  },
  {
    question: "Por que simular sobre dado real importa?",
    answer:
      "Porque a reforma muda a carga conforme o setor, os insumos e os créditos de cada empresa. Uma média de mercado não diz o seu número — só a sua apuração real diz. É isso que o estudo LaraFy entrega.",
  },
  {
    question: "E quem está no Simples Nacional?",
    answer:
      "O Simples continua, mas há impactos relevantes na geração e no aproveitamento de crédito ao longo da cadeia. Avaliamos caso a caso se o regime ainda é o mais vantajoso após a reforma.",
  },
]

const HERO_STATS: { value: string; label: string }[] = [
  { value: "8,8%", label: "CBS (federal)" },
  { value: "17,7%", label: "IBS (estadual/municipal)" },
  { value: "2033", label: "sistema 100% pleno" },
]

const MARKET_CONS: string[] = [
  "Baseado em média do setor",
  "Estimativas e projeções genéricas",
  "Não considera seus créditos reais",
  "Recomendações de prateleira",
]

const LARAFY_PROS: string[] = [
  "Baseado na sua apuração real de 5 anos",
  "Projeção ano a ano da transição",
  "Considera os créditos já mapeados no diagnóstico",
  "Recomendação de reprecificação sob medida",
]

const SPEAKER_TOPICS: string[] = [
  "Reforma Tributária na prática",
  "IA e tecnologia no tributário",
  "O futuro do setor",
]

export default function ReformaTributariaPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-[#04101f] text-white">
        
        <section
          id="topo"
          className="relative overflow-hidden bg-[#04101f] pt-32 pb-20 text-white lg:pt-40"
        >
          <HudGrid />

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              
              <div>
                <MetaLabel className="text-[#00e5ff]">
                  Reforma Tributária · 2026–2033
                </MetaLabel>
                <motion.h1
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={scrollTransition}
                  className="mt-5 font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.03em] text-balance text-white"
                >
                  A maior mudança tributária em 60 anos já começou. Você sabe o{" "}
                  <span className="text-[#00e5ff]">seu número</span>?
                </motion.h1>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(1) }}
                  className="mt-6 max-w-[46ch] text-lg text-white/65"
                >
                  Enquanto o mercado decide no achismo, a LaraFy projeta o impacto
                  da reforma na sua empresa com os dados reais levantados no
                  diagnóstico — ano a ano da transição.
                </motion.p>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(2) }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <CtaButton href="#simulador">Simular o impacto</CtaButton>
                  <a
                    href="#linha"
                    className="rounded-full border hairline px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[border-color,color] hover:border-[#00e5ff]/50"
                  >
                    Ver a linha do tempo
                  </a>
                </motion.div>
              </div>

              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(2) }}
              >
                <div className="relative mx-auto aspect-square w-full max-w-[460px]">
                  <IvaGauge className="absolute inset-0" />
                  <div
                    className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
                    aria-hidden
                  >
                    <MetaLabel>Teto do IVA (CBS + IBS)</MetaLabel>
                    <div className="font-display text-[clamp(3rem,9vw,5rem)] font-bold leading-none tracking-[-0.04em] text-[#00e5ff]">
                      26,5%
                    </div>
                    <p className="mt-2 max-w-[26ch] text-xs text-white/55">
                      Um dos maiores impostos sobre consumo do mundo (média OCDE
                      ~15%).
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border hairline">
                  {HERO_STATS.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={
                        i > 0
                          ? "border-l hairline px-4 py-5 text-center"
                          : "px-4 py-5 text-center"
                      }
                    >
                      <div className="font-display text-xl font-bold tracking-[-0.02em] text-[#00e5ff]">
                        {stat.value}
                      </div>
                      <div className="meta-label mt-2 text-white/55">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        
        <section
          id="dados"
          className="relative overflow-hidden bg-[#061425] text-white"
        >
          <HudGrid />

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <div className="max-w-3xl">
              <MetaLabel className="text-[#00e5ff]">01 — O que muda</MetaLabel>
              <SplitReveal
                as="h2"
                type="words"
                className="mt-5 font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
              >
                Os dados que vão redesenhar o seu caixa.
              </SplitReveal>
              <p className="mt-5 max-w-2xl text-base text-white/60 sm:text-lg">
                A reforma unifica tributos, muda a lógica do crédito e altera o
                fluxo de caixa. Quem entende cedo, decide melhor.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {DATA_CARDS.map((card, i) => (
                <motion.article
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                  className={`rounded-2xl border hairline p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#00e5ff]/35 lg:p-8 ${
                    card.highlight
                      ? "bg-[#00e5ff]/[0.06]"
                      : "bg-[#061425]/60"
                  }`}
                >
                  <p
                    className={`font-display text-[2rem] font-bold leading-none tracking-[-0.03em] ${
                      card.highlight ? "text-[#00e5ff]" : "text-white"
                    }`}
                  >
                    {card.value}
                  </p>
                  <h4 className="mt-4 text-base font-bold text-white">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {card.description}
                  </p>
                </motion.article>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-white/45">
              Fontes: EC 132/2023, LC 214/2025, Nota Técnica SERT (Ministério da
              Fazenda) e OCDE. Alíquotas de referência são estimativas e podem
              variar até o fim da transição.
            </p>
          </div>
        </section>

        
        <section
          id="linha"
          className="relative overflow-hidden bg-[#04101f] text-white"
        >
          <HudGrid />

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <div className="max-w-3xl">
              <MetaLabel className="text-[#00e5ff]">
                02 — Linha do tempo
              </MetaLabel>
              <SplitReveal
                as="h2"
                type="words"
                className="mt-5 font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
              >
                A transição, ano a ano.
              </SplitReveal>
              <p className="mt-5 max-w-2xl text-base text-white/60 sm:text-lg">
                Da promulgação ao sistema pleno — cada ano exige uma decisão
                diferente da sua empresa.
              </p>
            </div>

            <ol className="relative mt-16 grid gap-10 lg:grid-cols-7 lg:gap-4">
              
              <span
                className="pointer-events-none absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[#00e5ff]/60 via-[#00e5ff]/25 to-transparent lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-full lg:bg-gradient-to-r"
                aria-hidden
              />
              
              <span
                className="pointer-events-none absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[#00e5ff]/60 via-[#00e5ff]/25 to-transparent lg:hidden"
                aria-hidden
              />

              {TIMELINE.map((node, i) => (
                <motion.li
                  key={node.year}
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(i) }}
                  className="relative pl-8 lg:pl-0 lg:pt-8"
                >
                  
                  <span
                    className="absolute left-0 top-1 lg:left-0 lg:top-0"
                    aria-hidden
                  >
                    {node.key ? (
                      <span className="relative grid h-[15px] w-[15px] place-items-center">
                        <span className="absolute inset-0 animate-pulse rounded-full bg-[#00e5ff]/40 blur-[2px]" />
                        <span className="relative h-[15px] w-[15px] rounded-full bg-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.8)]" />
                      </span>
                    ) : (
                      <span className="block h-[13px] w-[13px] rounded-full border-2 border-[#00e5ff]/60 bg-[#04101f]" />
                    )}
                  </span>

                  <div className="font-display text-lg font-bold tracking-[-0.02em] text-white">
                    {node.year}
                  </div>
                  <div className="mt-3 rounded-xl border hairline bg-[#061425]/60 p-4">
                    <span className="meta-label text-[#00e5ff]">{node.tag}</span>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {node.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        
        <section
          id="simulador"
          className="relative overflow-hidden bg-[#061425] text-white"
        >
          <HudGrid />

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <div className="max-w-3xl">
              <MetaLabel className="text-[#00e5ff]">
                03 — Nosso diferencial
              </MetaLabel>
              <SplitReveal
                as="h2"
                type="words"
                className="mt-5 font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
              >
                O estudo da reforma sobre o que é seu — não sobre achismo.
              </SplitReveal>
              <p className="mt-5 max-w-2xl text-base text-white/60 sm:text-lg">
                Nosso simulador usa os dados reais já levantados no seu
                diagnóstico para projetar o impacto da reforma, ano a ano. Ajuste
                abaixo para ver uma prévia.
              </p>
            </div>

            <div className="mt-10">
              <ReformSimulator />
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={scrollTransition}
                className="rounded-2xl border hairline bg-[#061425]/60 p-6 lg:p-8"
              >
                <span className="meta-label text-[#00e5ff]/60">
                  Estudo de mercado
                </span>
                <ul className="mt-5 space-y-3">
                  {MARKET_CONS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/55"
                    >
                      <X
                        className="mt-0.5 h-4 w-4 shrink-0 text-white/40"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(1) }}
                className="rounded-2xl border border-[#00e5ff]/30 bg-[#00e5ff]/[0.06] p-6 lg:p-8"
              >
                <span className="meta-label text-[#00e5ff]">Estudo LaraFy</span>
                <ul className="mt-5 space-y-3">
                  {LARAFY_PROS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/75"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#00e5ff]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        
        <section
          id="entregaveis"
          className="relative overflow-hidden bg-[#04101f] text-white"
        >
          <HudGrid />

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <div className="max-w-3xl">
              <MetaLabel className="text-[#00e5ff]">
                04 — A qualidade do estudo
              </MetaLabel>
              <SplitReveal
                as="h2"
                type="words"
                className="mt-5 font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
              >
                O que você recebe no estudo da reforma LaraFy.
              </SplitReveal>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {DELIVERABLES.map((item, i) => {
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
                    <h4 className="mt-5 text-base font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {item.description}
                    </p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        
        <section
          id="autoridade"
          className="relative overflow-hidden bg-[#061425] text-white"
        >
          <HudGrid />

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={scrollTransition}
                className="relative aspect-[4/3.4] overflow-hidden rounded-2xl border hairline bg-gradient-to-b from-[#0a4f6e] to-[#001b27]"
              >
                <Image
                  src={WaldirImg}
                  alt="Waldir de Lara Junior"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="h-full w-full object-cover object-top"
                  placeholder="blur"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,229,255,0.18),_transparent_60%)]"
                  aria-hidden
                />
              </motion.div>

              
              <div>
                <MetaLabel className="text-[#00e5ff]">
                  05 — Autoridade no tema
                </MetaLabel>
                <SplitReveal
                  as="h2"
                  type="words"
                  className="mt-5 font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
                >
                  Waldir de Lara Junior nos palcos do Brasil.
                </SplitReveal>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                  Reconhecido como uma das maiores mentes tributárias do país, o
                  fundador da LaraFy palestra por todo o Brasil sobre o que vai
                  definir o futuro do setor — traduzindo a reforma em decisão
                  prática para empresas e lideranças.
                </p>

                <ul className="mt-7 flex flex-wrap gap-3">
                  {SPEAKER_TOPICS.map((topic) => (
                    <li
                      key={topic}
                      className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2 text-sm text-white/80"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]"
                        aria-hidden
                      />
                      {topic}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-sm text-white/55">
                  <strong className="font-bold text-white">
                    Waldir de Lara Junior
                  </strong>{" "}
                  · Fundador &amp; CEO · +20 anos de mercado
                </p>

                <div className="mt-8">
                  <a
                    href="/#contato"
                    className="inline-flex rounded-full border hairline px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[border-color,color] hover:border-[#00e5ff]/50"
                  >
                    Convidar para uma palestra
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section
          id="faq"
          className="relative overflow-hidden bg-[#04101f] text-white"
        >
          <HudGrid />

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <MetaLabel className="text-[#00e5ff]">
                06 — Dúvidas sobre a reforma
              </MetaLabel>
              <SplitReveal
                as="h2"
                type="words"
                className="mt-5 font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
              >
                O essencial, sem juridiquês.
              </SplitReveal>
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              {FAQ.map((item, i) => (
                <details
                  key={item.question}
                  className="group mb-3 overflow-hidden rounded-xl border hairline bg-[#061425]/60"
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-white [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Plus
                      className="h-5 w-5 shrink-0 text-[#00e5ff] transition-transform group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <div className="px-6 pb-5 text-sm text-white/60">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-white/45">
              Conteúdo informativo. Regras e alíquotas conforme LC 214/2025 e
              regulamentação em andamento — sujeitas a ajustes.
            </p>
          </div>
        </section>

        
        <section className="relative overflow-hidden bg-[#020a14] text-white">
          <HudGrid />

          <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-24 text-center lg:px-10 lg:py-28">
            <MetaLabel className="text-[#00e5ff]">07 — Comece agora</MetaLabel>
            <SplitReveal
              as="h2"
              type="words"
              className="mx-auto mt-5 max-w-4xl font-display text-[2.75rem] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-balance text-white"
            >
              Pare de decidir a reforma no escuro.
            </SplitReveal>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
              Agende um diagnóstico e receba o estudo da reforma sobre os dados
              reais da sua empresa — ano a ano, com precisão.
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
            >
              <CtaButton href="/#contato">Agendar diagnóstico gratuito</CtaButton>
              <a
                href="#simulador"
                className="rounded-full border hairline px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[border-color,color] hover:border-[#00e5ff]/50"
              >
                Voltar ao simulador
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Analytics />
      <Footer />
    </>
  )
}
