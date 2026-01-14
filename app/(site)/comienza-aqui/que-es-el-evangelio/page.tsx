import { Hero } from '@/components/Hero'
import { GospelPresentation } from '@/components/GospelPresentation'
import { getDictionary, Locale } from '@/lib/i18n'
import { cookies } from 'next/headers'
import { CallToAction } from '@/components/CallToAction'

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

      {/* Interactive Gospel Presentation (Primary) */}
      <section className="container mx-auto px-4 -mt-12 mb-16 max-w-6xl relative z-10">
        <GospelPresentation />
      </section>

      {/* Call to Action */}
       <CallToAction
              title={dict.gospel.cta.title}
              subtitle={dict.gospel.cta.subtitle}
              actions={[
                { href: '/comienza-aqui/que-es-el-evangelio', label: dict.gospel.cta.firstSteps, variant: 'primary' },
                { href: '/estudios', label: dict.gospel.cta.studies, variant: 'accent' },
                { href: '/comunidad/encuentra-iglesia', label: dict.gospel.cta.findChurch, variant: 'ghost' }
              ]}
            />
    </div>
  )
}
