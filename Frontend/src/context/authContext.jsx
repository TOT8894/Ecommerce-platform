import React from "react"
import {AuthApi} from "../lib/api.jsx"


const ACCESS_KEY="accessToken"
const REFRESH_KEY="refreshToken"

export function GetAccessToken(){
    return localStorage.getItem(ACCESS_KEY)
}
export function GetRefresToken(){
    return localStorage.getItem(REFRESH_KEY)
}
export function SetAccessRefreshToken({accessToken,refreshToken}){
    localStorage.setItem(ACCESS_KEY,accessToken);
    localStorage.setItem(REFRESH_KEY,refreshToken)
}
export function ClearToken(){
    localStorage.clear();
}

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
