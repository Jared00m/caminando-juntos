import { Metadata } from 'next'
import '../styles/globals.css'
import { Analytics } from '@/components/Analytics'
import { ChatwootWidget } from '@/components/ChatwootWidget'

export const metadata: Metadata = {
  title: 'Dios Habla - Conoce a Jesús',
  description: 'Descubre quién es Jesús a través de estudios bíblicos, artículos y recursos espirituales en español.',
  keywords: ['Jesús', 'evangelio', 'estudios bíblicos', 'fe cristiana', 'español'],
  authors: [{ name: 'Dios Habla' }],
  creator: 'Dios Habla',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'Dios Habla - Conoce a Jesús',
    description: 'Descubre quién es Jesús a través de estudios bíblicos, artículos y recursos espirituales en español.',
    siteName: 'Dios Habla',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <Analytics />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <span className="hidden font-bold sm:inline-block">
                    Dios Habla
                  </span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Inicio
                  </a>
                  <a href="/articulos" className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Artículos
                  </a>
                  <a href="/videos" className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Videos
                  </a>
                  <a href="/estudios" className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Estudios
                  </a>
                  <a href="/eventos" className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Eventos
                  </a>
                  <a href="/encuentra-ayuda" className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Encuentra Ayuda
                  </a>
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  {/* Country switcher will go here */}
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2025 Dios Habla. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <ChatwootWidget />
      </body>
    </html>
  )
}