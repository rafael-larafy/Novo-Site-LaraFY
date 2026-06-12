"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"
import { useInView } from "@/hooks/use-in-view"
import { MetaLabel } from "@/components/ui/editorial"

const YEARS = ["26", "27", "28", "29", "30", "31", "32", "33"] as const
const SETOR_RATES = { industria: 0.222, comercio: 0.182, servicos: 0.158 } as const

type Regime = "real" | "presumido"
type Setor = keyof typeof SETOR_RATES
type Foco = "larafy" | "recup"
type SimData = { market: number[]; lara: number[]; max: number; total: number }

function computeData(regime: Regime, setor: Setor, fat: number, foco: Foco): SimData {
  const fatR = fat * 1e6
  const base = SETOR_RATES[setor] * (regime === "presumido" ? 0.92 : 1)
  const depth = foco === "larafy" ? 1 : 0.55
  const market: number[] = []
  const lara: number[] = []
  for (let i = 0; i < YEARS.length; i++) {
    const carga = fatR * base
    const ramp = 0.05 + (i / (YEARS.length - 1)) * 0.17
    const saved = carga * ramp * depth
    market.push(carga)
    lara.push(carga - saved)
  }
  const total = market.reduce((acc, m, i) => acc + (m - lara[i]), 0)
  return { market, lara, max: Math.max(...market), total }
}

function money(v: number): string {
  if (v >= 1e6) return "R$ " + (v / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + " mi"
  return "R$ " + Math.round(v / 1e3).toLocaleString("pt-BR") + " mil"
}

const Y0 = -3.1 // base das barras
const MAXH = 5.6 // altura máxima (mundo) p/ a maior carga

function Bars({
  dataRef,
  pointer,
  reduce,
}: {
  dataRef: React.RefObject<SimData>
  pointer: React.RefObject<{ x: number }>
  reduce: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const marketRefs = useRef<THREE.Mesh[]>([])
  const laraRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    const d = dataRef.current
    if (!d) return
    const k = reduce ? 1 : 0.12
    for (let i = 0; i < YEARS.length; i++) {
      const tm = Math.max(0.001, (d.market[i] / d.max) * MAXH)
      const tl = Math.max(0.001, (d.lara[i] / d.max) * MAXH)
      const m = marketRefs.current[i]
      const l = laraRefs.current[i]
      if (m) {
        m.scale.y += (tm - m.scale.y) * k
        m.position.y = Y0 + m.scale.y / 2
      }
      if (l) {
        l.scale.y += (tl - l.scale.y) * k
        l.position.y = Y0 + l.scale.y / 2
      }
    }
    const g = group.current
    if (g) {
      if (reduce) {
        g.rotation.set(0.06, 0, 0)
      } else {
        const target = pointer.current.x * 0.3
        g.rotation.y += (target - g.rotation.y) * 0.06
        g.rotation.x = 0.06 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02
      }
    }
  })

  return (
    <group ref={group} rotation={[0.06, 0, 0]}>
      {YEARS.map((y, i) => {
        const x = (i - (YEARS.length - 1) / 2) * 1.5
        return (
          <group key={y} position={[x, 0, 0]}>
            
            <mesh
              ref={(el) => {
                if (el) marketRefs.current[i] = el
              }}
              position={[-0.34, Y0, 0]}
              scale={[1, 0.001, 1]}
            >
              <boxGeometry args={[0.5, 1, 0.5]} />
              <meshStandardMaterial color="#1f3a57" roughness={0.6} metalness={0.1} transparent opacity={0.85} />
            </mesh>
            
            <mesh
              ref={(el) => {
                if (el) laraRefs.current[i] = el
              }}
              position={[0.34, Y0, 0]}
              scale={[1, 0.001, 1]}
            >
              <boxGeometry args={[0.5, 1, 0.5]} />
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.55} roughness={0.3} metalness={0.2} />
            </mesh>
          </group>
        )
      })}
      
      <mesh position={[0, Y0 - 0.06, 0]}>
        <boxGeometry args={[YEARS.length * 1.5 + 0.4, 0.05, 0.7]} />
        <meshStandardMaterial color="#0a1f33" roughness={0.8} />
      </mesh>
    </group>
  )
}

