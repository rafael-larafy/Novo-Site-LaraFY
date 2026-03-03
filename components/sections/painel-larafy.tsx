"use client"

import { useMemo, useState, useCallback } from "react"
import styles from "./painel-larafy.module.css"

const CX = 290
const CY = 290
const R = 280
const IR = 160
const GAP_DEG = 4
const SEG = 72
const OFF = -72

const COLORS = ["#1a3a5c", "#1a6b7c", "#22b8c9", "#4a6680", "#132a45"]
const HCOLORS = ["#2a5a8c", "#2a8b9c", "#3ce0f2", "#6a8aa0", "#1a3a5c"]

function deg2rad(d: number) {
  return ((d - 90) * Math.PI) / 180
}

function p2c(
  cx: number,
  cy: number,
  r: number,
  a: number
): { x: number; y: number } {
  const d = deg2rad(a)
  return { x: cx + r * Math.cos(d), y: cy + r * Math.sin(d) }
}

function organicSegment(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number
): string {
  const gapHalf = GAP_DEG / 2
  const sa = startAngle + gapHalf
  const ea = endAngle - gapHalf
  const cornerRadius = 28
  const arcSpan = ea - sa
  const cornerAngle = (cornerRadius / rOuter) * (180 / Math.PI)
  const cornerAngleInner = (cornerRadius / rInner) * (180 / Math.PI)

  const outerStart = p2c(cx, cy, rOuter, sa + cornerAngle)
  const outerEnd = p2c(cx, cy, rOuter, ea - cornerAngle)
  const innerStart = p2c(cx, cy, rInner, ea - cornerAngleInner)
  const innerEnd = p2c(cx, cy, rInner, sa + cornerAngleInner)
  const outerCornerStart = p2c(cx, cy, rOuter, sa)
  const innerCornerStart = p2c(cx, cy, rInner, sa)
  const outerCornerEnd = p2c(cx, cy, rOuter, ea)
  const innerCornerEnd = p2c(cx, cy, rInner, ea)
  const midR = (rOuter + rInner) / 2
  const tipStart = p2c(cx, cy, midR, sa)
  const tipEnd = p2c(cx, cy, midR, ea)
  const largeArc = arcSpan - 2 * cornerAngle > 180 ? 1 : 0
  const largeArcInner = arcSpan - 2 * cornerAngleInner > 180 ? 1 : 0

  return [
    "M",
    outerStart.x,
    outerStart.y,
    "A",
    rOuter,
    rOuter,
    0,
    largeArc,
    1,
    outerEnd.x,
    outerEnd.y,
    "Q",
    outerCornerEnd.x,
    outerCornerEnd.y,
    tipEnd.x,
    tipEnd.y,
    "Q",
    innerCornerEnd.x,
    innerCornerEnd.y,
    innerStart.x,
    innerStart.y,
    "A",
    rInner,
    rInner,
    0,
    largeArcInner,
    0,
    innerEnd.x,
    innerEnd.y,
    "Q",
    innerCornerStart.x,
    innerCornerStart.y,
    tipStart.x,
    tipStart.y,
    "Q",
    outerCornerStart.x,
    outerCornerStart.y,
    outerStart.x,
    outerStart.y,
    "Z",
  ].join(" ")
}

const LABELS = [
  { step: 1, num: "ETAPA 1", title: "Diagnóstico\nTributário\nEstratégico" },
  { step: 2, num: "ETAPA 2", title: "Apresentação das\nOportunidades" },
  { step: 3, num: "ETAPA 3", title: "Execução\nOrientada\na Êxito" },
  { step: 4, num: "ETAPA 4", title: "Estruturação\nContábil Estratégica*" },
  { step: 5, num: "ETAPA 5", title: "Expansão e\nProteção\nPatrimonial*" },
] as const

