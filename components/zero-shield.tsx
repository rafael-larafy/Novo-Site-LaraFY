"use client"

import { motion, useReducedMotion, type Transition } from "framer-motion"
import { ringNodes, arcPath } from "@/lib/constellation"

const SAT = ringNodes(6, { r: 40 })


export function ZeroShield({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion()
  const ease: Transition["ease"] = "easeInOut"

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[440px] ${className}`}>
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="zeroGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.85" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx={50}
          cy={50}
          r={30}
          fill="none"
          stroke="#00cffa"
          strokeWidth={0.5}
          strokeDasharray="3 4"
          filter="url(#zeroGlow)"
          animate={reduce ? { opacity: 0.45, strokeDashoffset: 0 } : { opacity: [0.45, 0.7, 0.45], strokeDashoffset: [0, -28] }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  opacity: { duration: 4, repeat: Infinity, repeatType: "mirror", ease },
                  strokeDashoffset: { duration: 8, repeat: Infinity, ease: "linear" },
                }
          }
        />

        {SAT.map((n, i) => {
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
                filter="url(#zeroGlow)"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={reduce ? { pathLength: 1, opacity: 0.4 } : { pathLength: 1, opacity: [0.25, 0.5, 0.25] }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        pathLength: { duration: 0.9, delay: 0.4 + i * 0.1, ease },
                        opacity: { duration: 3, delay: 1.1 + i * 0.12, repeat: Infinity, repeatType: "mirror", ease },
                      }
                }
              />
              {!reduce && (
                <circle r={0.8} fill="#ffffff" filter="url(#zeroGlow)">
                  <animateMotion dur={`${3.2 + i * 0.3}s`} begin={`${1 + i * 0.4}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          )
        })}

        {SAT.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={1.3}
            fill="#3fe0ff"
            filter="url(#zeroGlow)"
            animate={reduce ? { opacity: 0.7 } : { opacity: [0.6, 0.95, 0.6] }}
            transition={reduce ? { duration: 0 } : { duration: 2.6 + (i % 3) * 0.4, repeat: Infinity, repeatType: "mirror", ease, delay: i * 0.3 }}
          />
        ))}
      </svg>

      <div className="absolute inset-[30%] flex flex-col items-center justify-center rounded-full bg-[#071a2e]/85 text-center shadow-[0_0_36px_rgba(0,229,255,0.3)] ring-1 ring-[#00e5ff]/40">
        <span className="text-3xl font-black uppercase leading-none tracking-tight text-white lg:text-4xl">Zero</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#00e5ff]">Risco</span>
      </div>
    </div>
  )
}
