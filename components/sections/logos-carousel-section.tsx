"use client"

import Image from "next/image"
import { Marquee } from "@/components/marquee"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionHeading } from "@/components/ui/section-heading"

const LOGOS = [
  { src: "/Luson.png", alt: "Luson" },
  { src: "/Pinfer.png", alt: "Pinfer" },
  { src: "/Zanette.png", alt: "Zanette" },
  { src: "/Calcario.png", alt: "Calcario" },
  { src: "/Kapazi.png", alt: "Kapazi" },
  { src: "/CargoSoft.png", alt: "Cargo Soft" },
]

export function LogosCarouselSection() {
  return (
    <SectionShell bg="dark" container={false} className="py-16 lg:py-20">
      <div className="mx-auto mb-10 max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Parceiros e clientes"
          title="Empresas que confiam na Larafy"
          align="center"
        />
      </div>

      <Marquee className="w-full" speed={32}>
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <div key={`${logo.alt}-${i}`} className="mx-3 flex items-center lg:mx-5">
            <div className="flex h-16 min-w-[150px] items-center justify-center rounded-2xl border border-[#1e3a5f] bg-[#071a2e]/70 px-6 ring-1 ring-[#00e5ff]/15 lg:h-24 lg:min-w-[200px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={188}
                height={80}
                sizes="(max-width: 1024px) 120px, 160px"
                className="h-7 w-auto object-contain opacity-80 brightness-0 invert lg:h-10"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </SectionShell>
  )
}
