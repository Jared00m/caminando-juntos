'use client'

import { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import type { Church } from '@/lib/types'

type ChurchesDictionary = {
  filterCity: string
  allCities: string
  contactWhatsapp: string
  contactCall: string
  website: string
  loading: string
  emptyTitle: string
  emptyMessage: string
}

export function LocalChurches({ dictionary }: { dictionary: ChurchesDictionary }) {
  const [churches, setChurches] = useState<Church[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCityId, setSelectedCityId] = useState<number | 'all'>('all')

  useEffect(() => {
    loadChurches()
  }, [])

  const loadChurches = async () => {
    try {
      const countryCode = Cookies.get('cc') || 'ES'
      const response = await fetch(`/api/churches?country=${countryCode}`)
      const data = await response.json()
      setChurches(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading churches:', error)
      setChurches([])
    } finally {
      setLoading(false)
    }
  }

  const cities = useMemo(() => {
    const map = new Map<number, string>()
    for (const church of churches) {
      if (church.city?.id && church.city.city_name) {
        map.set(church.city.id, church.city.city_name)
      }
    }
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [churches])

  const showCityFilter = cities.length > 1

  const filteredChurches = useMemo(() => {
    if (selectedCityId === 'all') return churches
    return churches.filter((c) => c.city_id === selectedCityId)
  }, [churches, selectedCityId])

  const groupedChurches = useMemo(() => {
    const groups = new Map<string, Church[]>()

    for (const church of filteredChurches) {
      const cityName = church.city?.city_name || ''
      const key = cityName
      const list = groups.get(key) || []
      list.push(church)
      groups.set(key, list)
    }

    // Sort groups by city name (empty string last)
    return Array.from(groups.entries())
      .sort(([a], [b]) => {
        if (!a && b) return 1
        if (a && !b) return -1
        return a.localeCompare(b)
      })
      .map(([cityName, items]) => ({ cityName, items }))
  }, [filteredChurches])

  const getPhoneHref = (church: Church) => {
    if (!church.contact_phone) return null
    if (church.contact_phone_type === 'whatsapp') {
      return `https://wa.me/${church.contact_phone.replace(/[^0-9]/g, '')}`
    }
    return `tel:${church.contact_phone}`
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showCityFilter && (
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="city">
              {dictionary.filterCity}
            </label>
            <select
              id="city"
              value={selectedCityId}
              onChange={(e) => {
                const value = e.target.value
                setSelectedCityId(value === 'all' ? 'all' : Number(value))
              }}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-celestial-blue focus:ring-offset-2"
            >
              <option value="all">{dictionary.allCities}</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {filteredChurches.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-celestial-blue/5 to-emerald-green/5 rounded-3xl">
          <div className="w-20 h-20 bg-gradient-to-br from-celestial-blue/20 to-emerald-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-celestial-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9M20 3H4a1 1 0 00-1 1v4a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-deep-indigo mb-2">{dictionary.emptyTitle}</h3>
          <p className="text-muted-foreground">{dictionary.emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-10">
          {groupedChurches.map((group) => (
            <div key={group.cityName || 'no-city'} className="space-y-4">
              {group.cityName && (
                <h2 className="text-xl font-semibold text-deep-indigo">{group.cityName}</h2>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((church) => {
                  const phoneHref = getPhoneHref(church)
                  const phoneLabel =
                    church.contact_phone_type === 'whatsapp' ? dictionary.contactWhatsapp : dictionary.contactCall

                  return (
                    <div
                      key={church.id}
                      className="bg-white border border-border rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-deep-indigo">{church.name}</h3>
                        </div>

                        {church.address && (
                          <p className="text-sm text-gray-600 leading-relaxed">{church.address}</p>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          {phoneHref && church.contact_phone && (
                            <a
                              href={phoneHref}
                              target={church.contact_phone_type === 'whatsapp' ? '_blank' : undefined}
                              rel={church.contact_phone_type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-celestial-blue hover:bg-celestial-blue/90"
                            >
                              {phoneLabel}
                            </a>
                          )}

                          {church.website_url && (
                            <a
                              href={church.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-celestial-blue border border-celestial-blue hover:bg-celestial-blue/5"
                            >
                              {dictionary.website}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
