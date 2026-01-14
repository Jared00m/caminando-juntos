import { cookies } from 'next/headers'

import { GospelPresentationClient } from './GospelPresentationClient'

type Locale = 'es' | 'pt'

export type GospelPresentationProps = {
	className?: string
	initialScreenId?:
		| 'intro'
		| 'creation'
		| 'rebellion'
		| 'darkness'
		| 'rescue'
		| 'response'
		| 'restoration'
		| 'decision'
	onSubmitted?: () => void
}

function normalizeLocale(value: string | undefined): Locale {
	return value === 'pt' ? 'pt' : 'es'
}

export async function GospelPresentation({ className, initialScreenId, onSubmitted }: GospelPresentationProps) {
	const cookieStore = await cookies()
	const locale = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)

	return (
		<GospelPresentationClient
			locale={locale}
			className={className}
			initialScreenId={initialScreenId}
			onSubmitted={onSubmitted}
		/>
	)
}
