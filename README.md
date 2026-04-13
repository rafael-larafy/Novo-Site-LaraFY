# LaraFy - Site Institucional

Site institucional da **LaraFy**, empresa especializada em redução tributária com precisão e zero riscos. Construído com Next.js 16, React 19 e Tailwind CSS 4.

## Tecnologias

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI:** [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes:** [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Formulários:** React Hook Form + Zod
- **Analytics:** Vercel Analytics
- **Linguagem:** TypeScript

## Estrutura do Projeto

```
app/
├── page.tsx          # Landing page principal
├── blog/             # Blog
├── carreiras/        # Página de carreiras
├── cases/            # Cases de sucesso
├── contato/          # Página de contato
├── grupo/            # Sobre o grupo
├── metodo/           # Metodologia
├── sobre/            # Sobre a empresa
└── solucoes/         # Soluções oferecidas

components/
├── header.tsx        # Header/navegação
├── footer.tsx        # Footer
├── sections/         # Seções da landing page
│   ├── hero-section.tsx
│   ├── reforma-tributaria-section.tsx
│   ├── ceo-section.tsx
│   ├── blindagem-section.tsx
│   ├── transparencia-section.tsx
│   ├── zero-risco-section.tsx
│   ├── confianca-section.tsx
│   ├── logos-carousel-section.tsx
│   ├── diagnostico-section.tsx
│   ├── contato-section.tsx
│   └── ...
└── ui/               # Componentes base (shadcn/ui)
```

## Pré-requisitos

- Node.js >= 18
- npm >= 9

## Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd Site\ Larafy_React

# Instalar dependências
npm install
```

## Scripts

```bash
# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Linting
npm run lint
```

## Deploy

O projeto utiliza **Vercel** para deploy, com analytics integrado via `@vercel/analytics`.
