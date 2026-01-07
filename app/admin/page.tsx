'use client'

import { useAuth } from '@/lib/auth-context'

export default function AdminDashboard() {
  const { user, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin status...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-3xl mb-2">🏙️</div>
          <h2 className="text-xl font-semibold mb-2">Cities</h2>
          <p className="text-gray-600 text-sm mb-4">
            Manage city locations and regions
          </p>
          <a
            href="/admin/cities"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Manage →
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-3xl mb-2">👥</div>
          <h2 className="text-xl font-semibold mb-2">Contacts</h2>
          <p className="text-gray-600 text-sm mb-4">
            Manage missionaries and contacts
          </p>
          <a
            href="/admin/contacts"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Manage →
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-3xl mb-2">📅</div>
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <p className="text-gray-600 text-sm mb-4">
            Create and manage community events
          </p>
          <a
            href="/admin/events"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Manage →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-3xl mb-2">⛪</div>
          <h2 className="text-xl font-semibold mb-2">Churches</h2>
          <p className="text-gray-600 text-sm mb-4">
            Add and manage local churches
          </p>
          <a
            href="/admin/churches"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Manage →
          </a>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
        <h3 className="font-semibold text-blue-900 mb-2">Your Status</h3>
        <p className="text-sm text-blue-800"><strong>Email:</strong> {user?.email}</p>
        <p className="text-sm text-blue-800"><strong>Role:</strong> <span className="text-green-600 font-bold">Admin</span></p>
      </div>
    </div>
  )
}
