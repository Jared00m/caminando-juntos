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
import { MobileNav } from '@/components/MobileNav'
import { NavDropdown } from '@/components/NavDropdown'
import Link from 'next/link'
import Image from 'next/image'

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
    icons: {
      icon: '/favicon.png',
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
      <body className="min-h-screen font-sans antialiased">
        <AuthProvider>
          <Suspense fallback={null}>
            <AuthErrorHandler />
          </Suspense>
          <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <Link className="flex items-center gap-2 group" href="/">
                  <Image
                    src="/logo.png"
                    alt="Caminando Juntos"
                    width={180}
                    height={72}
                    className="h-9 w-auto transition-transform group-hover:scale-105"
                    priority
                  />
                  <span className="hidden md:block text-lg font-bold text-gray-800">
                    Caminando Juntos
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6">
                  <NavDropdown
                    label={dict.common.nav.startHere}
                    items={[
                      { label: dict.common.nav.whatIsGospel, href: '/comienza-aqui/que-es-el-evangelio' },
                      { label: dict.common.nav.whoIsJesus, href: '/comienza-aqui/quien-es-jesus' },
                      { label: dict.common.nav.testimonies, href: '/comienza-aqui/testimonios' },
                      { label: dict.common.nav.firstSteps, href: '/comienza-aqui/primeros-pasos' },
                    ]}
                  />
                  <NavDropdown
                    label={dict.common.nav.goDeeper}
                    items={[
                      { label: dict.common.nav.bibleStudies, href: '/estudios' },
                      { label: dict.common.nav.apologetics, href: '/profundiza/apologetica' },
                      { label: dict.common.nav.sharingFaith, href: '/profundiza/comparte-tu-fe' },
                    ]}
                  />
                  <NavDropdown
                    label={dict.common.nav.findCommunity}
                    items={[
                      { label: dict.common.nav.findMentor, href: '/comunidad/encuentra-mentor' },
                      { label: dict.common.nav.findChurch, href: '/comunidad/encuentra-iglesia' },
                      { label: dict.common.nav.chat, href: '/comunidad/chat' },
                    ]}
                  />
                  <NavDropdown
                    label={dict.common.nav.aboutUs}
                    items={[
                      { label: dict.common.nav.beliefs, href: '/acerca-de/creencias' },
                      { label: dict.common.nav.whoWeAre, href: '/acerca-de/quienes-somos' },
                      { label: dict.common.nav.contact, href: '/acerca-de/contacto' },
                    ]}
                  />
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                  <div className="hidden lg:block">
                    <CountrySwitcher />
                  </div>
                  <div className="hidden lg:block">
                    <AuthButton dictionary={dict.common.auth} />
                  </div>
                  <MobileNav dictionary={dict.common} />
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-gradient-to-br from-deep-indigo to-celestial-blue text-white py-8 md:py-12">
            <div className="container mx-auto">
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