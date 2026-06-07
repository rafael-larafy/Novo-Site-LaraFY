# Teardown técnico — lumena-partners.com

> Guia definitivo de replicação para o time Larafy. Reconciliado contra os veredictos de verificação adversarial: onde uma análise foi refutada/corrigida, uso a versão corrigida. Toda afirmação aqui foi confirmada contra os arquivos locais `/tmp/lumena.{html,css,js}`.

---

## 1. Resumo executivo

**O que é o site.** `lumena-partners.com` é o site institucional da Lumena Partners (consultoria de liderança/advisory, partner Florian Pollner, ex-McKinsey). É um site "awards-tier" construído à mão pelo freelancer **css_killer** (Awwwards jury member, Espanha). A nota visual é editorial, premium, sóbria: tipografia grande, fundo creme, acentos teal/amarelo-manteiga, e um efeito-assinatura de **vídeo renderizado como arte ASCII em canvas**.

**O stack real (confirmado byte-a-byte):**

- **Backend:** WordPress como CMS headless-ish — **WPML 4.8.6** (multilíngue) + **RankMath** (SEO) + **Cookiebot** (consent). Zero jQuery, zero `wp-includes`, zero scripts de tema WP. O WordPress só serve HTML/SEO/i18n e a mídia (58 referências a `wp-content/uploads`).
- **Frontend:** um único bundle ES-module Vite — `/assets/main.js` (`type=module`) + `/assets/main.css`. **Analytics = Plausible** (`data-domain="lumena-partners.com"`).
- **Animação:** **anime.js v4.2.1** (`version:"4.2.1"` confirmado) + **Lenis 1.3.11** (smooth-scroll) + **Splide 4.1.4** (carrossel). NÃO usa GSAP, Framer, React, Vue, Three.js, Swiper, Lottie nem jQuery (todos confirmados ausentes).

**O "DNA" visual/motion em 6 bullets:**

1. **Um único relógio mestre.** A engine de timer do anime.js é o ÚNICO `requestAnimationFrame`; ela dirige o Lenis a cada frame (`anime.createTimer({onUpdate: i => lenis.raf(i.currentTime*1000)})`). Isso elimina double-RAF jitter — é o insight arquitetural central.
2. **Animação declarativa por `data-*`.** Um mini-parser converte `data-split`, `data-off`, `data-target`, `data-auto`, `data-srcsm/lg` em config. Você marca o HTML e a engine faz o resto.
3. **Tokens de design dirigidos por CSS custom properties.** Grid fluido (`--gutgrid`, `--padgrid`, `--sizegrid`), tipografia fluida (`--multi`), e progresso de scroll (`--prg`) — tudo é variável de CSS.
4. **Uma única curva de easing no site inteiro:** `cubic-bezier(.55,0,.1,1)` — **158 ocorrências, zero outras curvas** no CSS. Durações dominantes: `.4s`/`.45s`.
5. **Reveal por clip-path + split de texto por linha.** Linhas começam `opacity:0`, são fatiadas (`anime.text.splitText`) e revelam com `x:-50%→0%` + stagger `.03` (30 ms), cor saindo de `#035654`.
6. **Tipografia comprada (TWK Lausanne 450, foundry Weltkern) + Roboto Mono Bold** para labels. Escala de rem viewport-relativa (1rem ≈ 10px @1440px). Sem `clamp()` — usa `min()/max()` e interpolação linear.

**Correções importantes versus os sinais brutos:**

- A biblioteca de split é o **`text.splitText` nativo do anime.js v4**, NÃO GSAP SplitText.
- `--prgsll` **NÃO é escrito por JS** — é dirigido por **CSS `scroll-timeline` nativo** (`@keyframes --hasoverflow`). Só `--prg` tem lógica JS, e via animação (currentTime de vídeo / timeline de menu), não um "scroll progress writer" dedicado.
- O carrossel usa **Splide** (não Swiper). O sinal "Swiper=0" estava certo, mas há SIM uma lib de carrossel.
- A fonte mono `robo` (= **Roboto Mono Bold**) é usada em **botões/labels uppercase**, não como fonte de texto monoespaçado.

---

## 2. Stack & arquitetura

### Backend (WordPress decoupled)

| Camada | Tecnologia | Evidência |
|---|---|---|
| CMS | WordPress | `<meta generator="WPML ver:4.8.6">`, autor `css_killer`, `og:site_name "My WordPress"` |
| i18n | WPML 4.8.6 | meta generator; troca de idioma por links `/de` simples (sem `hreflang`) |
| SEO | RankMath | `<script class="rank-math-schema">`, JSON-LD |
| Consent | Cookiebot | `data-cbid`, `data-blockingmode="auto"` |
| Mídia | wp-content/uploads | 58 refs (jpg.webp, mp4, pdf, svg) — WP é host de mídia |

### Frontend (bundle Vite custom)

- **Apenas 5 `<script>`:** stub inline cookieconsent, JSON-LD RankMath, `/assets/main.js` (`type=module`), Plausible, Cookiebot.
- **anime.js v4.2.1** com `anime.engine.timeUnit="s"` global — TODA duração no bundle está em **segundos** (`.3`, `.4`, `.6`; staggers `.03` = 30 ms).
- **Lenis 1.3.11**, duas instâncias: scroller principal (`lerp:.1, wheelMultiplier:.8, smoothWheel:!touch, normalizeWheel:true`, começa em `.stop()`) e um scroller aninhado de modal (`wheelMultiplier:.4, autoRaf:true`).
- **Splide 4.1.4** para o carrossel de Collaborators.

### Tabela: lib do Lumena → equivalente no stack Larafy

