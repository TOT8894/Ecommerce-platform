import { useState } from "react"
import { Base_url } from "../../lib/api";
import { UseAuth } from "../../context/authContext";

export function Login(){
    const [credentials,setCredentials] = useState({
        email:"",
        password:""
    })
    const {Login} = UseAuth()
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState("")
    const [error,setError] = useState("")
    
    function onchange(e){
        const {name,value}=e.target;
        setCredentials({
            ...credentials,
            [name]:value
        })
    }
    async function handleSubmit(e){
        e.preventDefault()
        setError("")
        setLoading(true)
        try{
            const response = await Login(credentials) 
            const result = await response.json()
            setMessage(result.message)
        }catch(error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input">
                    <input 
                        type="email" 
                        name="email" 
                        id="" 
                        placeholder="Enter email"
                        value={credentials.email}
                        onChange={onchange}
                    />
                </div>
                <div className="login-input">
                    <input 
                        type="password" 
                        name="password"
                        id="" 
                        placeholder="***********"
                        value={credentials.password}
                        onChange={onchange}
                    />
                </div> 
                <div className="login-button">
                    <button>
                       { loading?"loggin in":"login"}
                    </button>
                </div>
                <div className="login-message">
                {message&& <p className="message">
                                {message}
                            </p>
                    }
                    {error&& <p className="error">
                                {error}
                            </p>
                    }               
                </div>
           </form>
        </>
    )
}