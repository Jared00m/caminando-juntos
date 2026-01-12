interface HeroProps {
  title: string
  subtitle?: string
  variant?: 'gospel' | 'jesus' | 'default'
  gradientClass?: string
}

const gradientVariants = {
  gospel: 'bg-gradient-to-br from-[#1E88E5] via-[#1E88E5] to-[#FBC02D]',
  jesus: 'bg-gradient-to-br from-[#283593] via-[#1E88E5] to-[#43A047]',
  default: 'bg-gradient-to-br from-[#1E88E5] to-[#283593]'
}

export function Hero({ title, subtitle, variant = 'default', gradientClass }: HeroProps) {
  const gradient = gradientClass || gradientVariants[variant]

  return (
    <section className={`relative ${gradient} text-white py-16 px-4`}>
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
