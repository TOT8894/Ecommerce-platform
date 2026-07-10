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
    const[loading,setLoading]=useState(false)
    function onchange(e){
        const{name,value} = e.target;
        setOrder({
            ...order,[name]:value
        })
    }
     async function handleSubmit(e){ 
        e.preventDefault();
        setError("")
        setLoading(true)
        fetch("http://localhost:5000/api/v1/orders",{
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
            setError(error.message)
        }).finally(()=>{
            setLoading(false)
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
                        placeholder="Enter customer name"
                        value={order.customerName}
                        onChange={onchange}
                    />
                </div>
                <div className="order-input">
                    <input 
                        type="text" 
                        name="customerAddress"
                        id="" 
                        placeholder="Enter customer address"
                        value={order.customerAddress}
                        onChange={onchange}
                    /> 
                </div>

                <div className="order-button">
                    <button >
                       {loading?"ordering":"place your order"} 
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