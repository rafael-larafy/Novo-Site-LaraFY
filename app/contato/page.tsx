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
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react"

const infos = [
  {
    icon: Phone,
    titulo: "WhatsApp",
    valor: "+55 (11) 00000-0000",
    href: "https://wa.me/5511000000000",
  },
  {
    icon: Mail,
    titulo: "E-mail",
    valor: "contato@larafy.com.br",
    href: "mailto:contato@larafy.com.br",
  },
  {
    icon: MapPin,
    titulo: "Endereço",
    valor: "São Paulo, SP — Brasil",
    href: undefined,
  },
]

const redes = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/laratax/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/laratax",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/laratax/",
  },
]

export default function ContatoPage() {
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
              Contato
            </motion.p>
            <motion.h1
              className="mt-4 text-3xl font-black uppercase leading-tight text-white lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(1) }}
            >
              Fale com um{" "}
              <span className="text-[#00e5ff]">estrategista sênior</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-[#8ba3c0]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
              transition={{ ...scrollTransition, delay: staggerDelay(2) }}
            >
              Sem intermédios, sem ruídos. Analisamos desafios e construímos
              decisões junto com você.
            </motion.p>
          </div>
        </section>

        {/* Formulário + Info */}
        <section className="relative bg-[#020c18] py-20 lg:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Formulário */}
              <motion.div
                className="flex-1"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideLeftVariants}
                transition={scrollTransition}
              >
                <h2 className="text-2xl font-bold text-white mb-8">
                  Solicite seu diagnóstico tributário
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="w-full h-12 px-4 rounded-xl border border-[#1e3a5f]/60 bg-[#0d1f3c]/80 text-white placeholder:text-[#8ba3c0]/60 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      className="w-full h-12 px-4 rounded-xl border border-[#1e3a5f]/60 bg-[#0d1f3c]/80 text-white placeholder:text-[#8ba3c0]/60 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Empresa"
                      className="w-full h-12 px-4 rounded-xl border border-[#1e3a5f]/60 bg-[#0d1f3c]/80 text-white placeholder:text-[#8ba3c0]/60 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Cargo"
                      className="w-full h-12 px-4 rounded-xl border border-[#1e3a5f]/60 bg-[#0d1f3c]/80 text-white placeholder:text-[#8ba3c0]/60 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="WhatsApp"
                      className="w-full h-12 px-4 rounded-xl border border-[#1e3a5f]/60 bg-[#0d1f3c]/80 text-white placeholder:text-[#8ba3c0]/60 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Faturamento mensal"
                      className="w-full h-12 px-4 rounded-xl border border-[#1e3a5f]/60 bg-[#0d1f3c]/80 text-white placeholder:text-[#8ba3c0]/60 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm"
                    />
                  </div>
                  <textarea
                    placeholder="Como podemos ajudar?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-[#1e3a5f]/60 bg-[#0d1f3c]/80 text-white placeholder:text-[#8ba3c0]/60 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:border-transparent text-sm resize-none"
                  />
                  <button
                    type="submit"
                    className="cta-button w-full rounded-full bg-[#00e5ff] py-4 text-base font-bold uppercase tracking-wider text-[#0a1628] glow-effect"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </motion.div>

              {/* Informações */}
              <motion.div
                className="lg:w-[360px] space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={scrollViewport}
                variants={slideRightVariants}
                transition={scrollTransition}
              >
                <div className="space-y-6">
                  {infos.map((info, index) => {
                    const content = (
                      <motion.div
                        key={info.titulo}
                        className="flex items-start gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={scrollViewport}
                        variants={fadeUpVariants}
                        transition={{ ...scrollTransition, delay: staggerDelay(index) }}
                      >
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00e5ff]/10">
                          <info.icon className="h-5 w-5 text-[#00e5ff]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-[#8ba3c0]">
                            {info.titulo}
                          </p>
                          <p className="mt-1 text-white font-medium">
                            {info.valor}
                          </p>
                        </div>
                      </motion.div>
                    )
                    return info.href ? (
                      <a key={info.titulo} href={info.href} className="block hover:opacity-80 transition-opacity">
                        {content}
                      </a>
                    ) : (
                      <div key={info.titulo}>{content}</div>
                    )
                  })}
                </div>

                {/* Redes Sociais */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(3) }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#8ba3c0] mb-4">
                    Redes Sociais
                  </p>
                  <div className="flex items-center gap-3">
                    {redes.map((rede) => (
                      <a
                        key={rede.label}
                        href={rede.href}
                        aria-label={rede.label}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1e3a5f]/60 bg-[#0d1f3c]/60 text-[#8ba3c0] transition-all duration-300 hover:border-[#00e5ff]/40 hover:text-[#00e5ff]"
                      >
                        <rede.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Mapa placeholder */}
                <motion.div
                  className="rounded-2xl overflow-hidden border border-[#1e3a5f]/40"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={fadeUpVariants}
                  transition={{ ...scrollTransition, delay: staggerDelay(4) }}
                >
                  <div className="h-48 bg-gradient-to-br from-[#1e3a5f]/30 to-[#0a1628] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-[#00e5ff]/30 mx-auto mb-2" />
                      <span className="text-sm text-[#8ba3c0]/60">
                        Mapa em breve
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
