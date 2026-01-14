'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Event, City, Region } from '@/lib/types'

export default function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)
  
  // Form state
  const [formData, setFormData] = useState<Partial<Event>>({
    published: true
  })
  
  const supabase = useMemo(() => createClient(), [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const { data: regionsData, error: regionsError } = await supabase.from('regions').select('*')
      if (regionsError) console.error('Regions error:', regionsError)

      const { data: citiesData, error: citiesError } = await supabase.from('cities').select('*')
      if (citiesError) console.error('Cities error:', citiesError)

      const { data: eventsData, error: eventsError } = await supabase.from('events').select('*').order('starts_at', { ascending: false })
      if (eventsError) console.error('Events error:', eventsError)
      
      if (regionsData) setRegions(regionsData)
      if (citiesData) setCities(citiesData)
      if (eventsData) setEvents(eventsData)
    } catch (err) {
      console.error('Unexpected error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await supabase
      .from('events')
      .insert([formData])
      .select()

    if (error) {
      alert('Error adding event: ' + error.message)
    } else if (data) {
      setEvents([data[0], ...events])
      setFormData({ published: true })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return

    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) {
      alert('Error deleting event: ' + error.message)
    } else {
      setEvents(events.filter(e => e.id !== id))
    }
  }

  const filteredCities = formData.country_code 
    ? cities.filter(c => c.country_code === formData.country_code)
    : []

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input 
            type="text" 
            value={formData.title || ''} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select 
            value={formData.country_code || ''} 
            onChange={(e) => setFormData({...formData, country_code: e.target.value, city_id: undefined})}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Country (Optional)</option>
            {regions.map(r => (
              <option key={r.country_code} value={r.country_code}>{r.country_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <select 
            value={formData.city_id || ''} 
            onChange={(e) => setFormData({...formData, city_id: Number(e.target.value)})}
            className="border rounded p-2 w-full"
            disabled={!formData.country_code}
          >
            <option value="">Select City (Optional)</option>
            {filteredCities.map(c => (
              <option key={c.id} value={c.id}>{c.city_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date/Time</label>
          <input 
            type="datetime-local" 
            value={formData.starts_at ? new Date(formData.starts_at).toISOString().slice(0, 16) : ''} 
            onChange={(e) => setFormData({...formData, starts_at: new Date(e.target.value).toISOString()})}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date/Time (Optional)</label>
          <input 
            type="datetime-local" 
            value={formData.ends_at ? new Date(formData.ends_at).toISOString().slice(0, 16) : ''} 
            onChange={(e) => setFormData({...formData, ends_at: new Date(e.target.value).toISOString()})}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Venue (Optional)</label>
          <input 
            type="text" 
            value={formData.venue || ''} 
            onChange={(e) => setFormData({...formData, venue: e.target.value})}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL (Optional)</label>
          <input 
            type="url" 
            value={formData.url || ''} 
            onChange={(e) => setFormData({...formData, url: e.target.value})}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description (Optional)</label>
          <textarea 
            value={formData.description || ''} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="border rounded p-2 w-full h-24"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={formData.published} 
              onChange={(e) => setFormData({...formData, published: e.target.checked})}
            />
            Published
          </label>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Event
          </button>
        </div>
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map(event => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(event.starts_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.title}</div>
                  {event.venue && <div className="text-sm text-gray-500">{event.venue}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.city_id 
                    ? cities.find(c => c.id === event.city_id)?.city_name 
                    : (event.country_code ? regions.find(r => r.country_code === event.country_code)?.country_name : 'Global')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {event.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
