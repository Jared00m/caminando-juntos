import { CountrySwitcher } from '@/components/CountrySwitcher'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20 relative">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-celestial-blue/5 via-sunrise-gold/5 to-white -z-10 rounded-3xl"></div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-celestial-blue to-deep-indigo bg-clip-text text-transparent">
          Luz para tu camino
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Explora el mensaje que transforma vidas. Descubre la Biblia y conecta con una comunidad de fe cerca de ti.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/estudios" 
            className="inline-flex items-center justify-center rounded-lg bg-celestial-blue px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-celestial-blue/90 hover:shadow-xl hover:scale-105"
          >
            Descubre la Biblia
          </a>
          <a 
            href="/eventos" 
            className="inline-flex items-center justify-center rounded-lg border-2 border-celestial-blue bg-white px-8 py-4 text-base font-semibold text-celestial-blue shadow-md transition-all hover:bg-celestial-blue/5 hover:shadow-lg"
          >
            Encuentra una comunidad
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-deep-indigo">Explora el mensaje</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
          Recursos diseñados para ayudarte a descubrir verdades que transforman
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-celestial-blue to-deep-indigo rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-deep-indigo">Estudios Bíblicos</h3>
            <p className="text-muted-foreground leading-relaxed">
              Descubre paso a paso las verdades de la Biblia con estudios diseñados para tu crecimiento espiritual.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-sunrise-gold to-emerald-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-deep-indigo">Videos</h3>
            <p className="text-muted-foreground leading-relaxed">
              Contenido visual inspirador que complementa tu caminar de fe y profundiza tu comprensión.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-green to-earth-clay rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-deep-indigo">Comunidad</h3>
            <p className="text-muted-foreground leading-relaxed">
              Conecta con eventos locales y una comunidad de fe que te acompaña en tu búsqueda espiritual.
            </p>
          </div>
        </div>
      </section>

      {/* Region Section */}
      <section className="py-20 bg-gradient-to-br from-celestial-blue/10 via-white to-sunrise-gold/10 rounded-3xl shadow-lg">
        <div className="text-center px-8">
          <h2 className="text-4xl font-bold mb-6 text-deep-indigo">Encuentra recursos en tu región</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Conéctate con eventos, contactos y recursos específicos para tu país y ciudad. Tu comunidad de fe está más cerca de lo que piensas.
          </p>
          <CountrySwitcher />
        </div>
      </section>
    </div>
  )
}