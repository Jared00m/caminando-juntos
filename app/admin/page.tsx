'use client'

import { useAuth } from '@/lib/auth-context'

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, Admin</h1>
      <p className="mb-4">Select a section from the sidebar to manage content.</p>
      
      <div className="p-4 bg-gray-100 rounded-lg max-w-md">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Database Role:</strong> {isAdmin ? <span className="text-green-600 font-bold">Admin</span> : <span className="text-red-600 font-bold">User (Not Admin)</span>}</p>
        {!isAdmin && (
          <p className="text-sm text-red-600 mt-2">
            ⚠️ You are not recognized as an admin by the database. You will not be able to see or edit data.
            <br />
            Please run the SQL command: 
            <code className="block bg-gray-200 p-1 mt-1 rounded">update user_profiles set role = 'admin' where email = '{user?.email}';</code>
          </p>
        )}
      </div>
    </div>
  )
}
