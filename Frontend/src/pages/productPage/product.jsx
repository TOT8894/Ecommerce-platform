import react from "react";
import "./product.css"
import {useState,useEffect} from "react"
export function Product(){
    const[product,setProduct]=useState({
        name:"",
        price:0,
        description:"",
        category:"",
        image:"",
        stock:0
    });
    const [message,setMessage] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    function onchange(e){
        const {name,value} = e.target;
        setProduct({
            ...product,[name]:value
        })
    }
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError("")

        await fetch("http://localhost:5000/api/v1/products",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(product)
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            setMessage(data.message);
            setProduct(data.data);
        }).catch((error)=>{
            setError(error.message)
        }).finally(()=>{
            setLoading(false)
        })
}

    return(
        <div className="product">
           <form onSubmit={handleSubmit} className="product-form">
                <div className="product-input">
                    <input 
                    type="text" 
                    name="name" 
                    id=""
                    placeholder="Enter product"
                    value={product.name}
                    onChange={onchange}
                />
                </div>
                <div className="product-input">
                    <input 
                        type="number" 
                        name="price" 
                        id="" 
                        placeholder="Enter the price"
                        value={product.price}
                        onChange={onchange}
                    />
                </div>
                <div className="product-input">
                    <input 
                        type="text" 
                        name="description"
                        id="" 
                        placeholder="Enter description"
                        value={product.description}
                        onChange={onchange}
                    />
                </div> 
                <div className="product-input">
                    <input 
                        type="text" 
                        name="category" 
                        id="" 
                        placeholder="Enter category"
                        value={product.category}
                        onChange={onchange}
                    />
                </div>
                <div className="product-input">
                    <input 
                        type="text" 
                        name="image"
                        id=""  
                        placeholder="Enter image url"
                        value={product.image}
                        onChange={onchange}
                    />
                </div>
                <div className="product-input">
                    <input 
                        type="number" 
                        name="stock"
                        id="" 
                        placeholder="Enter number of stock"
                        value={product.stock}
                        onChange={onchange}
                    />
                </div>
                <div className="product-button">
                    <button>
                        {loading?"adding":"add"}
                    </button>
                </div>
                <div className="product-message">
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
        </div>
    )
}