const SEG_BASE =
  "flex-1 min-w-[84px] cursor-pointer rounded-lg border px-3 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wide transition-[background-color,border-color,color]"

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { v: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div>
      <span className="mb-2.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f86a6]">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o.v === value
          return (
            <button
              key={o.v}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.v)}
              className={`${SEG_BASE} ${
                on
                  ? "border-[#00e5ff] bg-[#00e5ff]/15 text-white"
                  : "border-[#1e3a5f] bg-[#0a1f33] text-white/60 hover:border-[#00e5ff]/40 hover:text-white"
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ReformSimulator() {
  const reduce = useReducedMotion() ?? false
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>("160px")

  const [regime, setRegime] = useState<Regime>("real")
  const [setor, setSetor] = useState<Setor>("industria")
  const [fat, setFat] = useState(60)
  const [foco, setFoco] = useState<Foco>("larafy")

  const data = useMemo(() => computeData(regime, setor, fat, foco), [regime, setor, fat, foco])
  const dataRef = useRef<SimData>(data)
  dataRef.current = data

  const pointer = useRef({ x: 0 })
  const totalRef = useRef<HTMLDivElement>(null)
  const shownRef = useRef(0)

  // anima o total exibido (ref + RAF) ao mudar de cenário, sem re-render da seção
  useEffect(() => {
    const node = totalRef.current
    if (!node) return
    if (reduce) {
      shownRef.current = data.total
      node.textContent = money(data.total)
      return
    }
    const from = shownRef.current
    const to = data.total
    let raf = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now
      const p = Math.min(1, (now - start) / 520)
      const e = 1 - Math.pow(1 - p, 3)
      const v = from + (to - from) * e
      node.textContent = money(v)
      if (p < 1) raf = requestAnimationFrame(tick)
      else shownRef.current = to
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [data.total, reduce])

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
  }

  return (
    <div ref={inViewRef} className="grid items-stretch gap-5 lg:grid-cols-[0.92fr_1.08fr]">
      
      <div className="rounded-2xl border hairline bg-[#061425]/70 p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <Segmented
            label="Regime tributário"
            value={regime}
            onChange={setRegime}
            options={[
              { v: "real", label: "Lucro Real" },
              { v: "presumido", label: "Presumido" },
            ]}
          />
          <Segmented
            label="Setor"
            value={setor}
            onChange={setSetor}
            options={[
              { v: "industria", label: "Indústria" },
              { v: "comercio", label: "Comércio" },
              { v: "servicos", label: "Serviços" },
            ]}
          />
          <div>
            <span className="mb-2.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f86a6]">
              Faturamento anual
            </span>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={fat}
                onChange={(e) => setFat(+e.target.value)}
                aria-label="Faturamento anual em milhões de reais"
                className="sim-range h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#0d2238] outline-none"
              />
              <span className="min-w-[96px] text-right font-display text-base font-bold tabular-nums text-white">
                R$ {fat} mi
              </span>
            </div>
          </div>
          <Segmented
            label="Abordagem"
            value={foco}
            onChange={setFoco}
            options={[
              { v: "larafy", label: "Estudo LaraFy" },
              { v: "recup", label: "Só recuperação" },
            ]}
          />
        </div>
      </div>

      
      <div className="relative flex flex-col overflow-hidden rounded-2xl border hairline bg-gradient-to-b from-[#072032] to-[#04101f] p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <MetaLabel>Ganho projetado com o estudo</MetaLabel>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00e5ff]">
            <span className={`h-1.5 w-1.5 rounded-full bg-[#00e5ff] ${reduce ? "" : "animate-pulse"}`} />
            ao vivo
          </span>
        </div>
        <div ref={totalRef} className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.03em] text-[#00e5ff] tabular-nums">
          R$ 0
        </div>
        <p className="mt-2 text-sm text-white/55">otimização acumulada estimada na transição (2026–2033)</p>

        <div
          onPointerMove={onPointerMove}
          className="relative mt-5 h-[220px] w-full sm:h-[240px]"
          aria-hidden
        >
          <Canvas
            dpr={[1, 1.8]}
            camera={{ position: [0, 1.6, 11], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            frameloop={inView ? "always" : "demand"}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 9, 6]} intensity={0.8} />
            <pointLight position={[0, 1, 4]} intensity={28} color="#00e5ff" distance={16} />
            <Bars dataRef={dataRef} pointer={pointer} reduce={reduce} />
          </Canvas>
        </div>

        
        <div className="mt-1 flex justify-between px-1 font-mono text-[10px] text-white/40">
          {YEARS.map((y) => (
            <span key={y}>&apos;{y}</span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/55">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#1f3a57]" />
            Sem estudo (achismo)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#00e5ff]" />
            Com LaraFy (dado real)
          </span>
        </div>
        <p className="mt-3 text-xs text-white/40">
          Prévia ilustrativa. O número real vem da apuração efetiva levantada no diagnóstico.
        </p>
      </div>
    </div>
  )
}
