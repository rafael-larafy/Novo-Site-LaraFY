"use client"

import { useMemo } from "react"
import { motion, useReducedMotion, type Transition } from "framer-motion"
import {
  ScanSearch,
  Recycle,
  ShieldCheck,
  Compass,
  Cpu,
  Radar,
  type LucideIcon,
} from "lucide-react"

type EcoNode = { label: string; icon: LucideIcon }

const NODES: EcoNode[] = [
  { label: "Diagnóstico Tributário", icon: ScanSearch },
  { label: "Recuperação de Créditos", icon: Recycle },
  { label: "Compliance Fiscal", icon: ShieldCheck },
  { label: "Consultoria Estratégica", icon: Compass },
  { label: "Plataforma & Tecnologia", icon: Cpu },
  { label: "Monitoramento Contínuo", icon: Radar },
]

const CENTER = 50
const RADIUS = 36
const START_DEG = -90
const OFFSET_DEG = 20
const BEND = 7
const CORE_GAP = 11
const NODE_GAP = 8

type Placed = EcoNode & {
  x: number
  y: number
  dirX: number
  dirY: number
  d: string
}

function placeNodes(nodes: EcoNode[]): Placed[] {
  const n = nodes.length
  return nodes.map((node, i) => {
    const deg = START_DEG + OFFSET_DEG + (i * 360) / n
    const rad = (deg * Math.PI) / 180
    const ux = Math.cos(rad)
    const uy = Math.sin(rad)
    const x = CENTER + RADIUS * ux
    const y = CENTER + RADIUS * uy
    const hx = CENTER + CORE_GAP * ux
    const hy = CENTER + CORE_GAP * uy
    const ax = CENTER + (RADIUS - NODE_GAP) * ux
    const ay = CENTER + (RADIUS - NODE_GAP) * uy
    const mx = (hx + ax) / 2
    const my = (hy + ay) / 2
    const sign = i % 2 === 0 ? 1 : -1
    const cx = mx + -uy * BEND * sign
    const cy = my + ux * BEND * sign
    const d = `M ${hx} ${hy} Q ${cx} ${cy} ${ax} ${ay}`
    return { ...node, x, y, dirX: ux, dirY: uy, d }
  })
}

export function EcosystemConstellation({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion()
  const placed = useMemo(() => placeNodes(NODES), [])
  const ease: Transition["ease"] = "easeInOut"

  return (
    <div className={`relative mx-auto w-full max-w-[460px] lg:max-w-[560px] ${className}`}>
      <div className="relative hidden aspect-square w-full lg:block">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        >
          <defs>
            <filter id="lfyEcoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.9" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {placed.map((p, i) => (
            <g key={p.label}>
              <path
                d={p.d}
                fill="none"
                stroke="#00e5ff"
                strokeWidth={0.4}
                strokeLinecap="round"
                opacity={0.18}
              />
              <motion.path
                d={p.d}
                fill="none"
                stroke="#00cffa"
                strokeWidth={0.55}
                strokeLinecap="round"
                filter="url(#lfyEcoGlow)"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={
                  reduce
                    ? { pathLength: 1, opacity: 0.55 }
                    : { pathLength: 1, opacity: [0.4, 0.7, 0.4] }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        pathLength: { duration: 0.7, delay: 0.6 + i * 0.12, ease },
                        opacity: {
                          duration: 2.6,
                          delay: 1.3 + i * 0.12,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease,
                        },
                      }
                }
              />
              {!reduce && (
                <circle r={0.9} fill="#ffffff" filter="url(#lfyEcoGlow)">
                  <animateMotion
                    dur="3.2s"
                    begin={`${1.3 + i * 0.5}s`}
                    repeatCount="indefinite"
                    path={p.d}
                  />
                </circle>
              )}
            </g>
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 z-30 h-[clamp(84px,18%,108px)] w-[clamp(84px,18%,108px)] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#071a2e]/85 text-center shadow-[0_0_28px_rgba(0,229,255,0.35)] ring-1 ring-[#00e5ff]/40"
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            animate={
              reduce
                ? { scale: 1, opacity: 1 }
                : {
                    scale: 1,
                    opacity: 1,
                    boxShadow: [
                      "0 0 24px rgba(0,229,255,0.30)",
                      "0 0 44px rgba(0,229,255,0.55)",
                      "0 0 24px rgba(0,229,255,0.30)",
                    ],
                  }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    scale: { duration: 0.45, delay: 0.45 },
                    opacity: { duration: 0.45, delay: 0.45 },
                    boxShadow: { duration: 4, repeat: Infinity, repeatType: "mirror", ease },
                  }
            }
          >
            <span className="text-base font-black uppercase tracking-wide text-white">Larafy</span>
            <span className="text-[9px] font-semibold uppercase tracking-widest text-[#00e5ff]">
              Ecossistema
            </span>
          </motion.div>
        </div>

        {placed.map((p, i) => {
          const Icon = p.icon
          return (
            <div
              key={p.label}
              className="absolute z-20 w-[124px] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.div
                className="flex flex-col items-center gap-1.5 text-center"
                initial={
                  reduce ? false : { opacity: 0, scale: 0.7, x: p.dirX * 18, y: p.dirY * 18 }
                }
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.7 + i * 0.12, ease }}
              >
                <motion.span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071a2e]/80 shadow-[0_0_18px_rgba(0,229,255,0.22)] ring-1 ring-[#00e5ff]/30"
                  animate={reduce ? undefined : { y: [0, -4, 0] }}
                  transition={
                    reduce
                      ? undefined
                      : {
                          duration: 5 + (i % 3),
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease,
                          delay: i * 0.4,
                        }
                  }
                >
                  <Icon className="h-5 w-5 text-[#9af2ff]" aria-hidden="true" />
                </motion.span>
                <span className="text-[11px] font-semibold uppercase leading-tight tracking-wide text-balance text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                  {p.label}
                </span>
              </motion.div>
            </div>
          )
        })}
      </div>

      <ul className="flex flex-col gap-2.5 lg:hidden">
        <li className="flex items-center gap-3 rounded-2xl bg-[#071a2e]/85 px-4 py-3 ring-1 ring-[#00e5ff]/45">
          <span className="text-base font-black uppercase tracking-wide text-white">Larafy</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#00e5ff]">
            Ecossistema
          </span>
        </li>
        {NODES.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className="ml-4 flex items-center gap-3 rounded-2xl border-l-2 border-[#00e5ff]/40 bg-[#071a2e]/70 px-4 py-3 ring-1 ring-[#00e5ff]/20"
          >
            <Icon className="h-5 w-5 shrink-0 text-[#9af2ff]" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide text-white/90">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