export function PainelLarafy() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const segments = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const sa = OFF + i * SEG
      const ea = OFF + (i + 1) * SEG
      const mid = (sa + ea) / 2
      const labelRadius = (R + IR) / 2 - 5
      const pos = p2c(CX, CY, labelRadius, mid)
      return {
        step: i + 1,
        d: organicSegment(CX, CY, R, IR, sa, ea),
        fill: COLORS[i],
        hoverFill: HCOLORS[i],
        sa,
        ea,
        labelLeft: pos.x,
        labelTop: pos.y,
      }
    })
  }, [])

  const setStep = useCallback((step: number) => {
    setActiveStep((prev) => (prev === step ? prev : step))
  }, [])

  const clearStep = useCallback(() => {
    setActiveStep(null)
  }, [])

  const displayStep = activeStep ?? 1

  return (
    <div className={styles.panel}>
      <div className={styles.wrap}>
        <div
          className={styles.wheel}
          onMouseLeave={clearStep}
        >
          <svg
            className={styles.wheelSvg}
            viewBox="0 0 580 580"
          >
            <defs>
              <filter
                id="lfy2Shadow"
                x="-15%"
                y="-15%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx={0}
                  dy={4}
                  stdDeviation={8}
                  floodColor="rgba(0,0,0,0.35)"
                />
              </filter>
            </defs>
            {segments.map((seg) => {
              const isActive = activeStep === seg.step
              const mid = (seg.sa + seg.ea) / 2
              const rd = deg2rad(mid)
              const tx = Math.cos(rd) * 12
              const ty = Math.sin(rd) * 12
              return (
                <path
                  key={seg.step}
                  className={`${styles.seg} ${isActive ? styles.active : ""}`}
                  d={seg.d}
                  fill={isActive ? seg.hoverFill : seg.fill}
                  filter="url(#lfy2Shadow)"
                  style={{
                    transform: isActive
                      ? `translate(${tx}px,${ty}px)`
                      : "translate(0,0)",
                  }}
                  onMouseEnter={() => setStep(seg.step)}
                />
              )
            })}
          </svg>

          {LABELS.map((lab, idx) => {
            const seg = segments[idx]
            if (!seg) return null
            const isActive = activeStep === lab.step
            return (
              <div
                key={lab.step}
                className={styles.lbl}
                style={{
                  left: seg.labelLeft,
                  top: seg.labelTop,
                  transform: isActive
                    ? "translate(-50%, -50%) translateY(-6px) scale(1.04)"
                    : "translate(-50%, -50%)",
                  textShadow: isActive
                    ? "0 0 16px rgba(34,184,201,0.4)"
                    : "none",
                }}
                onMouseEnter={() => setStep(lab.step)}
              >
                <div className={styles.lblNum}>{lab.num}</div>
                <div className={styles.lblTitle}>
                  {lab.title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < lab.title.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}

          <div className={styles.tablet}>
            <div className={styles.tabFrame}>
              <div className={styles.tabScreen}>
                {/* Tela 1 */}
                <div
                  className={`${styles.scr} ${displayStep === 1 ? styles.active : ""}`}
                >
                  <div className={styles.mhdr}>
                    <div className={styles.mdot} style={{ background: "#ff5f56" }} />
                    <div className={styles.mdot} style={{ background: "#ffbd2e" }} />
                    <div className={styles.mdot} style={{ background: "#27ca40" }} />
                    <span style={{ marginLeft: 4, fontSize: 5, color: "#999" }}>
                      Diagnóstico Fiscal
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                    <div
                      className={styles.mval}
                      style={{ flex: 1, background: "#f0f7ff", borderRadius: 4 }}
                    >
                      <div className="v" style={{ color: "#1a3a5c" }}>R$ 2.4M</div>
                      <div className="l">Análise Total</div>
                    </div>
                    <div
                      className={styles.mval}
                      style={{ flex: 1, background: "#f0faf5", borderRadius: 4 }}
                    >
                      <div className="v" style={{ color: "#22b8c9" }}>47</div>
                      <div className="l">Pontos Verificados</div>
                    </div>
                  </div>
                  <div className={styles.mbarWrap}>
                    {[60, 85, 45, 70, 90, 55, 75].map((h, i) => (
                      <div
                        key={i}
                        className={styles.mbar}
                        style={{
                          height: `${h}%`,
                          background: ["#1a3a5c", "#1a6b7c", "#22b8c9"][i % 3],
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: 5, color: "#999", textAlign: "center", marginTop: 3 }}>
                    Tributos por categoria
                  </div>
                </div>

                {/* Tela 2 */}
                <div
                  className={`${styles.scr} ${displayStep === 2 ? styles.active : ""}`}
                >
                  <div className={styles.mhdr}>
                    <div className={styles.mdot} style={{ background: "#ff5f56" }} />
                    <div className={styles.mdot} style={{ background: "#ffbd2e" }} />
                    <div className={styles.mdot} style={{ background: "#27ca40" }} />
                    <span style={{ marginLeft: 4, fontSize: 5, color: "#999" }}>
                      Relatório de Oportunidades
                    </span>
                  </div>
                  <table className={styles.mtbl}>
                    <tr style={{ background: "#f0f4f8" }}>
                      <td style={{ fontWeight: 600 }}>Tributo</td>
                      <td style={{ fontWeight: 600 }}>Base</td>
                      <td style={{ fontWeight: 600 }}>Economia</td>
                      <td style={{ fontWeight: 600 }}>Status</td>
                    </tr>
                    {[
                      ["PIS", "R$ 340k", "R$ 45k", "✓"],
                      ["COFINS", "R$ 890k", "R$ 120k", "✓"],
                      ["IRPJ", "R$ 560k", "R$ 78k", "✓"],
                      ["CSLL", "R$ 230k", "R$ 32k", "○"],
                      ["ICMS", "R$ 1.2M", "R$ 180k", "✓"],
                      ["ISS", "R$ 180k", "R$ 25k", "○"],
                      ["IPI", "R$ 420k", "R$ 58k", "✓"],
                    ].map((row, i) => (
                      <tr key={i} className={i === 1 || i === 4 ? styles.hl : ""}>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                        <td style={{ color: "#22b8c9" }}>{row[2]}</td>
                        <td>{row[3]}</td>
                      </tr>
                    ))}
                  </table>
                </div>

                {/* Tela 3 */}
                <div
                  className={`${styles.scr} ${displayStep === 3 ? styles.active : ""}`}
                >
                  <div className={styles.mhdr}>
                    <div className={styles.mdot} style={{ background: "#ff5f56" }} />
                    <div className={styles.mdot} style={{ background: "#ffbd2e" }} />
                    <div className={styles.mdot} style={{ background: "#27ca40" }} />
                    <span style={{ marginLeft: 4, fontSize: 5, color: "#999" }}>
                      Execução - Progresso
                    </span>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    {[
                      ["✓", "Recuperação PIS/COFINS", 100, "#22b8c9"],
                      ["✓", "Revisão IRPJ", 100, "#22b8c9"],
                      ["●", "Créditos ICMS", 65, "#e8a838"],
                      ["○", "Planejamento ISS", 30, "#cbd5e1"],
                      ["○", "Revisão IPI", 10, "#cbd5e1"],
                    ].map(([check, label, pct, color], i) => (
                      <div key={i} className={styles.mprog}>
                        <span className={styles.mchk} style={{ color: color as string }}>{check}</span>
                        <span style={{ fontSize: 5.5 }}>{label}</span>
                        <div className={styles.mprogBar}>
                          <div
                            className={styles.mprogFill}
                            style={{ width: `${pct}%`, background: color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    <div
                      className={styles.mval}
                      style={{ flex: 1, background: "#f0faf5", borderRadius: 3, padding: 3 }}
                    >
                      <div className="v" style={{ fontSize: 10, color: "#22b8c9" }}>65%</div>
                      <div className="l">Concluído</div>
                    </div>
                    <div
                      className={styles.mval}
                      style={{ flex: 1, background: "#fff8f0", borderRadius: 3, padding: 3 }}
                    >
                      <div className="v" style={{ fontSize: 10, color: "#e8a838" }}>R$ 243k</div>
                      <div className="l">Recuperado</div>
                    </div>
                  </div>
                </div>

                {/* Tela 4 */}
                <div
                  className={`${styles.scr} ${displayStep === 4 ? styles.active : ""}`}
                >
                  <div className={styles.mhdr}>
                    <div className={styles.mdot} style={{ background: "#ff5f56" }} />
                    <div className={styles.mdot} style={{ background: "#ffbd2e" }} />
                    <div className={styles.mdot} style={{ background: "#27ca40" }} />
                    <span style={{ marginLeft: 4, fontSize: 5, color: "#999" }}>
                      Estrutura Contábil
                    </span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      className={styles.mbox}
                      style={{
                        display: "inline-block",
                        background: "#1a3a5c",
                        color: "#fff",
                        borderColor: "#1a3a5c",
                      }}
                    >
                      Empresa Principal
                    </div>
                    <div className={styles.mconn} />
                    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div
                          className={styles.mbox}
                          style={{
                            background: "#e8f7f9",
                            borderColor: "#22b8c9",
                            color: "#1a6b7c",
                          }}
                        >
                          Regime Lucro Real
                        </div>
                        <div className={styles.mconn} />
                        <div className={styles.mbox}>Obrigações Acessórias</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          className={styles.mbox}
                          style={{
                            background: "#e8f7f9",
                            borderColor: "#22b8c9",
                            color: "#1a6b7c",
                          }}
                        >
                          Planejamento
                        </div>
                        <div className={styles.mconn} />
                        <div className={styles.mbox}>Compliance Fiscal</div>
                      </div>
                    </div>
                    <div className={styles.mconn} />
                    <div
                      className={styles.mbox}
                      style={{
                        background: "#fff8f0",
                        borderColor: "#e8a838",
                        color: "#d4952b",
                      }}
                    >
                      Dashboard Integrado
                    </div>
                  </div>
                </div>

                {/* Tela 5 */}
                <div
                  className={`${styles.scr} ${displayStep === 5 ? styles.active : ""}`}
                >
                  <div className={styles.mhdr}>
                    <div className={styles.mdot} style={{ background: "#ff5f56" }} />
                    <div className={styles.mdot} style={{ background: "#ffbd2e" }} />
                    <div className={styles.mdot} style={{ background: "#27ca40" }} />
                    <span style={{ marginLeft: 4, fontSize: 5, color: "#999" }}>
                      Expansão Patrimonial
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
                    <div
                      className={styles.mval}
                      style={{ flex: 1, background: "#f0f7ff", borderRadius: 3, padding: 3 }}
                    >
                      <div className="v" style={{ fontSize: 9, color: "#1a3a5c" }}>Holding</div>
                      <div className="l">Estruturação</div>
                    </div>
                    <div
                      className={styles.mval}
                      style={{ flex: 1, background: "#f0faf5", borderRadius: 3, padding: 3 }}
                    >
                      <div className="v" style={{ fontSize: 9, color: "#22b8c9" }}>Proteção</div>
                      <div className="l">Patrimonial</div>
                    </div>
                  </div>
                  <div className={styles.mbarWrap} style={{ height: 35 }}>
                    {[40, 55, 70, 85, 95].map((h, i) => (
                      <div
                        key={i}
                        className={styles.mbar}
                        style={{
                          height: `${h}%`,
                          background: ["#1a3a5c", "#1a6b7c", "#22b8c9"][i % 3],
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: 5, color: "#999", textAlign: "center", marginTop: 2 }}>
                    Projeção de Crescimento
                  </div>
                  <div style={{ display: "flex", gap: 3, marginTop: 5 }}>
                    <div
                      style={{
                        flex: 1,
                        background: "#f0f4f8",
                        borderRadius: 2,
                        padding: 3,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 5, color: "#999" }}>Transação</div>
                      <div style={{ fontSize: 7, fontWeight: 600, color: "#1a3a5c" }}>Tributária</div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        background: "#f0f4f8",
                        borderRadius: 2,
                        padding: 3,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 5, color: "#999" }}>Débitos</div>
                      <div style={{ fontSize: 7, fontWeight: 600, color: "#1a3a5c" }}>Negociação</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles.badge}
              style={{
                transform: "translateX(-50%) scale(1)",
              }}
            >
              {displayStep}
            </div>
          </div>

          <svg className={styles.connSvg} viewBox="0 0 580 580">
            <line
              className={`${styles.conn} ${activeStep === 1 ? styles.active : ""}`}
              x1={150}
              y1={155}
              x2={-5}
              y2={70}
              stroke="rgba(34,184,201,0.30)"
              strokeWidth={1.2}
              fill="none"
              strokeDasharray="5 4"
            />
            <circle
              className={`${styles.cdot} ${activeStep === 1 ? styles.active : ""}`}
              cx={-5}
              cy={70}
              r={3}
              fill="#22b8c9"
            />
            <line
              className={`${styles.conn} ${activeStep === 2 ? styles.active : ""}`}
              x1={425}
              y1={145}
              x2={595}
              y2={55}
              stroke="rgba(34,184,201,0.30)"
              strokeWidth={1.2}
              fill="none"
              strokeDasharray="5 4"
            />
            <circle
              className={`${styles.cdot} ${activeStep === 2 ? styles.active : ""}`}
              cx={595}
              cy={55}
              r={3}
              fill="#22b8c9"
            />
            <line
              className={`${styles.conn} ${activeStep === 3 ? styles.active : ""}`}
              x1={465}
              y1={365}
              x2={595}
              y2={380}
              stroke="rgba(34,184,201,0.30)"
              strokeWidth={1.2}
              fill="none"
              strokeDasharray="5 4"
            />
            <circle
              className={`${styles.cdot} ${activeStep === 3 ? styles.active : ""}`}
              cx={595}
              cy={380}
              r={3}
              fill="#22b8c9"
            />
            <line
              className={`${styles.conn} ${activeStep === 4 ? styles.active : ""}`}
              x1={290}
              y1={510}
              x2={290}
              y2={600}
              stroke="rgba(34,184,201,0.30)"
              strokeWidth={1.2}
              fill="none"
              strokeDasharray="5 4"
            />
            <circle
              className={`${styles.cdot} ${activeStep === 4 ? styles.active : ""}`}
              cx={290}
              cy={600}
              r={3}
              fill="#22b8c9"
            />
            <line
              className={`${styles.conn} ${activeStep === 5 ? styles.active : ""}`}
              x1={115}
              y1={385}
              x2={-5}
              y2={405}
              stroke="rgba(34,184,201,0.30)"
              strokeWidth={1.2}
              fill="none"
              strokeDasharray="5 4"
            />
            <circle
              className={`${styles.cdot} ${activeStep === 5 ? styles.active : ""}`}
              cx={-5}
              cy={405}
              r={3}
              fill="#22b8c9"
            />
          </svg>

          <div className={`${styles.tip} ${styles.tip1} ${activeStep === 1 ? styles.active : ""}`}>
            <p>
              Realizamos um diagnóstico profundo da operação, com apoio da nossa tecnologia exclusiva.
            </p>
            <p>
              <strong>Esse processo não tem<br />custo para você.</strong>
            </p>
          </div>
          <div className={`${styles.tip} ${styles.tip2} ${activeStep === 2 ? styles.active : ""}`}>
            <ul>
              <li>Oportunidades reais de recuperação tributária</li>
              <li>Um planejamento tributário estratégico com foco em redução do imposto pago mês a mês</li>
            </ul>
          </div>
          <div className={`${styles.tip} ${styles.tip3} ${activeStep === 3 ? styles.active : ""}`}>
            <p>
              A LaraFy só é remunerada quando você decide aproveitar as oportunidades apresentadas.
            </p>
            <p>
              <em>Se não houver ganho,<br />não há remuneração.</em>
            </p>
          </div>
          <div className={`${styles.tip} ${styles.tip4} ${activeStep === 4 ? styles.active : ""}`}>
            <p>
              Em função da complexidade das estratégias aplicadas, pode ser necessária uma reestruturação contábil para garantir a segurança e a conformidade das operações.
            </p>
            <p className={styles.small}>
              *Os serviços desta etapa são projetos independentes, com contratação específica e cobrança pela execução do trabalho, conforme complexidade e objetivos definidos em conjunto com o cliente.
            </p>
          </div>
          <div className={`${styles.tip} ${styles.tip5} ${activeStep === 5 ? styles.active : ""}`}>
            <p>
              Com a empresa estruturada, torna-se possível avançar para projetos estratégicos de longo prazo, como:
            </p>
            <ul>
              <li>Estruturação de holding patrimonial</li>
              <li>Transação tributária e negociação de débitos fiscais</li>
            </ul>
            <p className={styles.small}>
              *Os serviços desta etapa são projetos independentes, com contratação específica e cobrança pela execução do trabalho, conforme complexidade e objetivos definidos em conjunto com o cliente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
