'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Contact, City, Region } from '@/lib/types'

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)
  
  // Form state
  const [formData, setFormData] = useState<Partial<Contact>>({
    channel_type: 'email',
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

      const { data: contactsData, error: contactsError } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
      if (contactsError) console.error('Contacts error:', contactsError)
      
      if (regionsData) setRegions(regionsData)
      if (citiesData) setCities(citiesData)
      if (contactsData) setContacts(contactsData)
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
      .from('contacts')
      .insert([formData])
      .select()

    if (error) {
      alert('Error adding contact: ' + error.message)
    } else if (data) {
      setContacts([data[0], ...contacts])
      setFormData({ channel_type: 'email', published: true })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return

    const { error } = await supabase.from('contacts').delete().eq('id', id)
    if (error) {
      alert('Error deleting contact: ' + error.message)
    } else {
      setContacts(contacts.filter(c => c.id !== id))
    }
  }

  const filteredCities = formData.country_code 
    ? cities.filter(c => c.country_code === formData.country_code)
    : []

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Contacts</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <label className="block text-sm font-medium mb-1">Type</label>
          <select 
            value={formData.channel_type} 
            onChange={(e) => {
              const raw = e.target.value
              const nextType: Contact['channel_type'] =
                raw === 'email' || raw === 'whatsapp' || raw === 'phone' || raw === 'chatwoot_team' ? raw : 'email'
              setFormData({ ...formData, channel_type: nextType })
            }}
            className="border rounded p-2 w-full"
            required
          >
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone</option>
            <option value="chatwoot_team">Chatwoot Team</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Value (Email/Number/ID)</label>
          <input 
            type="text" 
            value={formData.value || ''} 
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Name (Optional)</label>
          <input 
            type="text" 
            value={formData.name || ''} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description (Optional)</label>
          <input 
            type="text" 
            value={formData.description || ''} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="border rounded p-2 w-full"
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
            Add Contact
          </button>
        </div>
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{contact.channel_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contact.value}</div>
                  <div className="text-sm text-gray-500">{contact.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {contact.city_id 
                    ? cities.find(c => c.id === contact.city_id)?.city_name 
                    : (contact.country_code ? regions.find(r => r.country_code === contact.country_code)?.country_name : 'Global')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contact.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {contact.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDelete(contact.id)}
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
