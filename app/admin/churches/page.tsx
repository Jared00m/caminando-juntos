'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import type { Church, City, Region } from '@/lib/types'

type ChurchForm = {
	country_code: string
	city_id?: number | null
	name: string
	contact_phone?: string | null
	contact_phone_type?: 'whatsapp' | 'phone' | null
	contact_email?: string | null
	website_url?: string | null
	address?: string | null
	published: boolean
}

const emptyForm: ChurchForm = {
	country_code: '',
	city_id: null,
	name: '',
	contact_phone: null,
	contact_phone_type: null,
	contact_email: null,
	website_url: null,
	address: null,
	published: true,
}

export default function ChurchesAdmin() {
	const supabase = createClient()

	const [regions, setRegions] = useState<Region[]>([])
	const [cities, setCities] = useState<City[]>([])
	const [churches, setChurches] = useState<Church[]>([])
	const [loading, setLoading] = useState(true)

	const [formData, setFormData] = useState<ChurchForm>(emptyForm)
	const [editingId, setEditingId] = useState<number | null>(null)

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchData = async () => {
		try {
			setLoading(true)

			const [{ data: regionsData, error: regionsError }, { data: citiesData, error: citiesError }, { data: churchesData, error: churchesError }] =
				await Promise.all([
					supabase.from('regions').select('*').order('country_name', { ascending: true }),
					supabase.from('cities').select('*').order('city_name', { ascending: true }),
					supabase.from('churches').select('*').order('created_at', { ascending: false }),
				])

			if (regionsError) console.error('Regions error:', regionsError)
			if (citiesError) console.error('Cities error:', citiesError)
			if (churchesError) console.error('Churches error:', churchesError)

			if (regionsData) setRegions(regionsData)
			if (citiesData) setCities(citiesData)
			if (churchesData) setChurches(churchesData as unknown as Church[])
		} catch (err) {
			console.error('Unexpected error fetching churches data:', err)
		} finally {
			setLoading(false)
		}
	}

	const filteredCities = useMemo(() => {
		if (!formData.country_code) return []
		return cities.filter((c) => c.country_code === formData.country_code)
	}, [cities, formData.country_code])

	const startEdit = (church: Church) => {
		setEditingId(church.id)
		setFormData({
			country_code: church.country_code || '',
			city_id: church.city_id ?? null,
			name: church.name,
			contact_phone: church.contact_phone ?? null,
			contact_phone_type: church.contact_phone_type ?? null,
			contact_email: church.contact_email ?? null,
			website_url: church.website_url ?? null,
			address: church.address ?? null,
			published: !!church.published,
		})
	}

	const cancelEdit = () => {
		setEditingId(null)
		setFormData(emptyForm)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!formData.country_code || !formData.name.trim()) return

		const payload = {
			country_code: formData.country_code,
			city_id: formData.city_id || null,
			name: formData.name.trim(),
			contact_phone: formData.contact_phone || null,
			contact_phone_type: formData.contact_phone ? formData.contact_phone_type || null : null,
			contact_email: formData.contact_email || null,
			website_url: formData.website_url || null,
			address: formData.address || null,
			published: !!formData.published,
		}

		if (editingId) {
			const { data, error } = await supabase.from('churches').update(payload).eq('id', editingId).select()
			if (error) {
				alert('Error updating church: ' + error.message)
				return
			}
			if (data?.[0]) {
				setChurches((prev) => [data[0] as unknown as Church, ...prev.filter((c) => c.id !== editingId)])
				cancelEdit()
			}
			return
		}

		const { data, error } = await supabase.from('churches').insert([payload]).select()
		if (error) {
			alert('Error adding church: ' + error.message)
		} else if (data?.[0]) {
			setChurches([data[0] as unknown as Church, ...churches])
			setFormData(emptyForm)
		}
	}

	const handleDelete = async (id: number) => {
		if (!confirm('Are you sure?')) return
		const { error } = await supabase.from('churches').delete().eq('id', id)
		if (error) {
			alert('Error deleting church: ' + error.message)
		} else {
			setChurches(churches.filter((c) => c.id !== id))
			if (editingId === id) cancelEdit()
		}
	}

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Manage Churches</h1>

			<form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">Country</label>
					<select
						value={formData.country_code}
						onChange={(e) => setFormData({ ...formData, country_code: e.target.value, city_id: null })}
						className="border rounded p-2 w-full"
						required
					>
						<option value="">Select Country</option>
						{regions.map((r) => (
							<option key={r.country_code} value={r.country_code}>
								{r.country_name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">City</label>
					<select
						value={formData.city_id || ''}
						onChange={(e) => setFormData({ ...formData, city_id: e.target.value ? Number(e.target.value) : null })}
						className="border rounded p-2 w-full"
						disabled={!formData.country_code}
					>
						<option value="">Select City (Optional)</option>
						{filteredCities.map((c) => (
							<option key={c.id} value={c.id}>
								{c.city_name}
							</option>
						))}
					</select>
				</div>

				<div className="md:col-span-2">
					<label className="block text-sm font-medium mb-1">Church Name</label>
					<input
						type="text"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className="border rounded p-2 w-full"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Contact Phone (Optional)</label>
					<input
						type="text"
						value={formData.contact_phone || ''}
						onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
						className="border rounded p-2 w-full"
						placeholder="+55 11 99999-9999"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Phone Type</label>
					<select
						value={formData.contact_phone_type || ''}
						onChange={(e) => {
							const raw = e.target.value
							const nextType: ChurchForm['contact_phone_type'] = raw === 'whatsapp' || raw === 'phone' ? raw : null
							setFormData({ ...formData, contact_phone_type: nextType })
						}}
						className="border rounded p-2 w-full"
						disabled={!formData.contact_phone}
					>
						<option value="">Select (Optional)</option>
						<option value="whatsapp">WhatsApp</option>
						<option value="phone">Phone</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Contact Email (Optional)</label>
					<input
						type="email"
						value={formData.contact_email || ''}
						onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
						className="border rounded p-2 w-full"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">Website (Optional)</label>
					<input
						type="url"
						value={formData.website_url || ''}
						onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
						className="border rounded p-2 w-full"
						placeholder="https://..."
					/>
				</div>

				<div className="md:col-span-2">
					<label className="block text-sm font-medium mb-1">Address (Optional)</label>
					<textarea
						value={formData.address || ''}
						onChange={(e) => setFormData({ ...formData, address: e.target.value })}
						className="border rounded p-2 w-full h-20"
					/>
				</div>

				<div className="flex items-center">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={formData.published}
							onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
						/>
						Published
					</label>
				</div>

				<div className="md:col-span-2 flex gap-3">
					<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
						{editingId ? 'Save Changes' : 'Add Church'}
					</button>
					{editingId && (
						<button type="button" onClick={cancelEdit} className="border px-4 py-2 rounded hover:bg-gray-50">
							Cancel
						</button>
					)}
				</div>
			</form>

			<div className="bg-white rounded shadow overflow-hidden">
				{churches.length === 0 ? (
					<div className="p-8 text-center text-gray-500">No churches found. Add one above!</div>
				) : (
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{churches.map((church) => {
								const countryName = church.country_code
									? regions.find((r) => r.country_code === church.country_code)?.country_name || church.country_code
									: 'Unknown'
								const cityName = church.city_id ? cities.find((c) => c.id === church.city_id)?.city_name : null

								return (
									<tr key={church.id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900">{church.name}</div>
											{church.address && <div className="text-sm text-gray-500">{church.address}</div>}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{countryName}</div>
											{cityName && <div className="text-sm text-gray-500">{cityName}</div>}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{church.contact_phone && (
												<div className="text-sm text-gray-900">
													{church.contact_phone_type === 'whatsapp' ? 'WhatsApp' : 'Phone'}: {church.contact_phone}
												</div>
											)}
											{church.website_url && (
												<div className="text-sm text-gray-500 truncate max-w-xs">{church.website_url}</div>
											)}
											{!church.contact_phone && !church.website_url && <div className="text-sm text-gray-500">—</div>}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													church.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
												}`}
											>
												{church.published ? 'Published' : 'Draft'}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
											<button onClick={() => startEdit(church)} className="text-blue-600 hover:text-blue-900">
												Edit
											</button>
											<button onClick={() => handleDelete(church.id)} className="text-red-600 hover:text-red-900">
												Delete
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}

