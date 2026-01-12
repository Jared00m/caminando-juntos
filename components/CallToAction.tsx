import Link from 'next/link'

interface CTAAction {
  href: string
  label: string
  variant?: 'primary' | 'accent' | 'ghost'
}

interface CallToActionProps {
  title: string
  subtitle?: string
  actions: CTAAction[]
}

const buttonClasses = {
  primary: 'bg-white text-[#1E88E5] hover:bg-gray-100',
  accent: 'bg-[#FBC02D] text-gray-900 hover:bg-[#F9A825]',
  ghost: 'bg-transparent border-2 border-white text-white hover:bg-white/10'
}

export function CallToAction({ title, subtitle, actions }: CallToActionProps) {
  return (
    <section className="bg-[#f7f9fc] py-20 px-4">
      <div className="container mx-auto">
        <div className="relative isolate overflow-hidden max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#1E88E5] via-[#3A92F7] to-[#2F6FE3] px-8 py-14 shadow-2xl">
          <div className="absolute -top-10 -left-10 h-40 w-40 bg-white/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -right-20 h-48 w-48 bg-[#FBC02D]/35 blur-3xl" aria-hidden="true" />

          <div className="relative text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-lg md:text-xl mb-8 text-white/90">{subtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {actions.map(({ href, label, variant = 'primary' }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${buttonClasses[variant]} px-8 py-3 rounded-lg font-semibold transition-colors inline-block`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
