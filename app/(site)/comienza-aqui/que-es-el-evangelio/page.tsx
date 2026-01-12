import { YouTube } from '@/components/YouTube'
import { CallToAction } from '@/components/CallToAction'

export default function WhatIsGospelPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E88E5] via-[#1E88E5] to-[#FBC02D] text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            ¿Qué es el Evangelio?
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Descubre el mensaje central de la fe cristiana: las buenas noticias que cambian vidas
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="container mx-auto px-4 -mt-12 mb-16 max-w-4xl">
        <div className="rounded-lg overflow-hidden">
          <YouTube id="StGMC-KdehE" />
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
            <h3 className="text-2xl font-bold mb-3 text-gray-900">El Problema</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Todos hemos pecado y estamos separados de Dios. Por nuestros propios esfuerzos, no podemos alcanzar la perfección que Dios requiere.
            </p>
            <p className="text-sm text-gray-500 italic">
              "Por cuanto todos pecaron, y están destituidos de la gloria de Dios" - Romanos 3:23
            </p>
          </div>

          {/* Card 2: The Solution */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#FBC02D] hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#FBC02D]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#FBC02D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">La Solución</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dios nos amó tanto que envió a su Hijo Jesús a morir en la cruz por nuestros pecados. A través de Su sacrificio, podemos ser perdonados y reconciliados con Dios.
            </p>
            <p className="text-sm text-gray-500 italic">
              "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito" - Juan 3:16
            </p>
          </div>

          {/* Card 3: The Response */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#43A047] hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#43A047]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#43A047]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Nuestra Respuesta</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Para recibir este regalo de salvación, debemos arrepentirnos de nuestros pecados, creer en Jesús, y seguirle como Señor de nuestras vidas.
            </p>
            <p className="text-sm text-gray-500 italic">
              "Si confiesas con tu boca que Jesús es el Señor... serás salvo" - Romanos 10:9
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction
        title="¿Listo para dar el siguiente paso?"
        subtitle="Explora cómo puedes crecer en tu fe y conectar con una comunidad"
        actions={[
          { href: '/comienza-aqui/primeros-pasos', label: 'Primeros Pasos', variant: 'primary' },
          { href: '/estudios', label: 'Ver Estudios Bíblicos', variant: 'accent' },
          { href: '/comunidad/encuentra-iglesia', label: 'Encuentra una Iglesia', variant: 'ghost' }
        ]}
      />
    </div>
  )
}
