/**
 * Fonte ÚNICA das curvas de easing do site.
 *
 * Consistência de movimento pesa como nota de Design no Awwwards. Em vez de
 * espalhar curvas bézier "mágicas" pelo código, todo o motion puxa daqui:
 *
 *  - SIGNATURE → curva-assinatura da marca (a mesma do lumena-partners.com).
 *    Usada em INTERAÇÕES e UI: CTA, cursor, barra de progresso, page
 *    transitions, preloader. Acelera e desacelera ("snap" elegante).
 *  - SOFT → desaceleração pura (ease-out). Usada em REVEALS de conteúdo
 *    (entrada de seções no scroll), onde só a chegada precisa ser suave.
 *
 * Mantemos duas curvas DE PROPÓSITO: interações têm assinatura própria,
 * reveals desaceleram. As duas vivem aqui — esta é a unificação.
 */

/** Curva-assinatura (UI / interações). Tupla pronta p/ Framer Motion. */
export const EASE_SIGNATURE: [number, number, number, number] = [0.55, 0, 0.1, 1]

/** Desaceleração suave (reveals de conteúdo). Tupla p/ Framer Motion. */
export const EASE_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Versão string da assinatura para CSS (`transition` / `animation`). */
export const EASE_SIGNATURE_CSS = "cubic-bezier(0.55, 0, 0.1, 1)"

/** Versão string da suave para CSS. */
export const EASE_SOFT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)"
