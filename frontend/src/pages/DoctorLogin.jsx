import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DoctorLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setDToken, dToken, backendUrl } = useContext(DoctorContext)
    const navigate = useNavigate()

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
            if (data.success) {
                localStorage.setItem('dToken', data.token)
                setDToken(data.token)
                toast.success('Logged in successfully!')
                navigate('/doctor-dashboard')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (dToken) {
            navigate('/doctor-dashboard')
        }
    }, [dToken])


    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>Doctor Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
            </div>
        </form>
    )
}

export default DoctorLogin
