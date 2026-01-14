import { cookies } from 'next/headers'
import { dictionaries } from '@/lib/i18n'
import Link from 'next/link'

export default async function HomePage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value === 'pt' ? 'pt' : 'es'
  const dict = dictionaries[locale]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {dict.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              {dict.home.hero.subtitle}
            </p>
            <a 
              href="/comienza-aqui/que-es-el-evangelio" 
              className="group inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">{dict.home.hero.cta}</span>
              <svg className="ml-2 w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Journey Title */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {dict.home.journey.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {dict.home.journey.subtitle}
          </p>
        </div>
      </section>

      {/* Journey Path Container - wraps all 3 steps */}
      <div className="relative">

      {/* Step 1: Explore */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 animate-fade-in-left">
                <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
                  {dict.home.step1.badge}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {dict.home.step1.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {dict.home.step1.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/comienza-aqui/que-es-el-evangelio" className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:scale-105">
                    <span>{dict.home.step1.cta}</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="/comienza-aqui/testimonios" className="inline-flex items-center px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:shadow-md hover:scale-105">
                    {dict.common.nav.testimonies}
                  </a>
                </div>
              </div>
              <div className="order-1 md:order-2 animate-fade-in-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-12 shadow-xl hover:shadow-2xl transition-shadow">
                    <svg className="w-full h-48 text-blue-600 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: Go Deeper */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-2xl blur-2xl opacity-20 animate-pulse animation-delay-1000"></div>
                  <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-12 shadow-xl hover:shadow-2xl transition-shadow">
                    <svg className="w-full h-48 text-green-600 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="animate-fade-in-right">
                <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
                  {dict.home.step2.badge}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {dict.home.step2.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {dict.home.step2.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/estudios" className="group inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all hover:shadow-lg hover:scale-105">
                    <span>{dict.home.step2.cta}</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link href="/profundiza/apologetica" className="inline-flex items-center px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all hover:shadow-md hover:scale-105">
                    {dict.common.nav.apologetics}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Community */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 animate-fade-in-left">
                <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
                  {dict.home.step3.badge}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {dict.home.step3.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {dict.home.step3.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/comunidad/encuentra-mentor" className="group inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all hover:shadow-lg hover:scale-105">
                    <span>{dict.home.step3.cta}</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="/comunidad/chat" className="inline-flex items-center px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all hover:shadow-md hover:scale-105">
                    {dict.common.nav.chat}
                  </a>
                </div>
              </div>
              <div className="order-1 md:order-2 animate-fade-in-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-400 rounded-2xl blur-2xl opacity-20 animate-pulse animation-delay-2000"></div>
                  <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-12 shadow-xl hover:shadow-2xl transition-shadow">
                    <svg className="w-full h-48 text-purple-600 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div> {/* End Journey Path Container */}

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'pt' ? 'Pronto para começar?' : '¿Listo para comenzar?'}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {locale === 'pt' ? 'Dê o primeiro passo em sua jornada de descoberta hoje.' : 'Da el primer paso en tu viaje de descubrimiento hoy.'}
            </p>
            <a 
              href="/comienza-aqui/que-es-el-evangelio" 
              className="group inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl hover:scale-105 relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative">{dict.home.hero.cta}</span>
              <svg className="ml-2 w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}