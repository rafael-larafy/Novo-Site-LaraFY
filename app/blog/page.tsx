"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {scrollViewport,scrollTransition,fadeUpVariants,staggerDelay,} from "@/lib/scroll-motion"
import { Clock, ArrowRight, Tag } from "lucide-react"
import { Analytics } from "@vercel/analytics/next"

const destaque = {
  titulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod",
  resumo:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  categoria: "Lorem Ipsum",
  data: "08 Abr 2026",
  leitura: "8 min",
  imagem: "/images/AdobeStock_699471030.jpeg",
}

const posts = [
  {
    titulo: "Lorem ipsum dolor sit amet consectetur adipiscing",
    resumo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    categoria: "Lorem Ipsum",
    data: "02 Abr 2026",
    leitura: "5 min",
  },
  {
    titulo: "Sed do eiusmod tempor incididunt ut labore et dolore",
    resumo:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    categoria: "Lorem Ipsum",
    data: "25 Mar 2026",
    leitura: "6 min",
  },
  {
    titulo: "Ut enim ad minim veniam quis nostrud exercitation",
    resumo:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    categoria: "Lorem Ipsum",
    data: "18 Mar 2026",
    leitura: "4 min",
  },
  {
    titulo: "Duis aute irure dolor in reprehenderit in voluptate",
    resumo:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    categoria: "Lorem Ipsum",
    data: "10 Mar 2026",
    leitura: "7 min",
  },
  {
    titulo: "Excepteur sint occaecat cupidatat non proident sunt",
    resumo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Praesent commodo cursus magna.",
    categoria: "Lorem Ipsum",
    data: "02 Mar 2026",
    leitura: "5 min",
  },
  {
    titulo: "Nulla facilisi praesent commodo cursus magna vel",
    resumo:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque.",
    categoria: "Lorem Ipsum",
    data: "22 Fev 2026",
    leitura: "6 min",
  },
]

export default function BlogPage() {
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
              Blog
            </motion.p>
            <motion.h1
              className="mt-4 text-3xl font-black uppercase leading-tight text-white lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Conteúdo que{" "}
              <span className="text-[#00e5ff]">transforma</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Artigos, análises e insights sobre gestão tributária,
              reforma fiscal e inteligência de dados.
            </motion.p>
          </div>
        </section>

        {/* Post Destaque */}
        <section className="relative bg-[#020c18] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.div
              className="group relative overflow-hidden rounded-2xl border border-[#1e3a5f]/40 bg-[#0d1f3c]/60 transition-all duration-300 hover:border-[#00e5ff]/30"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-1/2 aspect-[16/10] lg:aspect-auto">
                  <Image
                    src={destaque.imagem}
                    alt={destaque.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d1f3c]/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c]/80 to-transparent lg:hidden" />
                </div>

                <div className="relative flex-1 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center gap-1.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 px-3 py-1 text-xs font-semibold text-[#00e5ff]">
                      <Tag className="h-3 w-3" />
                      {destaque.categoria}
                    </span>
                    <span className="text-xs text-[#8ba3c0]">{destaque.data}</span>
                    <span className="flex items-center gap-1 text-xs text-[#8ba3c0]">
                      <Clock className="h-3 w-3" />
                      {destaque.leitura}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-4 lg:text-3xl leading-tight group-hover:text-[#00e5ff] transition-colors">
                    {destaque.titulo}
                  </h2>
                  <p className="text-[#8ba3c0] leading-relaxed mb-6">
                    {destaque.resumo}
                  </p>
                  <div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00e5ff] group-hover:gap-3 transition-all">
                      Ler artigo
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Grid de Posts */}
        <section className="relative bg-[#0a1628] py-20 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <motion.h2
              className="text-2xl font-black uppercase text-white lg:text-3xl mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={scrollTransition}
            >
              Últimos Artigos
            </motion.h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <motion.div
                  key={post.titulo}
                  className="group flex flex-col rounded-2xl border border-[#1e3a5f]/40 bg-[#0d1f3c]/60 overflow-hidden transition-all duration-300 hover:border-[#00e5ff]/40 hover:bg-[#0d1f3c]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(index) }}
                >
                  {/* Placeholder de imagem */}
                  <div className="h-44 bg-gradient-to-br from-[#1e3a5f]/40 to-[#0a1628] flex items-center justify-center">
                    <span className="text-4xl font-black text-[#00e5ff]/10">
                      BLOG
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-[#00e5ff]">
                        {post.categoria}
                      </span>
                      <span className="text-xs text-[#8ba3c0]">{post.data}</span>
                      <span className="flex items-center gap-1 text-xs text-[#8ba3c0]">
                        <Clock className="h-3 w-3" />
                        {post.leitura}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-[#00e5ff] transition-colors">
                      {post.titulo}
                    </h3>
                    <p className="text-sm text-[#8ba3c0] leading-relaxed mb-4 flex-1">
                      {post.resumo}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00e5ff] group-hover:gap-3 transition-all">
                      Ler mais
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Newsletter */}
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
              Fique por dentro
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Receba nossos conteúdos exclusivos sobre inteligência tributária
              diretamente no seu e-mail.
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
                Assinar Newsletter
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