| Função | Lumena | Equivalente Larafy (já instalado) | Notas de port |
|---|---|---|---|
| Smooth scroll | Lenis 1.3.11 | **Lenis** (precisa instalar `lenis` + `lenis/react`) | MIT, portável 1:1. Dirigir via `gsap.ticker`, `autoRaf:false` |
| Engine de animação / scroll triggers | anime.js v4 `onScroll`/`createTimeline` | **GSAP 3.15 + ScrollTrigger** | ScrollTrigger `scrub` = `onScroll({sync:1})`; `pin:true` = sticky |
| Split de texto | anime.js `text.splitText` | **GSAP SplitText** (já em node_modules, free desde 3.13) ou splitter custom | `type:"lines", mask:"lines"` |
| Drag/magnético | anime.js `createDraggable` | **GSAP `quickTo`** ou Framer `useSpring` | Magnetic button |
| Carrossel | Splide 4.1.4 | **embla-carousel-react 8.6** (já instalado) | Embla cobre o caso |
| Reveals de seção / hover | (parte do anime) | **Framer Motion 12.35** (`whileInView`, variants) | Já em uso via `lib/scroll-motion.ts` |
| Var de scroll-progress | anime `utils.set` no `--prg` | ScrollTrigger `onUpdate` → `setProperty` **ou** Framer `useMotionValueEvent` | Preserva a arquitetura CSS-var |
| Analytics | Plausible | (decisão do time — Vercel Analytics já presente) | — |

**Recomendação de divisão de trabalho:** GSAP + ScrollTrigger + Lenis para tudo que é scroll-coupled, pinned, scrubbed, split-text e marquee (as seções de marketing pesadas). Framer Motion para reveals component-level, hover e transições de layout. Lenis por baixo de ambos, dirigido por um único `gsap.ticker`. Esse é o split de produção recomendado: "GSAP para seções de marketing, Framer para UI de aplicação".

---

## 3. Design system

### 3.1 Paleta de cores (hex → papel semântico)

Não existem custom properties de cor no CSS do Lumena — **todo hex é hardcoded**. Não há ruleset `data-skin`; o "tema" é feito em JS trocando classes `-dk`/`-lt`. Para o Larafy vamos tokenizar tudo (tabela abaixo).

| Hex | Freq | Papel semântico |
|---|---|---|
| `#fff4b0` | 42 | **Acento primário — amarelo-manteiga** (texto sobre escuro, bordas, fills de botão, hero) |
| `#073b3a` | 26 | **Teal profundo — superfície escura primária** (loader, seções dark, texto dark) |
| `#035654` | 3 | Teal-2 (hover/superfície secundária; cor de origem do reveal de char) |
| `#f6f4e9` | 10 | **Creme — background claro / página** (também o véu de transição de página) |
| `#fff` | 20 | Branco (superfície, texto-sobre-dark, stop de gradiente) |
| `#1d1d1d` | 13 | **Quase-preto — tinta/texto sobre claro** |
| `#70626b` | 29 | **Malva acinzentado — texto secundário/muted** (captions, meta) |
| `#ff303c` | 8 | **Vermelho — alerta/erro/ativo** |
| `#7d8ca3` | 2 | Azul-ardósia (acento menor) |
| `#8d8d8d` | 7 | Cinza médio — linha/borda + placeholder |
| `#00101F` | — | **Navy — `theme-color`** (chrome do browser apenas) |
| `#00000026` | 30 | **Preto 15% — cor de hairline padrão** (`border-bottom:1px solid`) |
| `#fff4b01a` | 7 | Acento 10% — hairline sobre fundo escuro |

> Os hex `#36311f`, `#59544b`, `#79a9d1` são swatches de **grid-overlay de dev** — ignorar para a marca.

> **ATENÇÃO Larafy:** a paleta do Lumena (creme/teal/amarelo) é **oposta** à paleta atual do Larafy (`--background:#0a1628` navy escuro, `--primary:#00e5ff` ciano). NÃO copie as cores — copie a *estrutura de papéis*. Veja §8.

### 3.2 Tipografia

**Famílias (confirmado via name tables dos woff2):**

- `base` = **TWK Lausanne 450** (foundry **TYPE.WELTKERN®**, designer Nizar Kazan) — `/assets/fonts/TWK-b.woff2` (upright) + `TWK-bi.woff2` (italic). Só um peso + um italic; bold é faux. **Fonte PAGA.**
- `robo` = **Roboto Mono Bold** (Google) — usada em botões/labels uppercase (`.aBtn`, `.nav_menu_LNK`), sempre `text-transform:uppercase`.

**Alternativas FREE recomendadas para `next/font`:**

| Papel | Lumena (paga) | Alternativa FREE | Como carregar |
|---|---|---|---|
| Headings/body (grotesk) | TWK Lausanne | **Inter** (melhor default, neutro neo-grotesco) ou **Geist Sans** (nativo Vercel) | `next/font/google` → `Inter`, ou `geist/font/sans` |
| Sabor mais próximo de Lausanne | TWK Lausanne | **Hanken Grotesk** / **Schibsted Grotesk** | `next/font/google` |
| Mono labels | Roboto Mono | **Roboto Mono** (match exato) ou **Geist Mono** | `next/font/google` → `Roboto_Mono` |

> O Larafy **já usa Inter + Montserrat** via `next/font/google` em `app/layout.tsx`. Para o sabor Lumena, mantenha Inter para headings/body e adicione **Roboto Mono** para eyebrows/labels uppercase.

**Escala fluida — como o Lumena faz:** root `font-size:10px` fallback, depois `font-size:min(calc((100vw/1440)*10 + var(--multi)), 1.25vh)` com `--multi: calc(((100vw - 1440px)/1440 * -5))`. **Sem `clamp()`** — usa `min()/max()` + interpolação linear `calc(BASEpx + (DELTA*.8292)*(100vw-375px)/(1194-375))`.

**Para o Larafy, traduza cada degrau para `clamp()`** (mais idiomático em Tailwind v4):

| Degrau | Lumena rem | Faixa px | Tradução `clamp()` recomendada |
|---|---|---|---|
| Display XXL | 11.2rem | 40 → ~100px | `clamp(2.5rem, 6vw + 1rem, 6.25rem)` |
| Display XL | 7.2rem | 36 → ~66px | `clamp(2.25rem, 4vw + 1rem, 4.5rem)` |
| H1 | 5.6rem | 32 → ~45px | `clamp(2rem, 3vw + 1rem, 3.5rem)` |
| H2 | 4.8rem | 24 → ~51px | `clamp(1.5rem, 3vw + .5rem, 3rem)` |
| H3 | 3.2rem | 24 → ~44px | `clamp(1.5rem, 2vw + .5rem, 2rem)` |
| Lead | 2.4rem | 20 → ~30px | `clamp(1.25rem, 1vw + .75rem, 1.5rem)` |
| Body | 1.6rem | 16 → ~20px | `clamp(1rem, .5vw + .8rem, 1.25rem)` |
| Small | 1.4rem | 14 → ~19px | `clamp(.875rem, .3vw + .75rem, 1rem)` |

