import { YouTube } from '@/components/YouTube'
import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { getDictionary, Locale } from '@/lib/i18n'
import { cookies } from 'next/headers'

export default async function WhoIsJesusPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'es') as Locale
  const dict = getDictionary(locale)

  return (
    <div className="min-h-screen">
      <Hero 
        title={dict.whoIsJesus.title}
        subtitle={dict.whoIsJesus.subtitle}
        variant="jesus"
      />

      {/* Video Section */}
      <section className="container mx-auto px-4 -mt-12 mb-16 max-w-4xl">
        <div className="rounded-lg overflow-hidden">
          <YouTube id={dict.whoIsJesus.videoId} />
        </div>
      </section>

      {/* Content Cards */}
      <section className="container mx-auto px-4 mb-16 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Deity */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#283593] hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#283593]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#283593]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{dict.whoIsJesus.deity.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {dict.whoIsJesus.deity.description}
            </p>
            <p className="text-sm text-gray-500 italic">
              {dict.whoIsJesus.deity.verse}
            </p>
          </div>

          {/* Card 2: Purpose */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#1E88E5] hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#1E88E5]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#1E88E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{dict.whoIsJesus.purpose.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {dict.whoIsJesus.purpose.description}
            </p>
            <p className="text-sm text-gray-500 italic">
              {dict.whoIsJesus.purpose.verse}
            </p>
          </div>

          {/* Card 3: Victory */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#43A047] hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#43A047]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#43A047]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{dict.whoIsJesus.victory.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {dict.whoIsJesus.victory.description}
            </p>
            <p className="text-sm text-gray-500 italic">
              {dict.whoIsJesus.victory.verse}
            </p>
          </div>
        </div>
      </section>

      <CallToAction
        title={dict.whoIsJesus.cta.title}
        subtitle={dict.whoIsJesus.cta.subtitle}
        actions={[
          { href: '/comienza-aqui/que-es-el-evangelio', label: dict.whoIsJesus.cta.gospel, variant: 'primary' },
          { href: '/estudios', label: dict.whoIsJesus.cta.studies, variant: 'accent' },
          { href: '/comunidad/encuentra-iglesia', label: dict.whoIsJesus.cta.findChurch, variant: 'ghost' }
        ]}
      />
    </div>
  )
}
