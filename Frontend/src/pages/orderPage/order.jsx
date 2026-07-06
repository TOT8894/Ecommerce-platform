import react from "react";
import {useState,useEffect} from "react-dom"
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
    
    useEffect(()=>{
        fetch("http://localhost:5000/api/v1/orders",{
            methode:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:order
        }).then((res)=>{
            return res.json();
        }).then((message,order)=>{
            setOrder(order);
            setMessage(message);
        }).catch((error)=>{
            setError(error)
        })
    },[order])

    function handler(e){
        e.preventDefault();
    }
    return(
        <div className="order">
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
                <button onClick={handler}>
                    place your order
                </button>
            </div>
            <div className="order-message">
                <p className="message">{message}</p>
                <p className="error">{error}</p>
            </div>
        </div>
    )
}