**Line-height:** apertado (1–1.15) para display, 1.4–1.5 para body. **Tracking:** display `-.01em`/`-.02em` (negativo); eyebrows mono `.05em` (positivo, uppercase).

### 3.3 Grid system (12 colunas fluido)

Tokens hospedados em `<html>`:

```css
/* desktop (min-width:1194px) */
html{ --mobileMax:540; --touch:1194; --gutgrid:.8rem; --padgrid:2.4rem; }
html{ --padgut: calc(var(--gutgrid) + var(--padgrid));
      --sizegrid: calc(100vw - (var(--padgrid) * 2)); }
/* tablet/mobile (max-width:1194px) — interpolação fluida 375→1194px */
@media (max-width:1194px){ html{
  --padgrid: calc(14px + (10 * (100vw - 375px) / (1194 - 375)));   /* 14→24px */
  --gutgrid: calc(4px  + (4  * (100vw - 375px) / (1194 - 375)));   /* 4→8px  */
}}
.cl1{ padding-inline:var(--gutgrid); width:calc(var(--sizegrid) * (1/12)); }
/* …até .cl12 */
.grid{ width:100%; max-width:var(--sizegrid); margin-inline:auto; }
.grid-vw{ width:100%; padding-inline:var(--padgut); }  /* full-bleed com inset */
```

| Var | Papel | Valor |
|---|---|---|
| `--gutgrid` | meio-gutter (padding L+R por coluna) | `.8rem` → fluido `4→8px` |
| `--padgrid` | margem lateral da página | `2.4rem` → fluido `14→24px` |
| `--padgut` | inset de borda = gutter + margem | `calc(--gutgrid + --padgrid)` |
| `--sizegrid` | largura útil do grid | `calc(100vw - --padgrid*2)` |
| `--gapX` / `--gapY` | gaps flex/grid | `2.4rem` / `4rem` |

> **Sem `max-width` fixo em px.** Container = `max-width:var(--sizegrid)` = `100vw − padding` (modelo full-bleed-com-margens). O `1440px` é só largura de referência de design para o scaling de rem, NÃO um cap de container.

### 3.4 Espaçamento & breakpoints

**Dois breakpoints duros**, cada um subdividido por aspect-ratio 1.2 (portrait vs landscape, para tablets):

```
(min-width:1194px)                              → desktop
(max-width:1194px)                              → tablet & abaixo  [--touch]
(max-width:540px)                               → phone           [--mobileMax]
(min-aspect-ratio:1.2)/(max-aspect-ratio:1.2)   → landscape vs portrait
(hover:hover)/(hover:none)                       → capability de ponteiro
```

Escala de spacing rem: `.6 / .8 / 1 / 1.2 / 1.6 / 2 / 2.4 / 4 / 5.6 / 8 / 13.6rem`. Ritmo vertical de seção via `--padT/--padB/--marT` = `12rem` (desktop) → `4rem` (mobile). Uso pesado de `lvh` (`100lvh`) para sticky full-height mobile-safe.

### 3.5 Técnicas visuais

- **Reveals por `clip-path`** (mecanismo-assinatura): `inset(0% 0% 100% 0%)` → `inset(0)` (reveal up), `polygon(...)` para setas, com `transition:.45s clip-path cubic-bezier(.55,0,.1,1)`.
- **`[data-line]{opacity:0}`** — linhas começam escondidas; wrappers de reveal usam `overflow:clip` para mascarar linhas transformadas.
- **`position:sticky`** = dispositivo de layout central (pinning de seções).
- **`position:fixed`** para nav, loader, canvas WebGL, password gate.
- **Underlines animados** via `background-size` + `background-position` dirigidos por `--aPer` (dual-layer gradient que faz wipe).
- **Acordeão via grid trick:** `grid-template-rows:0fr` → `1fr`.
- **`@keyframes --hasoverflow`** — anima um custom property (truque Houdini de registered-property) para expor estado legível por JS/CSS.
- **NÃO existe** `mix-blend-mode`, `backdrop-filter`, `mask-image` nem `box-shadow` em todo o bundle. Cursor custom é canvas/JS, não CSS.

### 3.6 Tailwind v4 `@theme` — pronto para colar

> Adapte ao Larafy: estes são os tokens *estruturais* do Lumena. Para manter a identidade Larafy (navy/ciano), substitua os hex de cor pelos do Larafy mas **mantenha a estrutura de motion/spacing/type**. Coloque em `app/globals.css` (o ativo; `styles/globals.css` está morto).

