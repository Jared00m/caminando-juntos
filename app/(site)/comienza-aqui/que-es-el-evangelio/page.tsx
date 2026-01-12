import { YouTube } from '@/components/YouTube'
import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { getDictionary, Locale } from '@/lib/i18n'
import { cookies } from 'next/headers'

export default async function WhatIsGospelPage() {

  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'es') as Locale
  const dict = getDictionary(locale)

  return (
    <div className="min-h-screen">
      <Hero 
        title={dict.gospel.title}
        subtitle={dict.gospel.subtitle}
        variant="gospel"
      />

      {/* Video Section */}
      <section className="container mx-auto px-4 -mt-12 mb-16 max-w-4xl">
        <div className="rounded-lg overflow-hidden">
          <YouTube id={dict.gospel.videoId}/>
        </div>
      </section>

      {/* Content Cards */}
      <section className="container mx-auto px-4 mb-16 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: The Problem */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#1E88E5] hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#1E88E5]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#1E88E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{dict.gospel.problem.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {dict.gospel.problem.description}
            </p>
            <p className="text-sm text-gray-500 italic">
              {dict.gospel.problem.verse}
            </p>
          </div>

          {/* Card 2: The Solution */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#FBC02D] hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#FBC02D]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#FBC02D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{dict.gospel.solution.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {dict.gospel.solution.description}
            </p>
            <p className="text-sm text-gray-500 italic">
              {dict.gospel.solution.verse}
            </p>
          </div>

          {/* Card 3: The Response */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#43A047] hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#43A047]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#43A047]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{dict.gospel.response.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {dict.gospel.response.description}
            </p>
            <p className="text-sm text-gray-500 italic">
              {dict.gospel.response.verse}
            </p>
          </div>
        </div>
      </section>

      <CallToAction
        title={dict.gospel.cta.title}
        subtitle={dict.gospel.cta.subtitle}
        actions={[
          { href: '/comienza-aqui/primeros-pasos', label: dict.gospel.cta.firstSteps, variant: 'primary' },
          { href: '/estudios', label: dict.gospel.cta.studies, variant: 'accent' },
          { href: '/comunidad/encuentra-iglesia', label: dict.gospel.cta.findChurch, variant: 'ghost' }
        ]}
      />
    </div>
  )
}
