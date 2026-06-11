/**
 * Transição de página (App Router): a cada navegação este template remonta e
 * dispara uma "cortina" que cobre a viewport e sobe revelando a nova página —
 * o feel de award-site na navegação entre /sobre, /soluções, /método, etc.
 *
 * Implementado em CSS puro (`.page-curtain` em globals.css), de propósito:
 *  - roda mesmo antes da hidratação do React (não depende de JS p/ revelar);
 *  - não toca na opacidade do conteúdo → zero risco de página em branco;
 *  - a cortina é um elemento-folha (transform nela não quebra o
 *    `position: fixed` do <Header>).
 *
 * Respeita prefers-reduced-motion (a cortina some via CSS).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="page-curtain" />
      {children}
    </>
  )
}