```css
@theme {
  /* ---- COR (papéis Lumena; troque hex pela paleta Larafy se quiser manter a marca) ---- */
  --color-bg:        #f6f4e9;   /* creme página */
  --color-bg-dark:   #073b3a;   /* teal profundo */
  --color-teal-2:    #035654;
  --color-surface:   #ffffff;
  --color-ink:       #1d1d1d;
  --color-muted:     #70626b;   /* malva */
  --color-accent:    #fff4b0;   /* amarelo-manteiga */
  --color-danger:    #ff303c;
  --color-navy:      #00101f;
  --color-line:      #00000026; /* preto/15 hairline */
  --color-line-dark: #fff4b01a; /* acento/10 hairline sobre dark */

  /* ---- TIPOGRAFIA (alternativas FREE) ---- */
  --font-base: var(--font-inter), Inter, system-ui, sans-serif;     /* substitui TWK Lausanne */
  --font-mono: var(--font-roboto-mono), "Roboto Mono", ui-monospace, monospace;
  --text-display: clamp(2.5rem, 6vw + 1rem, 6.25rem);
  --text-h1:      clamp(2rem, 3vw + 1rem, 3.5rem);
  --text-h2:      clamp(1.5rem, 3vw + .5rem, 3rem);
  --text-h3:      clamp(1.5rem, 2vw + .5rem, 2rem);
  --text-lead:    clamp(1.25rem, 1vw + .75rem, 1.5rem);
  --text-body:    clamp(1rem, .5vw + .8rem, 1.25rem);
  --text-sm:      clamp(.875rem, .3vw + .75rem, 1rem);
  --tracking-tight: -.02em; --tracking-label: .05em;
  --leading-tight: 1.1; --leading-snug: 1.25; --leading-normal: 1.5;

  /* ---- GRID / SPACING ---- */
  --space-gutter: .8rem; --space-margin: 2.4rem;
  --space-gap-x: 2.4rem; --space-gap-y: 4rem;
  --space-section: 12rem;

  /* ---- MOTION (a curva ÚNICA do Lumena — 158 usos) ---- */
  --ease-default: cubic-bezier(.55,0,.1,1);
  --duration-fast: .3s; --duration-base: .4s; --duration-slow: .45s;

  /* ---- RADIUS ---- */
  --radius-sm: 2px; --radius-md: 4px; --radius-pill: 4rem; --radius-full: 50%;

  /* ---- BREAKPOINTS ---- */
  --breakpoint-phone: 540px; --breakpoint-tablet: 1194px;
}

/* tokens de grid no :root (não-cor, vão fora do @theme) */
:root{
  --gutgrid:.8rem; --padgrid:2.4rem;
  --padgut: calc(var(--gutgrid) + var(--padgrid));
  --sizegrid: calc(100vw - (var(--padgrid) * 2));
}
@media (max-width:1194px){
  :root{
    --padgrid: calc(14px + (10 * (100vw - 375px) / (1194 - 375)));
    --gutgrid: calc(4px  + (4  * (100vw - 375px) / (1194 - 375)));
  }
}
```

---

## 4. Sistema de animação

### 4.1 O modelo declarativo

Um parser converte strings `data-*` (sintaxe `key:val|key2:val2`) em config:

```js
function $r(e){ const t={}, i=split(e,"|");
  for(let n of i){ const [s,...r]=split(n,":"); t[s.trim()]=coerce(r.join(":")); }
  return t; }
```

| Atributo | Mecanismo |
|---|---|
| **`data-split`** | Flag de reveal de texto. Ex: `data-split="lines:true"`, `"lines:true\|words:false"`. Query em `[data-split]`, `anime.text.splitText(el, cfg)`, depois `delete el.dataset.split`. ×14 no HTML |
| **`data-off`** | Offset de scroll (px) para `lenis.scrollTo`. Default = altura negativa do header. ×8, sempre `="0"` em `.aPer` |
| **`data-target`** | Sobrescreve o trigger do ScrollObserver: `target: el.dataset.target ?? el`. ×4 (`#homehum`, `#why0/1/2`) |
| **`data-auto`** | Política de autoplay de vídeo: `yes`/`no`/`click`. Play on enter, pause+mute on leave |
| **`data-srcsm`/`data-srclg`** | Fontes lazy responsivas; swap `el.src` conforme breakpoint, decode via promise antes do reveal |
| **`data-lenis-prevent`** | Atributo nativo Lenis — exclui container do smooth-scroll (modal/menu). ×2 |
| **`data-skin`** | Seletor de controller de página. `<main data-skin="home">` instancia a skin "home" |

**Reveal de texto (linha/char):** `.char` faz `opacity:[0,1]` + `x:["-50%","0%"]`, `duration:.3`, `stagger(.03, {start:.03})`, `color` saindo de `#035654`, composição `"replace"`. Glifos decorativos `.arr` recebem `randomPick(["‣",">","&","%","•","○"])` e piscam `opacity:[0,1,0]`.

### 4.2 O loop Lenis + anime.js (o insight central)

Existe **UM** relógio mestre — a engine de timer do anime.js — e ela dirige o Lenis:

```js
this.updTimer = anime.createTimer({ autoplay:false,
  onUpdate: i => this.updFn(i.currentTime * 1e3) });  // timeUnit="s" → *1000 = ms

function Jl(e){
  this.lenis && this.lenis.raf(e);   // ← anime tica o Lenis a cada frame
  this.GL    && this.GL.updFn();      // ← depois o hook WebGL/canvas
}
```

Cadeia: **anime.js engine RAF → updTimer.onUpdate → lenis.raf(time) → GL.updFn()**. Como o anime é dono do loop, todas as timelines `onScroll` (inclusive as `sync:1` scrubbed) e a posição virtual do Lenis avançam no mesmo frame — sem double-RAF. O Lenis principal é `autoRaf:false` + `.stop()` até a intro terminar. No Larafy, o equivalente é `autoRaf:false` + `gsap.ticker.add(t => lenis.raf(t*1000))`.

### 4.3 Scroll-progress via CSS vars (correção importante)

- **`--prg`** É escrito por JS, mas via a engine do anime (`anime.utils.set(t,{"--prg": r/duration})`), dirigido por **currentTime/duration de vídeo** e timelines de menu — não por um scroll-progress writer dedicado. CSS consome como `transform:scaleX(var(--prg))`.
- **`--prgsll` NÃO é tocado por JS** (`grep prgsll lumena.js` = 0). É dirigido por **CSS `scroll-timeline` nativo**: `@keyframes --hasoverflow{0%{--prgsll:0} to{--prgsll:1}}` + `.watchOF{scroll-timeline:--hasoverflow}`. É uma camada de progressive-enhancement do compositor.
- **`--aPer`** = percentual de hover-X (`pageX*100/width%`), dirige underline dual-gradient: `background-position: calc(100% - var(--aPer)) 100%, var(--aPer) 100%`.

### 4.4 Acessibilidade — `prefers-reduced-motion`

**Parcial, e só pelo Splide** (`grep prefers-reduced-motion lumena.js` = 1, dentro do Splide). A engine bespoke do anime **NÃO** checa motion preference — os `matchMedia` dela são só de capability (`hover:none`, `pointer:fine`, breakpoints). **Esta é a falha de acessibilidade clara do sistema.** Numa replicação, adicione `if (matchMedia("(prefers-reduced-motion: reduce)").matches)` para curto-circuitar os reveals (pular pro estado final) e pular `lenis.start()` (fallback para scroll nativo). O Larafy já faz isso parcialmente em `home-animations.tsx`.

