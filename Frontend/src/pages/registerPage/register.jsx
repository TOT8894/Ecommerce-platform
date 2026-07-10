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
        }catch(error){
            setError(error.message)
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
                    placeholder="Enter full name"
                    value={credentials.name}
                    onChange={onchange}
                />
                </div>
                <div className="register-input">
                    <input 
                        type="email" 
                        name="email" 
                        id="" 
                        placeholder="Enter email"
                        value={credentials.email}
                        onChange={onchange}
                    />
                </div>
                <div className="register-input">
                    <input 
                        type="password" 
                        name="password"
                        id="" 
                        placeholder="********"
                        value={credentials.password}
                        onChange={onchange}
                    />
                </div> 
                <div className="register-input">
                    <input 
                        type="text" 
                        name="phone" 
                        id="" 
                        placeholder="09/07********"
                        value={credentials.phone}
                        onChange={onchange}
                    />
                </div>
                <select className="register-input"
                    type="text" 
                    name="role"
                    id=""  
                    value={credentials.role}
                    onChange={onchange}
                >
                    <option 
                        type="text" 
                        name="role"
                        id=""  
                        value="seller"
                    >
                        seller
                    </option>
                    <option 
                        type="text" 
                        name="role"
                        id=""  
                        value="buyer"
                    >
                        buyer
                    </option>
                </select>
                <div className="register-button">
                    <button>
                       { loading?"loading":"register"}
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