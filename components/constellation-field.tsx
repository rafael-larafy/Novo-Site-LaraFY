"use client"

import { useMemo } from "react"
import { motion, useReducedMotion, type Transition } from "framer-motion"
import { ringNodes, arcPath } from "@/lib/constellation"

export function ConstellationField({
  className = "",
  count = 6,
  radius = 34,
  travelers = true,
  preserveAspectRatio = "xMidYMid meet",
}: {
  className?: string
  count?: number
  radius?: number
  travelers?: boolean
  preserveAspectRatio?: string
}) {
  const reduce = useReducedMotion()
  const ease: Transition["ease"] = "easeInOut"
  const arcs = useMemo(() => {
    const nodes = ringNodes(count, { r: radius })
    return nodes.map((n, i) => ({ n, d: arcPath({ x: 50, y: 50 }, n, i % 2 === 0 ? 6 : -6) }))
  }, [count, radius])

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio={preserveAspectRatio} aria-hidden="true" className={className}>
      <defs>
        <filter id="lfyFieldGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {arcs.map(({ d }, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#00e5ff" strokeWidth={0.3} opacity={0.16} />
          <motion.path
            d={d}
            fill="none"
            stroke="#00cffa"
            strokeWidth={0.45}
            strokeLinecap="round"
            filter="url(#lfyFieldGlow)"
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
          {travelers && !reduce && (
            <circle r={0.7} fill="#9af2ff" filter="url(#lfyFieldGlow)">
              <animateMotion dur={`${3.2 + i * 0.3}s`} begin={`${1 + i * 0.4}s`} repeatCount="indefinite" path={d} />
            </circle>
          )}
        </g>
      ))}

      {arcs.map(({ n }, i) => (
        <motion.circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r={1.3}
          fill="#3fe0ff"
          filter="url(#lfyFieldGlow)"
          animate={reduce ? { opacity: 0.7 } : { opacity: [0.6, 0.95, 0.6] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 2.6 + (i % 3) * 0.4, repeat: Infinity, repeatType: "mirror", ease, delay: i * 0.3 }
          }
        />
      ))}

      <circle cx={50} cy={50} r={2.4} fill="#00e5ff" filter="url(#lfyFieldGlow)" />
    </svg>
  )
}
