import { Metadata } from 'next'
import '../styles/globals.css'
import { Analytics } from '@/components/Analytics'
import { ChatwootWidget } from '@/components/ChatwootWidget'
import { AuthProvider } from '@/lib/auth-context'
import { AuthButton } from '@/components/AuthButton'
import { AuthErrorHandler } from '@/components/AuthErrorHandler'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { getDictionary, Locale } from '@/lib/i18n'
import { CountrySwitcher } from '@/components/CountrySwitcher'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'es') as Locale
  const dict = getDictionary(locale)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: [...dict.metadata.keywords],
    authors: [{ name: 'Caminando Juntos' }],
    creator: 'Caminando Juntos',
    metadataBase: new URL('https://cjuntos.org'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'es_ES',
      url: 'https://cjuntos.org',
      title: dict.metadata.title,
      description: dict.metadata.description,
      siteName: 'Caminando Juntos',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: 'Caminando Juntos',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ['/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'es') as Locale
  const dict = getDictionary(locale)

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <Analytics />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <Suspense fallback={null}>
            <AuthErrorHandler />
          </Suspense>
          <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
            <div className="container flex h-16 items-center">
              <div className="mr-4 hidden md:flex">
                <a className="mr-8 flex items-center space-x-3 group" href="/">
                  <img 
                    src="/logo.png" 
                    alt="Caminando Juntos" 
                    className="h-10 w-auto group-hover:scale-105 transition-transform"
                  />
                  <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-celestial-blue to-deep-indigo bg-clip-text text-transparent">
                    Caminando Juntos
                  </span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a href="/" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    {dict.common.home}
                  </a>
                  <a href="/articulos" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    {dict.common.articles}
                  </a>
                  <a href="/videos" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    {dict.common.videos}
                  </a>
                  <a href="/estudios" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    {dict.common.studies}
                  </a>
                  <a href="/eventos" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    {dict.common.events}
                  </a>
                  <a href="/encuentra-ayuda" className="transition-colors hover:text-celestial-blue text-foreground/70">
                    {dict.common.findHelp}
                  </a>
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <CountrySwitcher />
                <AuthButton dictionary={dict.common.auth} />
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
                    <span className="font-bold text-xl">Caminando Juntos</span>
                  </div>
                  <p className="text-white/80 text-sm text-center md:text-left max-w-md">
                    {dict.common.footer.tagline}
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white/90 text-sm leading-relaxed">
                    © 2025 Caminando Juntos. {dict.common.footer.rights}
                  </p>
                  <p className="text-white/70 text-xs mt-2">
                    {dict.common.footer.sharing}
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <ChatwootWidget />
        </AuthProvider>
      </body>
    </html>
  )
}