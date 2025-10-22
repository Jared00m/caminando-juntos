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
          <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
            <div className="container flex h-16 items-center">
              <div className="mr-4 hidden md:flex">
                <a className="mr-8 flex items-center space-x-2 group" href="/">
                  <div className="w-8 h-8 bg-gradient-to-br from-celestial-blue to-sunrise-gold rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-celestial-blue to-deep-indigo bg-clip-text text-transparent">
                    Dios Habla
                  </span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a href="/" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    Inicio
                  </a>
                  <a href="/articulos" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    Artículos
                  </a>
                  <a href="/videos" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    Videos
                  </a>
                  <a href="/estudios" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    Estudios
                  </a>
                  <a href="/eventos" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    Eventos
                  </a>
                  <a href="/encuentra-ayuda" className="transition-colors hover:text-celestial-blue text-foreground/70">
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
          <footer className="border-t bg-gradient-to-br from-deep-indigo to-celestial-blue text-white py-8 md:py-12">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                    </div>
                    <span className="font-bold text-xl">Dios Habla</span>
                  </div>
                  <p className="text-white/80 text-sm text-center md:text-left max-w-md">
                    Luz para tu camino. Explorando el mensaje que transforma vidas.
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white/90 text-sm leading-relaxed">
                    © 2025 Dios Habla. Todos los derechos reservados.
                  </p>
                  <p className="text-white/70 text-xs mt-2">
                    Compartiendo esperanza y verdad en español
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <ChatwootWidget />
      </body>
    </html>
  )
}