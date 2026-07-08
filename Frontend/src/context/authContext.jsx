import React from "react"
import {AuthApi} from "../lib/api.jsx"

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
