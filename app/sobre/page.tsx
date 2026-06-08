"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/header"
import { SplitReveal } from "@/components/split-reveal"
import { Magnetic } from "@/components/magnetic"
import { Footer } from "@/components/footer"
import {scrollViewport,scrollTransition,fadeUpVariants,slideLeftVariants,slideRightVariants,staggerDelay,} from "@/lib/scroll-motion"
import { useEffect, useState, useRef } from "react"
import WaldirImg from "@/lib/Waldir.png"
import BrasilImg from "@/lib/Brasil.png"
import GPTWImg from "@/lib/GPTW.png"
import { Award, Users, Cpu, Target } from "lucide-react"
import { Analytics } from "@vercel/analytics/next"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [hasStarted, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const valores = [
  {
    icon: Target,
    titulo: "Precisão",
    descricao: "Cada análise é conduzida com rigor técnico e atenção cirúrgica aos detalhes.",
  },
  {
    icon: Award,
    titulo: "Ética",
    descricao: "Atuamos dentro da legalidade, com transparência total em cada decisão tributária.",
  },
  {
    icon: Cpu,
    titulo: "Tecnologia",
    descricao: "Desenvolvemos ferramentas exclusivas que potencializam a inteligência fiscal.",
  },
  {
    icon: Users,
    titulo: "Resultado Sustentável",
    descricao: "Entregamos economia real e duradoura, sem riscos para o seu negócio.",
  },
]

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative bg-[#0a1628] pt-32 pb-20 lg:pt-40 lg:pb-6">
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
              Sobre Nós
            </motion.p>
            <SplitReveal as="h1" className="mt-4 text-3xl font-black uppercase leading-tight text-white lg:text-6xl">
              Uma das consultorias tributárias mais{" "}
              <span className="text-[#00e5ff]">tecnológicas e humanas</span> do Brasil
            </SplitReveal>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              A LaraFy combina escala tecnológica com cultura de excelência para
              entregar resultados reais ao seu negócio.
            </motion.p>
          </div>
        </section>

        {/* Números */}
        <section className="relative py-16 overflow-hidden bg-[#0a1628]">
          <div className="absolute inset-0">
            <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0066ff]/0 blur-[150px] rounded-full" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
              <motion.div
                className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(1) }}
              >
                <span className="text-4xl font-extrabold text-white lg:text-5xl">
                  +<AnimatedCounter target={20} />
                </span>
                <span className="text-sm font-medium text-white/80 text-left leading-tight">
                  Anos de<br />Experiência
                </span>
              </motion.div>

              <motion.div
                className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(2) }}
              >
                <span className="text-4xl font-extrabold text-white lg:text-5xl">
                  +<AnimatedCounter target={100} />
                </span>
                <span className="text-sm font-medium text-white/80 text-left leading-tight">
                  Especialistas
                </span>
              </motion.div>

              <motion.div
                className="flex-1 flex items-center justify-center gap-3 text-center md:border-r md:border-[#ffffff]/20"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(3) }}
              >
                <img src={GPTWImg.src} alt="Great Place to Work - Certificada 2025" className="h-20 w-auto" />
                <span className="text-sm font-medium text-white/80 text-left leading-tight">
                  Great Place<br />to Work
                </span>
              </motion.div>

              <motion.div
                className="flex-1 flex items-center justify-center gap-3 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={fadeUpVariants}
                transition={{ ...scrollTransition, delay: staggerDelay(4) }}
              >
                <img src={BrasilImg.src} alt="Mapa do Brasil" className="w-20 h-auto" />
                <span className="text-sm font-medium text-white/80 text-left leading-tight">
                  Atuação<br />Nacional
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CEO */}
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
                className="flex-1 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideLeftVariants}
                transition={scrollTransition}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-[#00e5ff]">
                  Nosso Fundador
                </p>
                <h2 className="text-2xl font-black uppercase leading-tight text-white lg:text-4xl">
                  Waldir de Lara
                </h2>
                <blockquote className="border-l-4 border-[#00e5ff] pl-5">
                  <p className="text-xl font-bold italic text-[#00e5ff] lg:text-2xl leading-snug">
                    &ldquo;A linha tênue entre o erro e o acerto está em como foi analisado.&rdquo;
                  </p>
                </blockquote>
                <p className="text-[#8ba3c0] leading-relaxed">
                  Com visão estratégica e compromisso com resultados, Waldir de Lara
                  fundou a LaraFy com a missão de transformar a forma como empresas
                  lidam com a gestão tributária — unindo tecnologia de ponta com
                  inteligência humana.
                </p>
              </motion.div>

              <motion.div
                className="flex-1 relative"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideRightVariants}
                transition={scrollTransition}
              >
                <div className="relative w-full max-w-[480px] mx-auto aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent z-10" />
                  <Image
                    src={WaldirImg}
                    alt="Waldir de Lara - Founder e CEO da LaraFy"
                    width={480}
                    height={480}
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="relative bg-[#0a1628] py-20 lg:py-10">
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
                O que nos guia
              </p>
              <h2 className="mt-4 text-2xl font-black uppercase text-white lg:text-4xl">
                Nossos Valores
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {valores.map((valor, index) => (
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
                  <h3 className="mb-3 text-lg font-bold text-white">{valor.titulo}</h3>
                  <p className="text-sm text-[#8ba3c0] leading-relaxed">{valor.descricao}</p>
                </motion.div>
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
              Confiança se conquista com seriedade e eficiência
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Conheça nosso método e descubra como podemos transformar a gestão
              tributária da sua empresa.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              <Magnetic><a
                href="/#contato"
                className="cta-button mt-8 inline-block rounded-full bg-[#00e5ff] px-10 py-4 text-base font-bold uppercase tracking-wider text-[#0a1628] glow-effect"
              >
                Fale com a LaraFy
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

