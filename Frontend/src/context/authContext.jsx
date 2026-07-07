import React from "react"


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