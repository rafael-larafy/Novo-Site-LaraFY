"use client"

import { motion, useReducedMotion, type Transition } from "framer-motion"
import Image from "next/image"
import WaldirImg from "@/lib/Waldir.png"
import { ringNodes, arcPath } from "@/lib/constellation"

const NODES = ringNodes(7, { r: 41 })

export function CeoPortrait({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion()
  const ease: Transition["ease"] = "easeInOut"

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[460px] ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(0,229,255,0.22),transparent_62%)] blur-2xl"
      />

      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="ceoGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {NODES.map((n, i) => {
          const d = arcPath({ x: 50, y: 50 }, n, i % 2 === 0 ? 6 : -6)
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="#00e5ff" strokeWidth={0.3} opacity={0.16} />
              <motion.path
                d={d}
                fill="none"
                stroke="#00cffa"
                strokeWidth={0.45}
                strokeLinecap="round"
                filter="url(#ceoGlow)"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={reduce ? { pathLength: 1, opacity: 0.4 } : { pathLength: 1, opacity: [0.25, 0.5, 0.25] }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        pathLength: { duration: 0.9, delay: 0.3 + i * 0.1, ease },
                        opacity: { duration: 3, delay: 1 + i * 0.12, repeat: Infinity, repeatType: "mirror", ease },
                      }
                }
              />
              {!reduce && (
                <circle r={0.7} fill="#9af2ff" filter="url(#ceoGlow)">
                  <animateMotion dur={`${3.2 + i * 0.3}s`} begin={`${1 + i * 0.4}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          )
        })}
        {NODES.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={1.3}
            fill="#3fe0ff"
            filter="url(#ceoGlow)"
            animate={reduce ? { opacity: 0.7 } : { opacity: [0.6, 0.95, 0.6] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.6 + (i % 3) * 0.4, repeat: Infinity, repeatType: "mirror", ease, delay: i * 0.3 }
            }
          />
        ))}
      </svg>

      <div className="absolute inset-[12%] overflow-hidden rounded-full bg-[#071a2e] ring-1 ring-[#00e5ff]/35 shadow-[0_0_40px_rgba(0,229,255,0.25)]">
        <Image
          src={WaldirImg}
          alt="Waldir de Lara — Founder e CEO da LaraFy"
          fill
          sizes="(max-width: 1024px) 80vw, 420px"
          className="object-cover object-top grayscale contrast-110"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/10 via-[#00cffa]/25 to-[#0a1628]/70 mix-blend-color" />
        <div aria-hidden className="absolute inset-0 bg-[#00e5ff]/12 mix-blend-screen" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a1628] to-transparent" />
      </div>

      <div aria-hidden className="absolute inset-[6%] rounded-full border border-dashed border-[#1f6f8f]/40" />
    </div>
  )
}
