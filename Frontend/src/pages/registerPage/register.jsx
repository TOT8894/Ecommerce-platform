import { useState } from "react"
import { Base_url } from "../../lib/api";
import { UseAuth } from "../../context/authContext";

export function Register(){
    const [credentials,setCredentials] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        role:""
    })
    const {Register} = UseAuth()
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
            const response = await Register(credentials) 
            const result = await response.json()
            setMessage(result.message)
        }catch(err){
            setError(err)
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-input">
                    <input 
                    type="text" 
                    name="name" 
                    id=""
                    value={credentials.name}
                    onChange={onchange}
                />
                </div>
                <div className="register-input">
                    <input 
                        type="email" 
                        name="email" 
                        id="" 
                        value={credentials.email}
                        onChange={onchange}
                    />
                </div>
                <div className="register-input">
                    <input 
                        type="password" 
                        name="password"
                        id="" 
                        value={credentials.password}
                        onChange={onchange}
                    />
                </div> 
                <div className="register-input">
                    <input 
                        type="text" 
                        name="phone" 
                        id="" 
                        value={credentials.phone}
                        onChange={onchange}
                    />
                </div>
                <select className="register-input">
                    <option 
                        type="text" 
                        name="role"
                        id=""  
                        value={credentials.role}
                        onChange={onchange}
                    >
                        seller
                    </option>
                    <option 
                        type="text" 
                        name="role"
                        id=""  
                        value={credentials.role}
                        onChange={onchange}
                    >
                        buyer
                    </option>
                </select>
                <div className="register-button">
                    <button>
                       { loading?"credentialsing":"credentials"}
                    </button>
                </div>
                <div className="register-message">
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