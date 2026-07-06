import react, { use } from "react";
import "./product.css"
import {useState,useEffect} from "react-dom"
export function Product(){
    const[product,setProduct]=useState({
        name:"",
        price:0,
        description:"",
        category:"",
        image:"",
        stock:0
    });
    const [message,setMessage]=useState("")
    const [error,setError]=useState("")
    useEffect(()=>{
        fetch("http://localhost:5000/api/v1/products",{
            methode:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:product
        }).then((res)=>{
            return res.json()
        }).then((message,data)=>{
            setMessage(message);
            setProduct(data);
        }).catch((error)=>{
            setError(error)
        })
    },[product])

    function handler(e){
        e.preventDefault();
    }
    return(
        <div className="product">
            <div className="product-input">
                <input 
                type="text" 
                name="name" 
                id=""
                value={product.name}
                onChange={e=>setProduct(e.target.value)}
             />
            </div>
            <div className="product-input">
                <input 
                    type="Number" 
                    name="price" 
                    id="" 
                    value={product.price}
                    onChange={e=>setProduct(e.target.value)}
                />
            </div>
            <div className="product-input">
                <input 
                    type="text" 
                    name="description"
                    id="" 
                    value={product.description}
                    onChange={e=>setProduct(e.target.value)}
                />
            </div> 
            <div className="product-input">
                <input 
                    type="text" 
                    name="category" 
                    id="" 
                    value={product.category}
                    onChange={e=>setProduct(e.target.value)}
                />
            </div>
            <div className="product-input">
                <input 
                    type="image" 
                    name="image"
                    id=""  
                    value={product.image}
                    onChange={e=>setProduct(e.target.value)}
                />
            </div>
            <div className="product-input">
                <input 
                    type="Number" 
                    name="stock"
                    id="" 
                    value={product.stock}
                    onChange={e=>setProduct(e.target.value)}
                />
            </div>
            <div className="product-button">
                <button onClick={handler}>
                    add
                </button>
            </div>
            <div className="product-message">
                <p className="message">{message} </p>
                <p className="error">{error} </p>
            </div>
        </div>
    )
}