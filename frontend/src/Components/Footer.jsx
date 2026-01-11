import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

export const Footer = () => {
    const navigate=useNavigate()
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
         {/* left section */}
        <div>
           <img onClick={()=>{navigate('/')}} className='cursor-pointer w-44' src={assets.logo} alt=''></img>
           <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        {/* middle section */}
         <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
         {/* right section */}
        <div>
           <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>doctors@gmail.com</li>
           </ul>
        </div>
        </div>
        {/* bottom section */}
        <div className='text-sm text-gray-600 text-center mb-10'>
            <hr></hr>
            <p className='py-5 text-sm'>© 2025 Doctors. All rights reserved.</p>
        </div>
    </div>
  )
}
