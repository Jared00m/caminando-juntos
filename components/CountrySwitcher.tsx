'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Region } from '@/lib/types'

export function CountrySwitcher() {
  const [currentCountry, setCurrentCountry] = useState<string>(() => Cookies.get('cc') || 'ES')
  const [regions, setRegions] = useState<Region[]>([])
  const [isOpen, setIsOpen] = useState(false)

  async function loadRegions() {
    try {
      const response = await fetch('/api/regions')
      const data = await response.json()
      setRegions(data)
    } catch (error) {
      console.error('Error loading regions:', error)
    }
  }

  useEffect(() => {
    // Load regions
    loadRegions()
  }, [])

  const handleCountryChange = (countryCode: string) => {
    setCurrentCountry(countryCode)
    Cookies.set('cc', countryCode, { expires: 30 }) // 30 days
    
    // Set locale based on country
    const locale = countryCode === 'BR' ? 'pt' : 'es'
    Cookies.set('NEXT_LOCALE', locale, { expires: 30 })

    setIsOpen(false)
    // Reload page to update content based on new country
    window.location.reload()
  }

  const currentRegion = regions.find(r => r.country_code === currentCountry)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{currentRegion ? currentRegion.country_name : 'Seleccionar país'}</span>
        <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-64 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {regions.map((region) => (
              <button
                key={region.country_code}
                onClick={() => handleCountryChange(region.country_code)}
                className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-blue-50 hover:text-blue-600 ${
                  currentCountry === region.country_code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {region.country_name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}