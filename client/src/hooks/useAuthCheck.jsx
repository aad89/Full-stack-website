import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { toast } from 'react-toastify'

const useAuthCheck = () => {
    const {isAuthenticated} = useAuth0()
    const ValidateLogin = ()=>{
        if(!isAuthenticated){
            toast.error("You must be logged in", {position: "bottom-right"})
            return false
        } else return true
    }
  return (
   {
    ValidateLogin
   }
  )
}

export default useAuthCheck