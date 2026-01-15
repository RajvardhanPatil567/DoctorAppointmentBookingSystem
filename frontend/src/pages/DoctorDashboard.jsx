import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const DoctorDashboard = () => {

    const { dToken, dashData, setDashData, getAppointments, appointments, cancelAppointment, getProfileData, profileData, setProfileData, backendUrl } = useContext(DoctorContext)
    const { currencySymbol } = useContext(AppContext)
    const navigate = useNavigate()
    const [tab, setTab] = useState('appointments'); // appointments, profile

    const [isEdit, setIsEdit] = useState(false)
    const [docFees, setDocFees] = useState(0)
    const [docAddress, setDocAddress] = useState({ line1: '', line2: '' })
    const [docAvailable, setDocAvailable] = useState(false)

    useEffect(() => {
        if (dToken) {
            getAppointments()
            getProfileData()
        } else {
            navigate('/doctor-login')
        }
    }, [dToken])

    useEffect(() => {
        if (profileData) {
            setDocFees(profileData.fees)
            setDocAddress(profileData.address)
            setDocAvailable(profileData.available)
        }
    }, [profileData])

    const updateProfile = async () => {
        try {
            const updateData = {
                fees: docFees,
                address: docAddress,
                available: docAvailable
            }
            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <div className='flex flex-col sm:flex-row'>
            <div className='w-full sm:w-64 bg-white border-r min-h-screen'>
                <ul className='flex sm:flex-col gap-4 p-4'>
                    <li onClick={() => setTab('appointments')} className={`cursor-pointer p-2 rounded ${tab === 'appointments' ? 'bg-primary text-white' : ''}`}>Appointments</li>
                    <li onClick={() => setTab('profile')} className={`cursor-pointer p-2 rounded ${tab === 'profile' ? 'bg-primary text-white' : ''}`}>Profile</li>
                </ul>
            </div>

            <div className='flex-1 p-4'>
                {tab === 'appointments' && (
                    <div>
                        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>All Appointments</p>
                        <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
                            <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                                <p>#</p>
                                <p>Patient</p>
                                <p>Payment</p>
                                <p>Age</p>
                                <p>Date & Time</p>
                                <p>Fees</p>
                                <p>Action</p>
                            </div>
                            {appointments.map((item, index) => (
                                <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-3 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
                                    <p className='max-sm:hidden'>{index + 1}</p>
                                    <div className='flex items-center gap-2'>
                                        <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs inline border border-primary px-2 rounded-full'>{item.payment ? 'Online' : 'CASH'}</p>
                                    </div>
                                    <p className='max-sm:hidden'>23</p>  { /* Placeholder for age calculation if Dob exists */}
                                    <p>{item.slotDate} | {item.slotTime}</p>
                                    <p>{currencySymbol}{item.amount}</p>
                                    {
                                        item.cancelled
                                            ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                            : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === 'profile' && profileData && (
                    <div className='flex flex-col gap-4 m-5 w-full max-w-2xl'>
                        <div className='flex items-center gap-4'>
                            <img className='bg-primary/80 w-36 rounded-lg' src={profileData.image} alt="" />
                            {isEdit
                                ? <button onClick={updateProfile} className='bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/80 transition-all'>Save Profile</button>
                                : <button onClick={() => setIsEdit(true)} className='border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit Profile</button>
                            }
                        </div>

                        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                            <p className='font-medium'>Address:</p>
                            {isEdit
                                ? <p>
                                    <input type="text" onChange={(e) => setDocAddress({ ...docAddress, line1: e.target.value })} value={docAddress.line1} /> <br />
                                    <input type="text" onChange={(e) => setDocAddress({ ...docAddress, line2: e.target.value })} value={docAddress.line2} />
                                </p>
                                : <p>{profileData.address.line1} <br /> {profileData.address.line2}</p>
                            }
                        </div>

                        <div className='flex gap-1 pt-2'>
                            <input onChange={() => isEdit && setDocAvailable(prev => !prev)} checked={docAvailable} type='checkbox' id='' />
                            <label htmlFor=''>Available</label>
                        </div>

                        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                            <p className='font-medium'>Fees:</p>
                            {isEdit
                                ? <input type="number" onChange={(e) => setDocFees(e.target.value)} value={docFees} />
                                : <p>{currencySymbol} {profileData.fees}</p>
                            }
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorDashboard
