import type { Metadata, Viewport } from 'next'
import { Montserrat, Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from '@/components/smooth-scroll'
import { LoadingScreen } from '@/components/loading-screen'
import { Cursor } from '@/components/cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { MotionProvider } from '@/components/motion-provider'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'LaraFy - Reduzimos Impostos com Precisao Cirurgica',
  description: 'A decisao tributaria que seu negocio precisa, com resultados e ZERO riscos. Decisoes sustentadas por tecnologia exclusiva e execucao orientada a exito financeiro.',
  
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#04101f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-[#04101f] text-[#ffffff]" cz-shortcut-listen="true">
        <MotionProvider>
          <ScrollProgress />
          <Cursor />
          <SmoothScroll>
            <LoadingScreen />
            {children}
          </SmoothScroll>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
