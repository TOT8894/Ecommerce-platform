import React, { createContext, useCallback, useContext, useState } from "react"
import {AuthApi, GetAccessToken, StoreToken} from "../lib/api.jsx"

export function AuthProvider({children}){
    const authContext = createContext();
    const [isAuthenticate,setIsAuthenticate] = Boolean(GetAccessToken())
    const [user,setUser] = useState("")
    const [loading, setLoading] = useState(false)
    const [accessToken,setAccessToken] = useState(()=>GetAccessToken())
    const [error,setError] = useState("")

    const  Register = useCallback((credentials)=>{
        setError("")
        setLoading(true)

        try{ 
            const response= await AuthApi.register(credentials);
            const result = await response.json()
            const data = result?.data??result.user; 
            setUser(data)
            StoreToken(result)
            return result
        } catch(err){
            setError(error)
        } finally{
            setLoading(false)
        }
    },[])

    const  Login = useCallback((credentials)=>{
        setError("")
        setLoading(true)
        
        try{ 
            const response= await AuthApi.login(credentials);
            const result = await response.json()
            const data = result?.data??result.user; 
            setUser(data)
            StoreToken(result)
            return result
        } catch(err){
            setError(error)
        } finally{
            setLoading(false)
        } 
    },[])

    const  LogOut = useCallback(()=>{
        await AuthApi.logout();
        ClearToken();
    },[])

    const  Profile = useCallback(()=>{
        setError("")
        setLoading(true)
        
        try{ 
            const response= await AuthApi.profile();
            const result = await response.json()
            const data = result?.data??result.user; 
            setUser(data)
            return result
        } catch(err){
            setError(error)
        } finally{
            setLoading(false)
        }
    },[])
        return(
        <authContext.provider value={
            Login,
            Register,
            LogOut,
            Profile,
            user,
            isAuthenticate
        }>
            {children}
        </authContext.provider>
    )
}
export function UseAuth(){
    const auth =useContext(authContext)
    if(!auth){
        return "auth not found"
    }
    return auth
}