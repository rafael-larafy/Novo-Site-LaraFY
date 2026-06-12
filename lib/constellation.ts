
export type Pt = { x: number; y: number }

export function ringNodes(
  count: number,
  opts?: { cx?: number; cy?: number; r?: number; startDeg?: number }
): Pt[] {
  const { cx = 50, cy = 50, r = 34, startDeg = -90 } = opts ?? {}
  return Array.from({ length: count }, (_, i) => {
    const deg = startDeg + (i * 360) / count
    const rad = (deg * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  })
}

export function arcPath(a: Pt, b: Pt, bend = 6): string {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  return `M ${a.x} ${a.y} Q ${mx + nx * bend} ${my + ny * bend} ${b.x} ${b.y}`
}
