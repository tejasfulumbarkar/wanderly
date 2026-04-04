import React,{Children, createContext, useContext, useEffect, useState} from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()

const UserContext = ({children}) => {

    let {serverUrl} = useContext(authDataContext)
    let [userData,setUserData] = useState(null)


    const getCurrentuser = async ()=>{
        try {

            let result = await axios.get(serverUrl+"/api/user/currentuser",{withCredentials:true})
            setUserData(result.data)
            
        } catch (error) {

            setUserData(null)
            console.log(error)
            
        }
    }

    useEffect(()=>{
        getCurrentuser()
    },[])

    let value ={
        userData,
        setUserData

    }

  return (
    <userDataContext.Provider value={value}>
       {children} 
    </userDataContext.Provider>
  )
}

export default UserContext