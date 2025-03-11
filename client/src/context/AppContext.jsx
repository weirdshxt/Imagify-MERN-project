import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'



export const AppContext = createContext();


export const AppProvider = (props) => {
     const [user, setUser] = useState(null);
     const [showLogin, setShowLogin] = useState(false)
     const [token, setToken] = useState(localStorage.getItem('token'))

     const [credit, setCredit]= useState(false)

     const backendUrl = import.meta.env.VITE_BACKEND_URL

     const loadCreditsData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits', {headers: {token}})

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
            
        }
     }

     const logout = () =>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
     }

     useEffect(()=>{
        if(token){
            loadCreditsData()
        }
     },[token])

     const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout
     }

     return (
         <AppContext.Provider value={value}>
             {props.children}
         </AppContext.Provider>
     )
}