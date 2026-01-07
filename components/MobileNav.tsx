'use client'

import { useState } from 'react'
import { AuthButton } from './AuthButton'
import { CountrySwitcher } from './CountrySwitcher'

interface MobileNavProps {
  dictionary: {
    home: string
    articles: string
    videos: string
    studies: string
    events: string
    findHelp: string
    nav: {
      startHere: string
      goDeeper: string
      findCommunity: string
      aboutUs: string
      whatIsGospel: string
      whoIsJesus: string
      testimonies: string
      firstSteps: string
      bibleStudies: string
      apologetics: string
      sharingFaith: string
      findMentor: string
      findChurch: string
      chat: string
      beliefs: string
      whoWeAre: string
      contact: string
    }
    auth: {
      signIn: string
      signUp: string
      signOut: string
    }
  }
}

export function MobileNav({ dictionary }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <nav
        className={`
          fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold text-gray-800">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto py-2">
            {/* Start Here Section */}
            <div className="border-b">
              <button
                onClick={() => toggleSection('start-here')}
                className="w-full flex items-center justify-between px-6 py-3 text-gray-800 font-medium hover:bg-gray-50"
              >
                <span>{dictionary.nav.startHere}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedSection === 'start-here' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'start-here' && (
                <div className="bg-gray-50">
                  <a href="/comienza-aqui/que-es-el-evangelio" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.whatIsGospel}
                  </a>
                  <a href="/comienza-aqui/quien-es-jesus" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.whoIsJesus}
                  </a>
                  <a href="/comienza-aqui/testimonios" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.testimonies}
                  </a>
                  <a href="/comienza-aqui/primeros-pasos" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.firstSteps}
                  </a>
                </div>
              )}
            </div>

            {/* Go Deeper Section */}
            <div className="border-b">
              <button
                onClick={() => toggleSection('go-deeper')}
                className="w-full flex items-center justify-between px-6 py-3 text-gray-800 font-medium hover:bg-gray-50"
              >
                <span>{dictionary.nav.goDeeper}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedSection === 'go-deeper' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'go-deeper' && (
                <div className="bg-gray-50">
                  <a href="/estudios" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.bibleStudies}
                  </a>
                  <a href="/profundiza/apologetica" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.apologetics}
                  </a>
                  <a href="/profundiza/comparte-tu-fe" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.sharingFaith}
                  </a>
                </div>
              )}
            </div>

            {/* Find Community Section */}
            <div className="border-b">
              <button
                onClick={() => toggleSection('community')}
                className="w-full flex items-center justify-between px-6 py-3 text-gray-800 font-medium hover:bg-gray-50"
              >
                <span>{dictionary.nav.findCommunity}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedSection === 'community' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'community' && (
                <div className="bg-gray-50">
                  <a href="/comunidad/encuentra-mentor" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.findMentor}
                  </a>
                  <a href="/comunidad/encuentra-iglesia" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.findChurch}
                  </a>
                  <a href="/comunidad/chat" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.chat}
                  </a>
                </div>
              )}
            </div>

            {/* About Us Section */}
            <div className="border-b">
              <button
                onClick={() => toggleSection('about')}
                className="w-full flex items-center justify-between px-6 py-3 text-gray-800 font-medium hover:bg-gray-50"
              >
                <span>{dictionary.nav.aboutUs}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedSection === 'about' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === 'about' && (
                <div className="bg-gray-50">
                  <a href="/acerca-de/creencias" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.beliefs}
                  </a>
                  <a href="/acerca-de/quienes-somos" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.whoWeAre}
                  </a>
                  <a href="/acerca-de/contacto" onClick={() => setIsOpen(false)} className="block px-10 py-2 text-sm text-gray-600 hover:text-blue-600">
                    {dictionary.nav.contact}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile footer with actions */}
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-center">
              <CountrySwitcher />
            </div>
            <div className="flex justify-center">
              <AuthButton dictionary={dictionary.auth} />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
