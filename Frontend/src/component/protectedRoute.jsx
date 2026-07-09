import { useNavigate } from "react-router-dom"
import { UseAuth } from "../context/authContext"

export function ProtectedRoute({children}){
    const {isAuthenticate} = UseAuth()
    const navigate = useNavigate()
    if(isAuthenticate){
        return(
            <>
                <children/>
            </>
        )
    }
    if(!isAuthenticate){
        navigate("/login")
    }
}