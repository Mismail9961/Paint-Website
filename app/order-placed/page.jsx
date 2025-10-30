'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const OrderPlaced = () => {
  const { router } = useAppContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/my-orders')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black px-4">
      {/* ✅ Animated Checkmark Loader */}
      <div className="flex justify-center items-center relative mb-6">
        <div className="animate-spin rounded-full h-24 w-24 sm:h-28 sm:w-28 border-4 border-t-[#0a9396] border-[#94d2bd]"></div>
        <Image
          className="absolute p-4 sm:p-5 w-12 h-12 sm:w-14 sm:h-14"
          src={assets.checkmark}
          alt="Order Success"
        />
      </div>

      {/* ✅ Text Content */}
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0a9396]">
          Order Placed Successfully!
        </h1>
        <p className="text-sm sm:text-base text-black/70 max-w-xs mx-auto">
          Thank you for shopping with us. You’ll be redirected to your orders shortly.
        </p>
      </div>

      {/* ✅ Progress Bar Animation */}
      <div className="w-40 sm:w-52 h-2 bg-[#94d2bd]/40 mt-6 rounded-full overflow-hidden">
        <div className="h-full bg-[#0a9396] animate-progress"></div>
      </div>

      {/* ✅ iPhone 5s Friendly Styling */}
      <style jsx>{`
        @media (max-width: 320px) {
          h1 {
            font-size: 1rem !important;
          }
          p {
            font-size: 0.75rem !important;
          }
          .w-24,
          .h-24 {
            width: 60px !important;
            height: 60px !important;
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </div>
  )
}

export default OrderPlaced
