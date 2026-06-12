"use client"

import { useEffect, useState } from "react"
import { Activity, Check, ChevronDown, Download, Search, X } from "lucide-react"

const TABS = ["Detalhes", "Arquivos", "Relatórios", "Upload de arquivos", "Retificações"] as const

const SPEDS = [
  "EFD CONTRIBUIÇÕES",
  "EFD-FISCAL",
  "ECD",
  "ECF",
  "REINF",
  "XML ZIP",
  "APURACAO ASSISTIDA",
  "CAPACIDADE PAGAMENTO",
  "CND",
  "cnd",
  "DIVIDA ATIVA",
  "processados",
  "SITUACAO FISCAL",
] as const

const ECAC = ["DCTF", "DCTF WEB", "PARCELAMENTOS", "PER/DCOMP"] as const

const MONTHS: [string, string, string][] = [
  ["Janeiro", "20210101", "20210131"],
  ["Fevereiro", "20210201", "20210228"],
  ["Março", "20210301", "20210331"],
  ["Abril", "20210401", "20210430"],
  ["Maio", "20210501", "20210531"],
  ["Junho", "20210601", "20210630"],
  ["Julho", "20210701", "20210731"],
  ["Agosto", "20210801", "20210831"],
  ["Setembro", "20210901", "20210930"],
  ["Outubro", "20211001", "20211031"],
  ["Novembro", "20211101", "20211130"],
  ["Dezembro", "20211201", "20211231"],
]

