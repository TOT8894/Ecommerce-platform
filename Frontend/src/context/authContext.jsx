import React, { createContext, useContext, useState } from "react"
import {AuthApi, GetAccessToken} from "../lib/api.jsx"

export function AuthProvider({children}){
    const authContext = createContext();
    const [isAuthenticate,setIsAuthenticate] = Boolean(GetAccessToken())
    const []
    export async function Register(credentials){
        const response= await AuthApi.register(credentials);
        return response.json();
    }

    export async function Login(credentials){
        const response= await AuthApi.login(credentials);
        return response.json();
    }

    export async function LogOut(){
        await AuthApi.logout();
        ClearToken();
    }

    export async function Profile(){
        const response= await AuthApi.profile();
        return response.json();
    }
    <authContext.provider value={
        Login,
        Register,
        LogOut,
        Profile,
        isAuthenticate
    }>

    </authContext.provider>
}
export function UseAuth(){
    const auth =useContext(authContext)
    if(!auth){
        return "auth not found"
    }
    return auth
}