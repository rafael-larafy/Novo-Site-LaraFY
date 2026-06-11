"use client"

import { useRef } from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { MetaLabel, HudGrid } from "@/components/ui/editorial"

const WORDS: { text: string; hl?: boolean }[] = [
  { text: "Não" },
  { text: "trabalhamos" },
  { text: "com" },
  { text: "achismos." },
  { text: "Cada" },
  { text: "real" },
  { text: "que" },
  { text: "você" },
  { text: "economiza" },
  { text: "nasce" },
  { text: "de" },
  { text: "dados,", hl: true },
  { text: "método", hl: true },
  { text: "e" },
  { text: "precisão", hl: true },
  { text: "cirúrgica.", hl: true },
]

export function StatementSection () {
  const sectionRef = useRef <HTMLElement> (null)
  const pinRef = useRef <HTMLDivElement> (null)
  const wordsRef = useRef <(HTMLSpanElement | null)[]>([])
  const progRef = useRef <HTMLSpanElement> (null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const pin = pinRef.current
      const words = wordsRef.current.filter(Boolean) as HTMLSpanElement []
      if (!section || !pin || !words.length) return

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) {
        gsap.set(words, {opacity: 1})
        if (progRef.current) progRef.current.textContent = "100"
        return
      }

      gsap.set(words, {opacity:0.16})

      gsap.timeline ({
        scrollTrigger: {
          start: "top top",
          end: "+=130%",
          scrub: true ,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progRef.current){
              progRef.current.textContent = String(
                Math.round(self.progress * 100)
              ).padStart(3, "0")
            }
          },
        },
      }).to(words, {
        opacity:1,
        ease:"none",
        stagger: 0.055,
      })

      ScrollTrigger.refresh()
    },
    {scope: sectionRef}
  )

  return(
    <section ref={sectionRef} className="relative bg-[#04101f]">
      <div ref={pinRef} className="relative flex min-h-screen items-center overflow-hhidden">
        <HudGrid/>
        <div className=" relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <div className="mb-8 flex items-center justify-between border-t hairline pt-6">
            <MetaLabel className="text-[#00e5ff]">09 - O método LaraFY</MetaLabel>
            <MetaLabel className="text-[#5f86a6]"><span ref={progRef}>000</span> /100 </MetaLabel>
          </div>

          <p className="font-display text-[clamp(1.75rem,5vw,5rem)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-white text-balance">
            {WORDS.map ((w,i) =>(
              <span key ={i} ref={(el) => {
                wordsRef.current[i] = el}}
              className={cn(w.hl && "text-[#00e5ff]")}>
                {w.text}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}