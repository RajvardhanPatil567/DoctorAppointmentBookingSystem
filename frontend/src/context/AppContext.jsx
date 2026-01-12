import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { doctors } from '../assets/assets.js'

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const currencySymbol = '$'
  const backendUrl = 'http://localhost:4000'

  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [userData, setUserData] = useState(null)

  // Load user profile data
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token }
      })
      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  }

  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(null)
    }
  }, [token])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