### 4.5 Catálogo de padrões — Padrão | Lumena | Replicar no Larafy | Esforço

| # | Padrão | Como o Lumena faz | Como replicar no Larafy | Esforço |
|---|---|---|---|---|
| 1 | **Reveal de linha/char** | `anime.text.splitText` → `.char` opacity 0→1 + x −50%→0%, `stagger(.03)`, cor de `#035654`, `"replace"` | GSAP `SplitText({type:"lines",mask:"lines"})` + `gsap.from(lines,{yPercent:100,stagger:.08, scrollTrigger})` | **M** |
| 2 | **Glyph-scramble accent** | `.arr` recebe `randomPick(glyphs)` + blip `[0,1,0]` | Componente React: state com `setInterval` trocando glifos | S (opcional) |
| 3 | **Scroll-reveal universal** | `onScroll({enter,leave,target})` por asset | Framer `whileInView` (já em `lib/scroll-motion.ts`) **ou** ScrollTrigger batch | **S** (já existe) |
| 4 | **Fade-up staggered** | `.add(x,{y:"0%",opacity:[0,1],duration:.4,delay:stagger(.02)})` | `fadeUpVariants` + `staggerDelay()` de `lib/scroll-motion.ts` | **S** (já existe) |
| 5 | **Seção pinned/scrubbed** | `onScroll({enter:"top top",leave:"bottom bottom-=50lvh",sync:1})` dirige `--prg` | ScrollTrigger `{pin:true, scrub:true, onUpdate}` | **L** |
| 6 | **Barra de progresso** | CSS `scaleX(var(--prg))` de `--prg` JS | ScrollTrigger `scrub` + `onUpdate:self=>el.style.setProperty('--prg',self.progress)` | **S** |
| 7 | **Marquee horizontal** | timeline `--x:-(1+g)*p px` por slide | GSAP `xPercent:-50, repeat:-1, ease:"none"` (ver §7e). Larafy já tem CSS marquee em `logos-carousel-section.module.css` | **S** |
| 8 | **Carrossel draggable** | anime `createDraggable` + Splide | **embla-carousel** (já instalado) com plugin de drag | **M** |
| 9 | **Underline magnético** (`.aPer`) | `--aPer=pageX*100/width%` → dual bg-position | `onMouseMove` → `setProperty('--aPer', pct)` + CSS dual-gradient | **S** |
| 10 | **Nav hide/skin on scroll** | `createTimer`+`onScroll` toggle classes | Já existe em `header.tsx` (scroll listener rAF-throttled); estender com Lenis `useLenis` | **S** (parcial) |
| 11 | **Modal/overlay** | timeline `--prg:1` + Lenis aninhado | Radix Dialog (shadcn já presente) + `data-lenis-prevent` no scroll interno | **M** |
| 12 | **Page transition** | `popFn` intercepta nav, `--prg` 0↔1 | `framer-motion` `AnimatePresence` + Next route transitions | **L** |
| 13 | **Mídia lazy responsiva** | `createScope.mediaQueries` swap `data-src{sm,lg}` | `next/image` com `sizes` (nativo) | **S** (nativo) |
| 14 | **Vídeo autoplay-in-view** | `data-auto` play/pause via `onScroll` | IntersectionObserver (`hooks/use-scroll-animation.ts`) + `video.play()/pause()` | **S** |
| 15 | **Smooth anchor scroll** | `lenis.scrollTo(href,{offset})` | `useLenis()` → `lenis.scrollTo` | **S** |
| 16 | **ASCII-art canvas vídeo** (assinatura) | vídeo→canvas→`getImageData`→`fillText` com glyph ramp por luminância | Componente React `<AsciiVideo>` com `requestAnimationFrame` + canvas 2d | **L** (só se quiser o efeito-assinatura) |

> Nenhum count-up/odometer real foi encontrado — os números são `innerText="0N"` estáticos do stepper do slider. O Larafy JÁ tem `AnimatedCounter` em `hero-section.tsx` se quiser esse efeito.

---

## 5. Inventário de componentes

### Shell da página
`<body>` → `.waiter` (preloader branco fixed, removido pela timeline de entrada) → `#app` → `<nav>` → `<main class="VIU home" data-skin="home">` → `<footer>` (footer fica DENTRO de `#app`).

### Seção por seção (ordem do DOM)

