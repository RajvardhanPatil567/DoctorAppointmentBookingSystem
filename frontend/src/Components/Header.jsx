import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export const Header = () => {
  const navigate = useNavigate()
  const { token } = useContext(AppContext)

  return (
    <div className='flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/* {left side} */}
      <div className='md:w-1/2 flex flex-col items-start justify-center  py-10 md:py-[10vw] md:mb-[-30px] gap-6'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight lg:leading-tight'>
          Book Appointment <br /> with Trusted Doctors
        </p>
        <div className='flex flex-col gap-4 text-white md:flex-row md:items-center text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt='doctor pic' />
          <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
            schedule your appointment hassle-free.</p>
        </div>
        <button onClick={() => {
          if (token) {
            navigate('/doctors')
          } else {
            navigate('/login')
          }
          scrollTo(0, 0)
        }} className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 cursor-pointer'>Book appointment <img className='w-3' src={assets.arrow_icon} /></button>
      </div>
      {/* {right side} */}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt='header pic' />
      </div>
    </div>
  )
}
