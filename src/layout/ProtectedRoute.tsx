import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
  const { isAuth, user, loading } = useAuth()

  if (loading) return null

  return (
    <div>
      {user._id ? (
        <div className='bg-gray-100'>
          <Header />
          <div className='md:flex md:min-h-screen'>
            <Sidebar />
            <main className='flex-1 p-10'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  )
}

export default ProtectedRoute
