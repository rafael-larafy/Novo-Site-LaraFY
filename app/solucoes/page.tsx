"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {scrollViewport,scrollTransition,fadeUpVariants,slideLeftVariants,slideRightVariants,staggerDelay,} from "@/lib/scroll-motion"
import { Star, Crown, Shield, Scale, Handshake, Users } from "lucide-react"

const solucoes = [
  {
    icon: Star,
    tag: "Solução Principal",
    tagColor: "bg-[#c8944a]",
    titulo: "Consultoria Tributária Estratégica",
    itens: [
      "Recuperação de créditos tributários",
      "Planejamento tributário",
      "Estudo da reforma tributária (IBS/CBS)",
      "Estratégias fiscais e operacionais avançadas",
      "Diagnóstico com IA, RPA e machine learning",
    ],
  },
  {
    icon: Crown,
    tag: "Exclusivo para Clientes",
    tagColor: "bg-[#c8944a]/20 text-[#c8944a] border border-[#c8944a]/40",
    titulo: "Contabilidade Premium",
    itens: [
      "Execução e sustentação do planejamento",
      "Integração fiscal, contábil e financeira",
      "Monitoramento contínuo contra perdas",
    ],
  },
  {
    icon: Shield,
    tag: "Proteção Patrimonial",
    tagColor: "bg-[#c8944a]/20 text-[#c8944a] border border-[#c8944a]/40",
    titulo: "Holding Patrimonial",
    itens: [
      "Proteção de patrimônio (CPF e CNPJ)",
      "Eficiência tributária sobre lucros e bens",
      "Estruturação patrimonial estratégica",
    ],
  },
  {
    icon: Scale,
    tag: "Estrutura Jurídica",
    tagColor: "bg-[#c8944a]/20 text-[#c8944a] border border-[#c8944a]/40",
    titulo: "Societário",
    itens: [
      "Reestruturações societárias",
      "Modelagem empresarial",
      "Ajustes estratégicos de estrutura",
    ],
  },
  {
    icon: Handshake,
    tag: "Transações",
    tagColor: "bg-[#c8944a]/20 text-[#c8944a] border border-[#c8944a]/40",
    titulo: "M&A — Fusões e Aquisições",
    itens: [
      "Compra e venda de empresas",
      "Due diligence tributária e financeira",
      "Valuation estratégico",
      "Estruturação de operações",
    ],
  },
  {
    icon: Users,
    tag: "Networking",
    tagColor: "bg-[#c8944a]/20 text-[#c8944a] border border-[#c8944a]/40",
    titulo: "Business Club LaraFy",
    itens: [
      "Clube de negócios e networking estratégico",
      "Conexão entre empresários e decisores",
      "Geração de oportunidades e parcerias",
      "Acesso incluso para clientes LaraFy",
      "Acesso pago para não clientes",
    ],
  },
]

export default function SolucoesPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative bg-[#0a1628] pt-32 pb-20 lg:pt-40 lg:pb-8">
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
              Nossas Soluções
            </motion.p>
            <motion.h1
              className="mt-4 text-3xl font-black uppercase leading-tight text-white lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Precisão cirúrgica na{" "}
              <span className="text-[#00e5ff]">redução de impostos</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Combinamos tecnologia exclusiva com inteligência humana para
              entregar resultados reais e com zero risco ao seu negócio.
            </motion.p>
          </div>
        </section>

        {/* Soluções - Timeline */}
        <section className="relative bg-[#0a1628] py-20 lg:py-10">
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
                Nossas Soluções
              </h2>
              <p className="mt-4 text-[#8ba3c0]">
                6 frentes integradas para proteger e potencializar seu negócio
              </p>
            </motion.div>

            <div className="relative">
              {/* Linha central */}
              <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-[#1e3a5f]/60" />

              <div className="space-y-10">
                {solucoes.map((solucao, index) => (
                  <motion.div
                    key={solucao.titulo}
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
                      <div className={`inline-flex rounded-xl bg-[#00e5ff]/10 p-2.5 mb-3 ${index % 2 === 0 ? "lg:float-right lg:ml-3" : ""}`}>
                        <solucao.icon className="h-6 w-6 text-[#00e5ff]" />
                      </div>
                      <div className={index % 2 === 0 ? "lg:clear-right" : ""}>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#00e5ff]">
                          {solucao.tag}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1">{solucao.titulo}</h3>
                        <ul className={`mt-3 space-y-1.5 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                          {solucao.itens.map((item) => (
                            <li key={item} className={`flex items-start gap-2 text-sm text-[#8ba3c0] ${index % 2 === 0 ? "lg:flex-row-reverse lg:gap-2" : ""}`}>
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Spacer para o lado oposto */}
                    <div className="hidden lg:block flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-[#0a1628] py-20 lg:pt-5 lg:pb-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <motion.h2
              className="text-2xl font-black uppercase text-[#00e5ff] lg:text-4xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              Imposto não é gasto. É estratégia.
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
              sua empresa pode economizar.
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
