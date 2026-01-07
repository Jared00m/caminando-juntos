import { cookies } from 'next/headers'
import { getDictionary, Locale } from '@/lib/i18n'
import { LocalChurches } from '@/components/LocalChurches'

export default async function FindChurchPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'es') as Locale
  const dict = getDictionary(locale)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-6 text-deep-indigo">{dict.churches.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">{dict.churches.subtitle}</p>
      </div>

      <LocalChurches dictionary={dict.churches} />
    </div>
  )
}
