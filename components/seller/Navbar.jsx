import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { useUser, useClerk } from '@clerk/nextjs'

const Navbar = () => {
  const { router } = useAppContext()
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()

  // Extract admin details from Clerk
  const adminName = user?.fullName || user?.firstName || "Admin"
  const adminEmail = user?.primaryEmailAddress?.emailAddress || "admin@example.com"
  const adminRole = user?.publicMetadata?.role || "Admin"
  const adminImage = user?.imageUrl

  const handleLogout = async () => {
    await signOut()
    router.push('/sign-in')
  }

  if (!isLoaded) {
    return (
      <div className='flex items-center px-4 md:px-8 py-4 justify-between bg-white shadow-sm border-b'>
        <div className='h-12 w-48 bg-slate-200 animate-pulse rounded'></div>
        <div className='h-10 w-24 bg-slate-200 animate-pulse rounded-full'></div>
      </div>
    )
  }

  return (
    <div className='flex items-center px-4 md:px-8 py-4 justify-between bg-white shadow-sm border-b'>
      {/* Admin Details */}
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-semibold text-lg'>
          {adminImage ? (
            <img 
              src={adminImage} 
              alt={adminName}
              className='w-full h-full object-cover'
            />
          ) : (
            adminName.charAt(0).toUpperCase()
          )}
        </div>
        <div className='hidden sm:block'>
          <h3 className='font-semibold text-slate-800 text-sm md:text-base'>{adminName}</h3>
          <p className='text-xs md:text-sm text-slate-500'>{adminEmail}</p>
        </div>
      </div>

      {/* Role Badge & Logout */}
      <div className='flex items-center gap-3'>
        <span className='hidden md:inline-block bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-xs font-medium'>
          {adminRole}
        </span>
        <button 
          onClick={handleLogout}
          className='bg-slate-600 hover:bg-slate-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition-colors'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar