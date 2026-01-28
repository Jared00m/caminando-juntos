import { cookies } from 'next/headers'
import { getDictionary, type Locale } from '@/lib/i18n'

interface BeliefSection {
  title: string
  content: string
  references: string
  subsections?: Record<
    string,
    {
      title: string
      content: string
      references?: string
    }
  >
}

function BeliefSection({ section }: { section: BeliefSection }) {
  const hasSubsections = Boolean(section.subsections && Object.keys(section.subsections).length > 0)

  return (
    <details className="group border border-gray-200 rounded-lg overflow-hidden">
      <summary className="cursor-pointer bg-gray-50 hover:bg-gray-100 px-6 py-4 font-semibold text-lg text-gray-900 list-none flex items-center justify-between">
        <span>{section.title}</span>
        <span className="transition-transform group-open:rotate-180">▼</span>
      </summary>
      <div className="px-6 py-4 bg-white prose prose-sm max-w-none">
        <p>{section.content}</p>

        {hasSubsections && (
          <div className="mt-6 space-y-6">
            {Object.entries(section.subsections!).map(([key, subsection]) => (
              <div key={key}>
                <h4 className="font-semibold">{subsection.title}</h4>
                <p className="mt-2">{subsection.content}</p>
                {subsection.references && (
                  <p className="text-sm text-gray-600 mt-2">{subsection.references}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {section.references && (
          <p className="text-sm text-gray-600 mt-4">{section.references}</p>
        )}
      </div>
    </details>
  )
}

export default async function BeliefsPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'es') as Locale
  const dict = getDictionary(locale)
  const beliefs = dict.beliefs

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">{beliefs.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{beliefs.subtitle}</p>

      <div className="space-y-4">
        {Object.entries(beliefs.sections).map(([key, section]) => (
          <BeliefSection key={key} section={section as BeliefSection} />
        ))}
      </div>
    </div>
  )
}
