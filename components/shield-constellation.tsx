"use client"

import { motion, useReducedMotion, type Transition } from "framer-motion"
import { ringNodes, arcPath } from "@/lib/constellation"

const NODES = ringNodes(4, { r: 36, startDeg: -90 })

export function ShieldConstellation({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion()
  const ease: Transition["ease"] = "easeInOut"

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="shieldGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {NODES.map((n, i) => {
        const d = arcPath({ x: 50, y: 50 }, n, i % 2 === 0 ? 7 : -7)
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="#00e5ff" strokeWidth={0.3} opacity={0.16} />
            <motion.path
              d={d}
              fill="none"
              stroke="#00cffa"
              strokeWidth={0.5}
              strokeLinecap="round"
              filter="url(#shieldGlow)"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={reduce ? { pathLength: 1, opacity: 0.45 } : { pathLength: 1, opacity: [0.3, 0.55, 0.3] }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      pathLength: { duration: 0.9, delay: 0.4 + i * 0.12, ease },
                      opacity: { duration: 3, delay: 1.2 + i * 0.12, repeat: Infinity, repeatType: "mirror", ease },
                    }
              }
            />
            {!reduce && (
              <circle r={0.8} fill="#9af2ff" filter="url(#shieldGlow)">
                <animateMotion dur={`${3 + i * 0.4}s`} begin={`${1.2 + i * 0.5}s`} repeatCount="indefinite" path={d} />
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
          r={1.5}
          fill="#3fe0ff"
          filter="url(#shieldGlow)"
          animate={reduce ? { opacity: 0.75 } : { opacity: [0.6, 0.95, 0.6] }}
          transition={reduce ? { duration: 0 } : { duration: 2.6 + (i % 3) * 0.4, repeat: Infinity, repeatType: "mirror", ease, delay: i * 0.3 }}
        />
      ))}

      <motion.g
        filter="url(#shieldGlow)"
        animate={reduce ? { opacity: 0.9 } : { opacity: [0.7, 1, 0.7] }}
        transition={reduce ? { duration: 0 } : { duration: 4, repeat: Infinity, repeatType: "mirror", ease }}
      >
        <path
          d="M50 37 L61 42 L61 52 C61 60 50 66 50 66 C50 66 39 60 39 52 L39 42 Z"
          fill="rgba(0,229,255,0.06)"
          stroke="#00e5ff"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <path
          d="M45 51.5 L48.8 55 L55 47.5"
          fill="none"
          stroke="#9af2ff"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  )
}