| # | Seção | Propósito | Vale replicar? |
|---|---|---|---|
| — | `nav.nav` | Header sticky + menu overlay + drawer de contato | **Sim** — Larafy já tem `header.tsx`; adicionar drawer (Radix Sheet) |
| 1 | `home_intro` | Hero 2-col (texto L / mídia ASCII R) + "Discover more" | **Sim** — padrão de hero forte |
| 2 | `home_claim` | Pull-quote com bg full-bleed parallax | Adaptar |
| 3 | `home_ings` | "Fact Based Insights" — 4 cards de estatística | **Sim** — Larafy já tem `stats` section |
| 4 | `home_off` (#advisory) | Advisory — acordeão de 5 serviços (**CSS-only**, checkbox) | **Sim** — usar Radix Accordion |
| 5 | `home_hum` | "Back to Human" — statement sobre vídeo ASCII | Só se quiser ASCII |
| 6 | `home_spk` (#keynotes) | Keynotes — 4 cards de talk | **Sim** — padrão de card grid |
| 7 | `home_ac` | Educação Executiva — bg parallax + acordeão | Adaptar |
| 8 | `home_logos` | Strip de logos + CTA | **Sim** — Larafy já tem `logos-carousel-section` |
| 9 | `home_about` | Bio (numerada `03`) + expand `.nfo` | Adaptar |
| 10 | `home_cola` | Collaborators — carrossel Splide de fotos circulares | **Sim** — usar embla |
| 11 | `home_why` | "Why" — 3 slides scroll-pinned, cada um vídeo ASCII | Só o pinning, não o ASCII |
| — | `footer.foot` | Footer 4-col + newsletter | **Sim** — Larafy já tem `footer.tsx` |

### Componentes reutilizáveis que valem a pena

- **Acordeão CSS-only** (`grid-template-rows:0fr→1fr`) — elegante; mas no Larafy use **Radix Accordion** (acessível, com `aria-expanded` que o Lumena NÃO tem).
- **Picture com aspect-ratio via CSS var** (`style="--ratio:660/384"`) — zero CLS. No Larafy, `next/image` com `width/height` já resolve.
- **Sistema numerado de seção** (`01`/`02`/`03` editorial wayfinding) — copyável, barato, forte visualmente.
- **`.aPer` directional hover-fill** — reutilizável em todos os links/botões (ver §7d).
- **Preloader → entrance choreography** — opcional; pesa na percepção de performance.

### Caveats de acessibilidade do Lumena (NÃO replicar os defeitos)
- **Sem `<h1>` real** — hero é `<h2 class="h1">`. **Corrija no Larafy:** use `<h1>` semântico.
- **Alt text fraco** — quase todo `<img>` repete o mesmo alt boilerplate. **Corrija:** alt descritivo por imagem.
- **Acordeão sem `aria-expanded`/`aria-controls`** — toggles visuais não anunciados. **Corrija:** Radix Accordion.

---

## 6. Plano de replicação para o Larafy (P0/P1/P2)

> Aproveitar o que já existe: `lib/scroll-motion.ts` (variants Framer), `hooks/use-scroll-animation.ts` (IO hook), `components/sections/home-animations.tsx` (driver GSAP/ScrollTrigger global). Consolidar, não recomeçar.

### P0 — Fundação (faça primeiro)

**P0.1 — Instalar e configurar Lenis**
- O que: `npm i lenis`. Criar `components/smooth-scroll.tsx` (provider) e montar em `app/layout.tsx`. Dirigir via `gsap.ticker` (`autoRaf:false`), com `prefers-reduced-motion` guard.
- Arquivos: novo `components/smooth-scroll.tsx`; editar `app/layout.tsx`.
- Snippet: ver §7a. Trocar o CSS `scroll-behavior:smooth` atual por Lenis.

**P0.2 — Centralizar registro GSAP**
- O que: criar `lib/gsap.ts` que registra plugins UMA vez (`ScrollTrigger`, `SplitText`, `useGSAP`) e exporta. Hoje o registro está duplicado em `home-animations.tsx` e `teste-animacoes/page.tsx`.
- Arquivos: novo `lib/gsap.ts`; refatorar os dois consumidores.

```ts
// lib/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";   // já presente em node_modules
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.ticker.lagSmoothing(0);
}
export { gsap, ScrollTrigger, SplitText, useGSAP };
```

**P0.3 — Tokens de design no `globals.css`**
- O que: colar o bloco `@theme` da §3.6 em `app/globals.css` (o ATIVO). Adicionar a curva `--ease-default` e usá-la nas transitions existentes. Decidir: manter paleta Larafy (navy/ciano) ou adotar a estrutura Lumena.
- Arquivos: `app/globals.css`. **NÃO** editar `styles/globals.css` (morto).

### P1 — Padrões core de motion

**P1.1 — Helper de split-text reveal**
- O que: criar `components/split-reveal.tsx` (GSAP SplitText + ScrollTrigger, `mask:"lines"`, `split.revert()` no cleanup). Substituir o `splitTitleIntoWords` frágil de `home-animations.tsx`.
- Arquivos: novo `components/split-reveal.tsx`; corrigir o typo `data-gsap-tittle`→`data-gsap-title` em `hero-section.tsx`.
- Snippet: ver §7b.

**P1.2 — Parallax / scroll-progress → CSS var**
- O que: hook `useScrollProgressVar` que escreve `--prg` num elemento (preserva a arquitetura CSS-var do Lumena). Via Framer `useMotionValueEvent` ou ScrollTrigger `onUpdate`.
- Arquivos: novo `hooks/use-scroll-progress.ts`.
- Snippet: ver §7c.

**P1.3 — Consolidar scroll-reveal**
- O que: padronizar nas seções existentes usando `lib/scroll-motion.ts` (Framer `whileInView` + variants). Para títulos, usar `<SplitReveal>`. Documentar a regra: "Framer para reveals de seção, GSAP para scrub/pin/split".
- Arquivos: as 18 seções em `components/sections/`.

### P2 — Polish & efeitos-assinatura

**P2.1 — Magnetic buttons** (§7d) — `gsap.quickTo`. Arquivos: novo `components/magnetic.tsx`.
**P2.2 — Underline directional hover `.aPer`** — CSS dual-gradient + `onMouseMove`. Arquivos: utilitário CSS em `globals.css` + wrapper.
**P2.3 — Marquee infinito** (§7e) — GSAP. Substituir/complementar o CSS marquee atual.
**P2.4 — Seções pinned** — ScrollTrigger `pin:true` (Larafy já tem clip-path morph em `teste-animacoes`).
**P2.5 — (opcional) ASCII-video** — só se quiser o efeito-assinatura; alto custo.

---

## 7. Snippets prontos (React 19 / Next 16 / TS / Tailwind v4)

### (a) ReactLenis provider para Next 16 App Router

```tsx
// components/smooth-scroll.tsx
"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // fallback: scroll nativo, sem smooth

    // Dirige o Lenis a partir do ticker ÚNICO do GSAP (evita double-RAF jitter)
    function raf(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000); // GSAP = segundos, Lenis = ms
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current?.lenis?.on?.("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();
    return () => { gsap.ticker.remove(raf); };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,            // = lerp:.1 do Lumena
        smoothWheel: true,
        syncTouch: false,     // Lumena desabilita smoothWheel no touch
        wheelMultiplier: 0.8, // = wheelMultiplier:.8 do Lumena
        autoRaf: false,       // CRÍTICO: RAF entregue ao gsap.ticker
      }}
    >
      {children}
    </ReactLenis>
  );
}
export { useLenis };
```

```tsx
// app/layout.tsx — adicionar o provider em volta do conteúdo
import SmoothScroll from "@/components/smooth-scroll";
// ...dentro do <body className={`${montserrat.variable} ${inter.variable} ...`}>
<SmoothScroll>{children}</SmoothScroll>
```

Regras de ouro: `autoRaf:false` + `gsap.ticker.add(lenis.raf)`; `lagSmoothing(0)`; `ScrollTrigger.refresh()` após init; `data-lenis-prevent` em painéis com scroll interno (modais/drawers) — `lenis/react` honra nativamente; `useLenis(cb)` em qualquer filho client para subscrever scroll sem prop-drilling.

### (b) Split-text reveal com GSAP (espelha o `data-split="lines:true"` do Lumena)

```tsx
// components/split-reveal.tsx
"use client";
import { useRef } from "react";
import { gsap, SplitText, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Props = {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  type?: "lines" | "words" | "chars";
  className?: string;
};

export function SplitReveal({ children, as: Tag = "h2", type = "lines", className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const split = new SplitText(ref.current!, { type, mask: type });
    const targets = split[type as "lines"]; // split.lines | split.words | split.chars
    gsap.from(targets, {
      yPercent: 100,
      opacity: 0,
      duration: 0.6,                       // = .3-.6s do Lumena
      ease: "power3.out",                  // ~ cubic-bezier(.55,0,.1,1)
      stagger: type === "chars" ? 0.03 : 0.08, // chars = stagger(.03) do Lumena
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
    return () => split.revert(); // obrigatório no cleanup (React 19 StrictMode-safe)
  }, { scope: ref });

  return <Tag ref={ref as any} className={className}>{children}</Tag>;
}
```

> Alternativa SEM SplitText (se preferir não depender do plugin): split em JSX com Framer — `text.split(" ").map(...)` dentro de um `motion` container com `variants` + `staggerChildren`. Bom para headlines curtas; você cuida do line-wrap/acessibilidade na mão.

### (c) Parallax via scroll-progress → CSS var (preserva a arquitetura `--prg` do Lumena)

```tsx
// hooks/use-scroll-progress.ts
"use client";
import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/** Escreve o progresso de scroll [0..1] numa CSS var (ex.: --prg) do elemento.
 *  CSS consome: transform: scaleX(var(--prg)) | translateY(calc(var(--prg) * -50%)) */
export function useScrollProgressVar(varName = "--prg") {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // ~ enter "top bottom" / leave "bottom top"
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    ref.current?.style.setProperty(varName, String(v));
  });
  return ref;
}
```

```tsx
// uso:
const ref = useScrollProgressVar("--prg");
<section ref={ref} className="parallax">
  <div className="parallax__bg" /> {/* CSS: transform: translateY(calc(var(--prg,0) * -30%)) */}
  <div className="progress-bar" /> {/* CSS: transform: scaleX(var(--prg,0)); transform-origin:left */}
</section>
```

> Variante GSAP (para pinning, que o Framer não faz nativo):
> ```ts
> ScrollTrigger.create({ trigger: el, start:"top top", end:"bottom top", scrub:true,
>   onUpdate: self => el.style.setProperty("--prg", String(self.progress)) });
> ```

### (d) Magnetic button + underline directional `.aPer`

```tsx
// components/magnetic.tsx
"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Magnetic({ children, strength = 0.4 }: { children: React.ReactElement; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<(v: number) => void>(null);
  const yTo = useRef<(v: number) => void>(null);

  useGSAP(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // só fine pointer (= isFinePointer do Lumena)
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.4, ease: "power3.out" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.4, ease: "power3.out" });
  }, { scope: ref });

  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    xTo.current?.(x); yTo.current?.(y);
  }
  function onLeave() { xTo.current?.(0); yTo.current?.(0); }

  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">{children}</div>;
}
```

```css
/* Underline directional .aPer — cole em globals.css. JS abaixo seta --aPer. */
.aper-link {
  --aPer: 0%;
  background-image: linear-gradient(#0000,#0000), linear-gradient(currentColor,currentColor);
  background-size: 100% 1px, 0% 1px;
  background-repeat: no-repeat;
  background-position: calc(100% - var(--aPer)) 100%, var(--aPer) 100%;
  transition: background-size .6s var(--ease-default), background-position .3s var(--ease-default);
}
```
```tsx
// onMouseMove no link: const r = el.getBoundingClientRect();
// el.style.setProperty("--aPer", `${(e.clientX - r.left) * 100 / r.width}%`);
```

### (e) Marquee infinito (seamless, espelha o `--x` do Lumena)

```tsx
// components/marquee.tsx
"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // duplicar o conteúdo no JSX (children renderizado 2x) e mover -50% em loop
    gsap.to(track.current, { xPercent: -50, repeat: -1, ease: "none", duration: speed });
  }, { scope: track });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={track} className="inline-flex gap-[var(--space-gap-x)] will-change-transform">
        {children}{children /* cópia para o wrap seamless */}
      </div>
    </div>
  );
}
```

> O Larafy já tem um marquee em CSS puro (`logos-carousel-section.module.css`, `@keyframes marquee` translateX 0→-25% com 4× duplicação). Para velocidade modulada por scroll-velocity (o sabor award-site), migre para o GSAP acima e module o `timeScale` com `lenis.velocity` via `useLenis`.

---

## 8. Quais elementos fazem sentido para o Larafy

> Recomendação editorial honesta. O Larafy é **agência/produto de reforma tributária** (paleta navy/ciano, tom tech/confiança), diferente da consultoria editorial premium da Lumena (creme/teal, tom institucional sóbrio). Copie a *engenharia de motion*, não a *identidade*.

### ✅ COPIAR (alto valor, baixo risco)
- **Loop único Lenis + GSAP ticker** (§7a). É a base de toda a suavidade percebida. P0.
- **A curva de easing única** `cubic-bezier(.55,0,.1,1)` aplicada consistentemente. Barato, profissionaliza tudo na hora. O Larafy hoje usa `[0.16,1,0.3,1]` no Framer — unifique as duas no mesmo token.
- **Split-text reveal por linha com mask** (§7b). Eleva headings imediatamente; substitui o `splitTitleIntoWords` frágil.
- **Sistema de tokens estruturais** (grid fluido, spacing rem, type clamp) — §3.6. Dá coerência ao site inteiro.
- **Scroll-progress → CSS var** (§7c) para parallax/progress bars — preserva uma arquitetura limpa e desacoplada.
- **Sistema numerado de seções** (`01/02/03`) — wayfinding editorial barato e elegante.
- **Magnetic buttons + underline directional** (§7d) — polish de detalhe que sinaliza craft.

### 🔧 ADAPTAR (bom, mas ajustar à marca/stack)
- **Carrossel:** usar **embla** (já instalado), não Splide. Mesmo resultado, uma dependência a menos.
- **Acordeão:** usar **Radix Accordion** (shadcn), não o checkbox CSS-only — ganha acessibilidade que o Lumena não tem.
- **Mídia responsiva/lazy:** `next/image` nativo cobre `data-srcsm/lg` + decode + CLS sem código custom.
- **Paleta:** manter navy/ciano do Larafy; só importar a *estrutura de papéis* (bg/surface/ink/muted/accent/line).
- **Marquee:** migrar do CSS atual para GSAP só se quiser velocity-modulation; senão o CSS atual basta.

### ❌ NÃO COPIAR (e por quê)
- **ASCII-art canvas vídeo** — é a assinatura *da Lumena*, custo alto, e não comunica nada da proposta do Larafy (reforma tributária). Seria mímica vazia. Pule, a menos que vire um conceito criativo próprio.
- **A paleta creme/teal/amarelo** — conflita com a identidade Larafy. Copiar cor seria perder marca.
- **TWK Lausanne** — fonte paga (ver §9). Use Inter/Geist (já no projeto).
- **Os defeitos de acessibilidade** — sem `<h1>`, alt boilerplate repetido, acordeão sem ARIA, sem `prefers-reduced-motion` na engine custom. O Larafy deve fazer MELHOR: `<h1>` semântico, alt descritivo, Radix ARIA, guard de reduced-motion em todos os sistemas.
- **Preloader `.waiter`** — opcional; adiciona delay percebido. Só vale se o entrance for realmente impressionante.
- **Page transitions full `popFn`** — alto custo no App Router; deixe para depois (P2+), não é diferencial para o público do Larafy.
- **Splide e anime.js** — não adicione ao Larafy; GSAP + Framer + embla já cobrem 100% dos padrões. Adicionar anime.js seria duplicar engines.

### Consolidação recomendada
O Larafy tem hoje **três sistemas de motion concorrentes** (GSAP attr-driven em `home-animations.tsx`, Framer per-section via `lib/scroll-motion.ts`, IO+CSS via `use-scroll-animation.ts`). Convenção sugerida, alinhada ao Lumena:
- **GSAP + ScrollTrigger + Lenis** → scrub, pin, split-text, marquee, magnetic (seções de marketing pesadas).
- **Framer Motion** → reveals de entrada de seção, hover, layout (UI component-level). Continuar usando `lib/scroll-motion.ts`.
- **IO+CSS hook** → deprecar gradualmente em favor de Framer `whileInView` (mesma semântica, menos código).

---

## 9. Notas legais / licenças

| Item | Licença / status | Ação para o Larafy |
|---|---|---|
| **TWK Lausanne 450** (Weltkern) | **Comercial PAGA** (TYPE.WELTKERN®, © 2017-2020) | **NÃO usar.** Substituir por Inter / Geist Sans / Hanken Grotesk (free, OFL) |
| **Roboto Mono** | **Apache 2.0 / free** (Google) | Pode usar via `next/font/google` |
| **anime.js v4.2.1** | **MIT** | Livre p/ uso comercial — mas no Larafy não é necessário (use GSAP) |
| **Lenis 1.3.11** | **MIT** (Darkroom Engineering) | Livre — pode instalar e usar |
| **GSAP 3.13+ (inclui SplitText, ScrollTrigger)** | **Free** desde aquisição Webflow (2025) | Já no projeto; SplitText agora gratuito |
| **Framer Motion / embla** | MIT/free | Já instalados |
| **Splide 4.1.4** | MIT | Não precisa (use embla) |
| **Conteúdo, imagens, vídeos, textos da Lumena** | **Copyright Lumena Partners** | **NÃO copiar** nada de conteúdo/mídia. Replicar apenas *padrões técnicos e arquiteturais*, com conteúdo 100% próprio do Larafy |
| Efeito ASCII / estética geral | Não é protegível como "look", mas é assinatura de marca de terceiros | Evitar mímica direta; reinterpretar se quiser |

**Resumo legal:** todo o *stack de animação* é livremente portável (anime/Lenis MIT, GSAP free). O que NÃO se copia é a **fonte paga** (use alternativa free) e qualquer **conteúdo/mídia/identidade visual** da Lumena. Este guia replica técnica e arquitetura — não o site.

---

### Arquivos-chave do Larafy a tocar (referência rápida)
- `/Users/rafael/Documents/Site Larafy/Site-larafy/app/layout.tsx` — montar `<SmoothScroll>`, fontes (add Roboto Mono)
- `/Users/rafael/Documents/Site Larafy/Site-larafy/app/globals.css` — tokens `@theme` (ATIVO; `styles/globals.css` está MORTO)
- `/Users/rafael/Documents/Site Larafy/Site-larafy/lib/gsap.ts` — **criar** (registro central de plugins)
- `/Users/rafael/Documents/Site Larafy/Site-larafy/components/smooth-scroll.tsx` — **criar** (provider Lenis)
- `/Users/rafael/Documents/Site Larafy/Site-larafy/components/split-reveal.tsx` — **criar** (split-text)
- `/Users/rafael/Documents/Site Larafy/Site-larafy/hooks/use-scroll-progress.ts` — **criar** (CSS var)
- `/Users/rafael/Documents/Site Larafy/Site-larafy/components/magnetic.tsx`, `marquee.tsx` — **criar**
- `/Users/rafael/Documents/Site Larafy/Site-larafy/lib/scroll-motion.ts` — **reusar** (variants Framer; unificar ease com `--ease-default`)
- `/Users/rafael/Documents/Site Larafy/Site-larafy/hooks/use-scroll-animation.ts` — **reusar/deprecar** gradualmente
- `/Users/rafael/Documents/Site Larafy/Site-larafy/components/sections/home-animations.tsx` — refatorar (usar `lib/gsap.ts`; trocar `splitTitleIntoWords` por `<SplitReveal>`; corrigir typo `data-gsap-tittle`)