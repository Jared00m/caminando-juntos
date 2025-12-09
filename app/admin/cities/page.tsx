'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { City, Region } from '@/lib/types'

export default function CitiesAdmin() {
  const [cities, setCities] = useState<City[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)
  const [newCityName, setNewCityName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      console.log('Fetching regions...')
      const { data: regionsData, error: regionsError } = await supabase.from('regions').select('*')
      if (regionsError) console.error('Regions error:', regionsError)
      
      console.log('Fetching cities...')
      const { data: citiesData, error: citiesError } = await supabase.from('cities').select('*').order('created_at', { ascending: false })
      if (citiesError) console.error('Cities error:', citiesError)
      
      if (regionsData) setRegions(regionsData)
      if (citiesData) setCities(citiesData)
    } catch (err) {
      console.error('Unexpected error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCityName || !selectedCountry) return

    const { data, error } = await supabase
      .from('cities')
      .insert([{ city_name: newCityName, country_code: selectedCountry }])
      .select()

    if (error) {
      alert('Error adding city: ' + error.message)
    } else if (data) {
      setCities([data[0], ...cities])
      setNewCityName('')
    }
  }

  const handleDeleteCity = async (id: number) => {
    if (!confirm('Are you sure?')) return

    const { error } = await supabase.from('cities').delete().eq('id', id)
    if (error) {
      alert('Error deleting city: ' + error.message)
    } else {
      setCities(cities.filter(c => c.id !== id))
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Cities</h1>
      
      <form onSubmit={handleAddCity} className="mb-8 p-4 bg-white rounded shadow flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select 
            value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border rounded p-2 w-48"
            required
          >
            <option value="">Select Country</option>
            {regions.map(r => (
              <option key={r.country_code} value={r.country_code}>{r.country_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City Name</label>
          <input 
            type="text" 
            value={newCityName} 
            onChange={(e) => setNewCityName(e.target.value)}
            className="border rounded p-2 w-64"
            placeholder="New City Name"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add City
        </button>
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        {cities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No cities found. Add one above!
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cities.map(city => (
                <tr key={city.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{city.city_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {regions.find(r => r.country_code === city.country_code)?.country_name || city.country_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleDeleteCity(city.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
