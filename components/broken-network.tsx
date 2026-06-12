"use client"

import { motion, useReducedMotion, type Transition } from "framer-motion"

const CORE = { x: 50, y: 50 }
const R = 46 // alcance do radar
const cosd = (d: number) => Math.cos((d * Math.PI) / 180)
const sind = (d: number) => Math.sin((d * Math.PI) / 180)

const TARGETS = [
  { deg: 40, r: 30, bend: 5 },
  { deg: 122, r: 39, bend: -6 },
  { deg: 210, r: 33, bend: 5 },
  { deg: 305, r: 41, bend: -6 },
].map((t) => {
  const x = 50 + t.r * cosd(t.deg)
  const y = 50 + t.r * sind(t.deg)
  const peak = t.deg / 360
  const dx = x - CORE.x
  const dy = y - CORE.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const ax = CORE.x + ux * 7
  const ay = CORE.y + uy * 7
  const bx = x - ux * 3
  const by = y - uy * 3
  const d = `M ${ax} ${ay} Q ${(ax + bx) / 2 - uy * t.bend} ${(ay + by) / 2 + ux * t.bend} ${bx} ${by}`
  return { x, y, peak, d }
})

const ORPHAN = { x: 87, y: 14 } // fora do alcance: nunca detectado

const SWEEP_D = `M 50 50 L ${50 + R * cosd(-50)} ${50 + R * sind(-50)} A ${R} ${R} 0 0 1 ${50 + R} 50 Z`

const TICKS = Array.from({ length: 12 }, (_, k) => {
  const a = k * 30
  return {
    x1: 50 + 43 * cosd(a),
    y1: 50 + 43 * sind(a),
    x2: 50 + 46 * cosd(a),
    y2: 50 + 46 * sind(a),
  }
})

function flash(peak: number) {
  const a = Math.max(0.001, peak - 0.05)
  const b = Math.min(0.999, peak + 0.13)
  return {
    keyTimes: `0;${a.toFixed(3)};${peak.toFixed(3)};${b.toFixed(3)};1`,
    values: "0.16;0.16;1;0.3;0.16",
  }
}

export function BrokenNetwork({
  className = "",
  fill = false,
  footerLeft,
  footerRight,
}: {
  className?: string
  fill?: boolean
  footerLeft?: string
  footerRight?: string | null
}) {
  const reduce = useReducedMotion()
  const ease: Transition["ease"] = "easeInOut"
  const showRight = footerRight !== null

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden rounded-2xl border border-[#1e3a5f] bg-[radial-gradient(circle_at_50%_50%,#0c2138_0%,#081627_62%,#060f1e_100%)] ${fill ? "h-full" : "aspect-square"} ${className}`}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="lfyRadarGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="lfySweep" cx="50" cy="50" r={R} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#00e5ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="#00e5ff" fill="none">
          <circle cx="50" cy="50" r="46" strokeWidth="0.35" opacity="0.28" />
          <circle cx="50" cy="50" r="32" strokeWidth="0.3" opacity="0.16" />
          <circle cx="50" cy="50" r="18" strokeWidth="0.3" opacity="0.16" />
          <line x1="50" y1="4" x2="50" y2="96" strokeWidth="0.25" opacity="0.12" />
          <line x1="4" y1="50" x2="96" y2="50" strokeWidth="0.25" opacity="0.12" />
          {TICKS.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth="0.4" opacity="0.22" />
          ))}
        </g>

        {TARGETS.map((t, i) => (
          <motion.path
            key={`arc-${i}`}
            d={t.d}
            fill="none"
            stroke="#00cffa"
            strokeWidth={0.5}
            strokeLinecap="round"
            filter="url(#lfyRadarGlow)"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={reduce ? { pathLength: 0.55, opacity: 0.28 } : { pathLength: [0, 0.55, 0.55], opacity: [0, 0.4, 0] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.8, delay: i * 0.5, repeat: Infinity, repeatDelay: 0.8, ease, times: [0, 0.5, 1] }
            }
          />
        ))}

        <g transform={reduce ? "rotate(-42 50 50)" : undefined}>
          {!reduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="7s"
              repeatCount="indefinite"
            />
          )}
          <path d={SWEEP_D} fill="url(#lfySweep)" />
          <line x1="50" y1="50" x2={50 + R} y2="50" stroke="#9af2ff" strokeWidth="0.5" opacity="0.7" filter="url(#lfyRadarGlow)" />
        </g>

        {TARGETS.map((t, i) => {
          const f = flash(t.peak)
          return (
            <g key={`blip-${i}`}>
              <circle cx={t.x} cy={t.y} r={2.6} fill="none" stroke="#3fe0ff" strokeWidth={0.3} opacity={reduce ? 0.25 : 0.16}>
                {!reduce && (
                  <animate attributeName="opacity" dur="7s" repeatCount="indefinite" keyTimes={f.keyTimes} values="0.1;0.1;0.6;0.2;0.1" />
                )}
              </circle>
              <circle cx={t.x} cy={t.y} r={1.4} fill="#3fe0ff" filter="url(#lfyRadarGlow)" opacity={reduce ? 0.4 : 0.16}>
                {!reduce && (
                  <animate attributeName="opacity" dur="7s" repeatCount="indefinite" keyTimes={f.keyTimes} values={f.values} />
                )}
              </circle>
            </g>
          )
        })}

        <circle cx={ORPHAN.x} cy={ORPHAN.y} r={2.2} fill="none" stroke="#1f6f8f" strokeWidth={0.35} strokeDasharray="1.4 1.6" opacity={0.3} />
        <circle cx={ORPHAN.x} cy={ORPHAN.y} r={0.9} fill="#1f6f8f" opacity={0.4} />

        <motion.circle
          cx={CORE.x}
          cy={CORE.y}
          r={6.5}
          fill="none"
          stroke="#00cffa"
          strokeWidth={0.5}
          strokeDasharray="3 4"
          filter="url(#lfyRadarGlow)"
          animate={reduce ? { opacity: 0.4, strokeDashoffset: 0 } : { opacity: [0.5, 0.22, 0.5], strokeDashoffset: [0, -28] }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  opacity: { duration: 4, repeat: Infinity, repeatType: "mirror", ease },
                  strokeDashoffset: { duration: 6, repeat: Infinity, ease: "linear" },
                }
          }
        />
        <motion.circle
          cx={CORE.x}
          cy={CORE.y}
          r={2.4}
          fill="#00e5ff"
          filter="url(#lfyRadarGlow)"
          animate={reduce ? { opacity: 0.5 } : { opacity: [0.7, 0.25, 0.6, 0.22] }}
          transition={reduce ? { duration: 0 } : { duration: 5, repeat: Infinity, repeatType: "mirror", ease }}
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(6,14,28,0.7)_100%)]" />

      <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5f86a6]">
        {footerLeft ?? (
          <>
            Sinal <span className="text-[#00e5ff]/70">18%</span>
            {!reduce && (
              <motion.span
                className="ml-1 inline-block text-[#00e5ff]/70"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              >
                _
              </motion.span>
            )}
          </>
        )}
      </div>
      {showRight && (
        <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5f86a6]">
          {footerRight ?? "Sem lock · 1/6"}
        </div>
      )}
    </div>
  )
}
