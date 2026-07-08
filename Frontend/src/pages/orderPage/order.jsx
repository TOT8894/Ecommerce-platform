import react from "react";
import "./order.css"
import {useState,useEffect} from "react"
export function Order(){
    const[order,setOrder]=useState({
        items:{
            product:"",
            quantity:""
        },
        totalAmount:"",
        customerName:"",
        customerAddress:""
    });
    const[error,setError]=useState("")
    const[message,setMessage]=useState("")
    
     async function handleSubmit(e){ 
        e.preventDefault();
        await  fetch("http://localhost:5000/api/v1/orders",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(order)
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            setOrder(data.data);
            setMessage(data.message);
        }).catch((error)=>{
            setError(error)
        })
    }

    return(
        <div className="order">
           <form onSubmit={handleSubmit} className="order-form">
                 <div className="order-input">
                <input 
                    type="text" 
                    name="customerName" 
                    id=""
                    value={order.customerName}
                    onChange={e=>setOrder(e.target.value)}
                />
            </div>
            <div className="order-input">
                <input 
                    type="text" 
                    name="customerAddress"
                    id="" 
                    value={order.customerAddress}
                    onChange={e=>setOrder(e.target.value)}
                /> 
            </div>

            <div className="order-button">
                <button >
                    place your order
                </button>
            </div>
            <div className="order-message">
               {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}
            </div>
           </form> 
        </div>
    )
}