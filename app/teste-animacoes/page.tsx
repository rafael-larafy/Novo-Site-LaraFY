"use client"

import Image from "next/image"
import { SplitReveal } from "@/components/split-reveal"
import Link from "next/link"
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react"
import { ArrowUpRight, Play } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { HomeAnimations } from "@/components/sections/home-animations"
import WaldirImg from "../../lib/Waldir.png"
import PessoaImg from "../../lib/Pessoa-preocupada.png"
import BrasilImg from "../../lib/Brasil.png"

/* ----------------------- Tilt wrapper (revnuyu BentoTilt) ---------------------- */
function BentoTilt({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const [transformStyle, setTransformStyle] = useState("")
  const itemRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return
    const { left, top, width, height } = itemRef.current.getBoundingClientRect()
    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height
    const tiltX = (relativeY - 0.5) * 6
    const tiltY = (relativeX - 0.5) * -6
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.97, .97, .97)`
    )
  }

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle("")}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

/* ----------------------- Animated Pill Button (revnuyu Button) ---------------------- */
function PillButton({
  title,
  leftIcon,
  className = "",
  onClick,
}: {
  title: string
  leftIcon?: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative z-10 inline-flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-[#edff66] px-7 py-3 text-black ${className}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden text-xs font-semibold uppercase tracking-[0.18em]">
        <span className="block translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[160%] group-hover:skew-y-12">
          {title}
        </span>
        <span className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </span>
      </span>
    </button>
  )
}

/* ----------------------- Floating image with mouse-tilt (Story) ---------------------- */
function FloatingImage({ src, alt }: { src: any; alt: string }) {
  const frameRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const xPos = e.clientX - rect.left
    const yPos = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((yPos - centerY) / centerY) * -10
    const rotateY = ((xPos - centerX) / centerX) * 10
    gsap.to(el, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    })
  }

  const handleMouseLeave = () => {
    if (frameRef.current) {
      gsap.to(frameRef.current, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      })
    }
  }

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseLeave}
      onMouseEnter={handleMouseLeave}
      className="relative h-full w-full"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

/* ============================================ PAGE ============================================ */

export default function TesteAnimacoes() {
  const heroFrameRef = useRef<HTMLDivElement | null>(null)
  const aboutClipRef = useRef<HTMLDivElement | null>(null)
  const aboutImageRef = useRef<HTMLDivElement | null>(null)

  /* Hero clip-path morph on scroll (revnuyu) */
  useEffect(() => {
    const target = heroFrameRef.current
    if (!target) return
    const ctx = gsap.context(() => {
      gsap.set(target, {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      })
      gsap.from(target, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: target,
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  /* About — grow image as user scrolls past it */
  useEffect(() => {
    if (!aboutClipRef.current || !aboutImageRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(aboutImageRef.current, {
        width: "92vw",
        height: "85vh",
        borderRadius: "12px",
        scrollTrigger: {
          trigger: aboutClipRef.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 0.6,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <HomeAnimations />

      {/* Local nav (zentry-style) */}
      <nav className="fixed top-4 left-1/2 z-[120] -translate-x-1/2 rounded-2xl border border-black/10 bg-black/85 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#dfdff0]">
          <span className="font-black tracking-wider text-[#edff66]">LARAFY</span>
          <a href="#about" className="hover:text-[#edff66] transition">Método</a>
          <a href="#features" className="hover:text-[#edff66] transition">Soluções</a>
          <a href="#story" className="hover:text-[#edff66] transition">CEO</a>
          <a href="#contact" className="hover:text-[#edff66] transition">Contato</a>
          <Link href="/" className="rounded-full border border-white/30 px-3 py-1 text-[10px] hover:bg-white/10">
            ← Home
          </Link>
        </div>
      </nav>

      <main className="relative min-h-screen w-screen overflow-x-hidden rev-bg">
        {/* ============================== HERO ============================== */}
        <section className="relative h-[100dvh] w-screen overflow-x-hidden">
          <div
            ref={heroFrameRef}
            className="relative z-10 h-[100dvh] w-screen overflow-hidden rounded-lg bg-[#012e43]"
          >
            {/* Background "video" (here, looping site video as bg) */}
            <video
              src="/Site Larafy animations.webm"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#012e43] via-[#0a1628]/60 to-black/80" />

            {/* Center preview card */}
            <div className="group absolute left-1/2 top-1/2 z-50 size-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur transition-transform duration-500 hover:scale-110">
              <div className="relative size-full">
                <Image
                  src="/Tablet-mockup.png"
                  alt="LaraTAX preview"
                  fill
                  className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edff66] text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-5 w-5" fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="absolute left-0 top-0 z-40 size-full">
              <div className="mt-28 px-6 sm:px-12 lg:mt-32 lg:px-16">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#edff66]">
                  consultoria tributária
                </p>
                <h1 className="rev-hero-heading rev-special-font text-[#dfdff0]">
                  imp<b>o</b>stos
                </h1>

                <p className="mb-6 mt-3 max-w-md text-sm text-[#dfdff0]/80 sm:text-base">
                  Zero risco. Tecnologia exclusiva, decisão tributária estratégica
                  e milhões em lucro recuperados.
                </p>

                <PillButton title="Quero diagnóstico" leftIcon={<ArrowUpRight className="h-4 w-4" />} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================== ABOUT ============================== */}
        <section id="about" className="min-h-screen w-screen">
          <div className="mt-36 flex flex-col items-center gap-6 px-6 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-black/60">
              tributo não é despesa
            </p>

            <SplitReveal as="h2"
              className="rev-special-font text-5xl font-black uppercase leading-[0.85] text-black sm:text-7xl md:text-[6rem]"
            >
              Estr<b>a</b>tégia<br />tribut<b>á</b>ria
            </SplitReveal>

            <div className="mt-6 max-w-md text-base md:max-w-[34rem] md:text-lg">
              <p className="text-black">
                Cada decisão tributária pode somar — ou destruir — milhões
                ao longo de um ano.
              </p>
              <p className="mt-3 text-black/50">
                A LaraFy combina inteligência humana e automação para
                transformar carga tributária em vantagem competitiva
                mensurável.
              </p>
            </div>
          </div>

          <div ref={aboutClipRef} className="relative mt-20 flex h-[100dvh] w-screen items-start justify-center">
            <div
              ref={aboutImageRef}
              className="relative h-[60vh] w-96 overflow-hidden rounded-3xl md:w-[30vw]"
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src="/Tablet-mockup.png"
                alt="Plataforma LaraTAX"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* ============================== FEATURES (BENTO) ============================== */}
        <section id="features" className="bg-black pb-52">
          <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32">
              <p className="text-lg text-[#dfdff0]">Soluções LaraFy.</p>
              <p className="max-w-md text-lg text-[#dfdff0]/50">
                Cinco frentes de atuação que blindam o seu negócio em todos
                os cenários tributários e maximizam o lucro recuperável.
              </p>
            </div>

            {/* Hero bento card */}
            <BentoTilt className="rev-bento-tilt-1 mb-7 h-96 w-full md:h-[65vh]">
              <div className="relative size-full">
                <Image
                  src={BrasilImg}
                  alt="Reforma tributária"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#012e43]/90 via-black/70 to-black" />
                <div className="relative z-10 flex size-full flex-col justify-between p-7 text-[#dfdff0]">
                  <div>
                    <h3 className="rev-bento-title rev-special-font">
                      ref<b>o</b>rma
                    </h3>
                    <p className="mt-3 max-w-sm text-xs md:text-base">
                      A reforma tributária não é um evento isolado — é um
                      processo. Estrutura técnica para preparar sua empresa
                      antes que ela seja afetada.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1 rounded-full border border-white/20 bg-black px-5 py-2 text-xs uppercase text-white/40">
                    <ArrowUpRight className="h-3 w-3" />
                    Em destaque
                  </span>
                </div>
              </div>
            </BentoTilt>

            <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
              <BentoTilt className="rev-bento-tilt-1 row-span-1 md:col-span-1 md:row-span-2">
                <div className="relative size-full bg-gradient-to-br from-[#00e5ff]/30 via-[#012e43] to-black">
                  <div className="relative z-10 flex size-full flex-col justify-between p-7 text-[#dfdff0]">
                    <div>
                      <h3 className="rev-bento-title rev-special-font">
                        diag<b>n</b>óstico
                      </h3>
                      <p className="mt-3 max-w-64 text-xs md:text-base">
                        Mapeamento técnico das oportunidades e riscos
                        tributários da operação.
                      </p>
                    </div>
                  </div>
                </div>
              </BentoTilt>

              <BentoTilt className="rev-bento-tilt-1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                <div className="relative size-full bg-gradient-to-br from-[#edff66]/20 via-[#0a1628] to-black">
                  <Image
                    src={PessoaImg}
                    alt="Blindagem"
                    fill
                    className="object-cover opacity-30"
                  />
                  <div className="relative z-10 flex size-full flex-col justify-between p-7 text-[#dfdff0]">
                    <div>
                      <h3 className="rev-bento-title rev-special-font">
                        blin<b>d</b>agem
                      </h3>
                      <p className="mt-3 max-w-64 text-xs md:text-base">
                        Estrutura jurídica defensiva contra autuações,
                        litígios e mudanças de regime.
                      </p>
                    </div>
                  </div>
                </div>
              </BentoTilt>

              <BentoTilt className="rev-bento-tilt-1 me-14 md:col-span-1 md:me-0">
                <div className="relative size-full bg-gradient-to-br from-[#5724ff]/40 via-[#0a1628] to-black">
                  <div className="relative z-10 flex size-full flex-col justify-between p-7 text-[#dfdff0]">
                    <div>
                      <h3 className="rev-bento-title rev-special-font">
                        recup<b>e</b>ração
                      </h3>
                      <p className="mt-3 max-w-64 text-xs md:text-base">
                        Identificação e recuperação de créditos tributários
                        pagos a maior nos últimos cinco anos.
                      </p>
                    </div>
                  </div>
                </div>
              </BentoTilt>

              <BentoTilt className="rev-bento-tilt-2">
                <div className="flex size-full flex-col justify-between bg-[#5724ff] p-7">
                  <h3 className="rev-bento-title rev-special-font max-w-64 text-black">
                    estr<b>a</b>tégia<br />sêni<b>o</b>r.
                  </h3>
                  <ArrowUpRight className="m-5 h-12 w-12 self-end text-black" strokeWidth={3} />
                </div>
              </BentoTilt>

              <BentoTilt className="rev-bento-tilt-2">
                <div className="relative size-full bg-[#012e43]">
                  <video
                    src="/Site Larafy animations.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="size-full object-cover"
                  />
                </div>
              </BentoTilt>
            </div>
          </div>
        </section>

        {/* ============================== STORY (FLOATING TILT) ============================== */}
        <section id="story" className="relative min-h-dvh w-screen overflow-hidden bg-black text-[#dfdff0]">
          <div className="flex size-full flex-col items-center py-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em]">
              founder & ceo
            </p>

            <SplitReveal as="h2"
              className="rev-special-font relative z-20 mt-5 px-6 text-center text-5xl font-black uppercase leading-[0.85] text-white sm:px-16 md:text-[6rem]"
            >
              Wal<b>d</b>ir<br />de l<b>a</b>ra
            </SplitReveal>

            <div className="relative mt-12 grid w-full max-w-6xl grid-cols-1 gap-12 px-8 md:grid-cols-2 md:items-center">
              {/* Floating tilt image with diagonal clip */}
              <div className="relative h-[60vh] w-full" style={{ perspective: "900px" }}>
                <div
                  className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#012e43] to-black"
                  style={{ clipPath: "polygon(4% 0, 96% 8%, 88% 100%, 0% 92%)" }}
                >
                  <FloatingImage src={WaldirImg} alt="Waldir de Lara - Founder & CEO" />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <p className="max-w-md text-base text-violet-100/80 md:text-lg">
                  &ldquo;A linha tênue entre o erro e o acerto está em como foi
                  analisado.&rdquo;
                </p>
                <p className="mt-4 max-w-md text-sm text-white/50">
                  Visão estratégica que orientou mais de R$ 1 bilhão em
                  decisões tributárias para empresas brasileiras.
                </p>
                <PillButton title="Conhecer a história" className="mt-8" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================== CONTACT (CLIP-PATH IMAGES) ============================== */}
        <section id="contact" className="my-20 w-screen px-4 sm:px-10">
          <div className="relative overflow-hidden rounded-2xl bg-black py-24 text-[#dfdff0]">
            {/* left side image with diagonal clip */}
            <div className="pointer-events-none absolute -left-10 top-0 hidden h-full w-64 sm:block lg:left-10 lg:w-80">
              <div
                className="relative h-full w-full"
                style={{ clipPath: "polygon(0 10%, 80% 0, 100% 90%, 10% 100%)" }}
              >
                <Image src={PessoaImg} alt="" fill className="object-cover opacity-40" />
              </div>
            </div>

            {/* right side image with different clip */}
            <div className="pointer-events-none absolute -right-10 top-10 hidden h-full w-64 sm:block lg:right-10 lg:w-80">
              <div
                className="relative h-3/4 w-full"
                style={{ clipPath: "polygon(20% 0, 100% 12%, 78% 100%, 0 88%)" }}
              >
                <Image src={BrasilImg} alt="" fill className="object-contain opacity-40" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="mb-10 text-[10px] uppercase tracking-[0.32em] text-[#edff66]">
                fale com a larafy
              </p>

              <SplitReveal as="h2"
                className="rev-special-font w-full px-4 text-5xl font-black uppercase leading-[0.85] text-[#dfdff0] sm:text-6xl md:text-[6rem]"
              >
                pront<b>o</b><br />para reduzir<br />imp<b>o</b>stos?
              </SplitReveal>

              <PillButton title="Diagnóstico gratuito" className="mt-10" />
            </div>
          </div>
        </section>

        {/* tiny footer */}
        <footer className="border-t border-black/10 bg-[#dfdff0] py-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs uppercase tracking-[0.2em] text-black/60">
            <span>© LaraFy · Sandbox de Design</span>
            <Link href="/" className="hover:text-black">
              ← Voltar para a Home
            </Link>
          </div>
        </footer>
      </main>
    </>
  )
}