function CheckSquare({ checked = false }: { checked?: boolean }) {
  return (
    <span
      className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors duration-[900ms] ease-in-out ${
        checked ? "border-cyan-400 bg-cyan-400" : "border-slate-300 bg-white"
      }`}
      aria-hidden
    >
      <Check
        className={`h-3 w-3 text-white transition-opacity duration-[900ms] ease-in-out ${
          checked ? "opacity-100" : "opacity-0"
        }`}
        strokeWidth={3}
      />
    </span>
  )
}

export function BaixaAutomatica({ className }: { className?: string }) {
  // Linhas "detectadas" pelo scanner: acendem e ficam em destaque por ~2,6s.
  const [hits, setHits] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let mounted = true
    const timers: number[] = []
    const tick = () => {
      if (!mounted) return
      setHits((prev) => {
        const next = new Set(prev)
        const free = MONTHS.map((_, i) => i).filter((i) => !next.has(i))
        for (let k = 0; k < 2 && free.length; k++) {
          const idx = free.splice(Math.floor(Math.random() * free.length), 1)[0]
          next.add(idx)
          timers.push(
            window.setTimeout(() => {
              if (!mounted) return
              setHits((p) => {
                const n = new Set(p)
                n.delete(idx)
                return n
              })
            }, 3400)
          )
        }
        return next
      })
    }
    const startId = window.setTimeout(tick, 700)
    const intervalId = window.setInterval(tick, 2300)
    return () => {
      mounted = false
      window.clearTimeout(startId)
      window.clearInterval(intervalId)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  return (
    <figure
      role="img"
      aria-label="Interface da Baixa Automática Completa da Larafy: navegador de arquivos fiscais (SPEDs) com download por período."
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-2xl shadow-black/50 ring-1 ring-[#00e5ff]/10 ${className ?? ""}`}
    >
      
      <div className="flex items-start justify-between gap-3 px-4 py-3.5 sm:px-5">
        <div className="flex items-start gap-3">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#d6f5fb] to-white ring-1 ring-cyan-100"
            aria-hidden
          >
            <Activity className="h-5 w-5 text-cyan-500" />
          </span>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold leading-tight text-slate-800">
              Baixa Automática Completa
            </p>
            <p className="mt-0.5 truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Metalúrgica Modelo Indústria e Comércio LTDA
            </p>
          </div>
        </div>
        <X className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
      </div>

      
      <div className="flex items-center gap-4 border-b border-slate-200 px-4 sm:gap-5 sm:px-5">
        {TABS.map((tab) => {
          const active = tab === "Arquivos"
          return (
            <span
              key={tab}
              className={`-mb-px whitespace-nowrap border-b-2 py-2.5 text-[12.5px] font-semibold ${
                active
                  ? "border-cyan-400 text-cyan-500"
                  : "border-transparent text-slate-500"
              }`}
            >
              {tab}
            </span>
          )
        })}
      </div>

      
      <div className="flex">
        
        <aside className="flex w-[34%] max-w-[210px] flex-col border-r border-slate-200">
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">SPEDs</p>
            <ul className="mt-1.5 space-y-0.5">
              {SPEDS.map((item) => {
                const active = item === "EFD CONTRIBUIÇÕES"
                return (
                  <li
                    key={item}
                    className={`truncate rounded-md px-2 py-1.5 text-[12.5px] ${
                      active ? "bg-[#eaf4fb] font-semibold text-slate-800" : "text-slate-600"
                    }`}
                  >
                    {item}
                  </li>
                )
              })}
            </ul>

            <p className="mt-4 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">E-Cac</p>
            <ul className="mt-1.5 space-y-0.5">
              {ECAC.map((item) => (
                <li key={item} className="truncate rounded-md px-2 py-1.5 text-[12.5px] text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 p-3">
            <span className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-[12px] font-semibold text-cyan-600">
              <Download className="h-3.5 w-3.5" />
              Baixar tudo
            </span>
          </div>
        </aside>

        
        <div className="flex min-w-0 flex-1 flex-col">
          
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="flex items-center gap-2 text-[12.5px] text-slate-600">
              <CheckSquare />
              Todos
            </span>
            <span className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-[12.5px] text-slate-400">
              <Search className="h-3.5 w-3.5 shrink-0" />
              Procurar…
            </span>
            <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-b from-[#36d4ea] to-[#19bdd8] px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm">
              Baixar seleção
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </div>

          
          <div className="px-4 pb-2">
            <p className="text-[15px] font-bold text-slate-800">EFD CONTRIBUIÇÕES</p>
            <p className="text-[12px] font-medium text-cyan-600">118 arquivos</p>
          </div>

          
          <div className="max-h-[208px] flex-1 overflow-y-auto">
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 bg-slate-50">
                <tr className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <th className="w-8 py-2 pl-4" aria-hidden>
                    <CheckSquare />
                  </th>
                  <th className="py-2 pl-4 pr-3 font-semibold">Período</th>
                  <th className="py-2 pr-3 font-semibold">Arquivo</th>
                  <th aria-hidden />
                </tr>
              </thead>
              <tbody>
                {MONTHS.map(([month, start, end], i) => {
                  const hit = hits.has(i)
                  return (
                    <tr
                      key={month}
                      className={`border-b border-slate-100 align-middle transition-[background-color,box-shadow] duration-[900ms] ease-in-out ${
                        hit ? "bg-[#eaf9ff] shadow-[inset_2px_0_0_rgba(34,211,238,0.65)]" : ""
                      }`}
                    >
                      <td className="py-2.5 pl-4">
                        <CheckSquare checked={hit} />
                      </td>
                      <td
                        className={`whitespace-nowrap py-2.5 pl-4 pr-3 text-[12.5px] transition-colors duration-[900ms] ease-in-out ${
                          hit ? "text-cyan-700" : "text-slate-700"
                        }`}
                      >
                        {month}/2021
                      </td>
                      <td className="max-w-0 py-2.5 pr-3">
                        <span className="block truncate text-[12.5px] text-slate-500">
                          PISCOFINS_{start}_{end}_12345678000190_EFD.txt
                        </span>
                      </td>
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <span
                            className={`flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors duration-[900ms] ease-in-out ${
                              hit ? "border-cyan-300 text-cyan-600" : "border-slate-200 text-slate-600"
                            }`}
                          >
                            <Download className="h-3 w-3" />
                            .rec
                          </span>
                          <span
                            className={`flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors duration-[900ms] ease-in-out ${
                              hit ? "border-cyan-300 text-cyan-600" : "border-slate-200 text-slate-600"
                            }`}
                          >
                            <Download className="h-3 w-3" />
                            .txt
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      <div className="lfy-scan-overlay" aria-hidden>
        <div className="lfy-scan-wave" />
        <span className="lfy-scanline" />
      </div>
    </figure>
  )
}
