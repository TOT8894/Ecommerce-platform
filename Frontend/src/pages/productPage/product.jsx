import react from "react";
import axios from "axios"
import {useState,useEffect} from "react-dom"
export function Product(){
    const[product,setProduct]=useState([]);
    useEffect(()=>{
        axios.post("http://localhost:5000/api/v1/products",{product})
    },[product])
    function handler(e){
        e.preventDefault();
        setProduct()
    }
    return(
        <>
            <input type="text" name="" id="" />
            <input type="text" name="" id="" />
            <input type="text" name="" id="" />
            <input type="text" name="" id="" />
            <input type="text" />
            <input type=""/>
            <button>add</button>
        </>
    )
}