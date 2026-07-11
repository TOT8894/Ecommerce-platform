const ACCESS_KEY="accessToken"
const REFRESH_KEY="refreshToken"

export const Base_url=(import.meta.env.VITE_BASE_URL || "").replace(/\/$/,"")

export class ApiError extends Error{
    constructor(message,error){
        super(message);
        this.message=message;
        this.error=error;
    }
}
export function GetAccessToken(){
    return localStorage.getItem(ACCESS_KEY)
}
export function GetRefreshToken(){
    return localStorage.getItem(REFRESH_KEY)
}
export function SetAccessRefreshToken({accessToken,refreshToken}){
   if(accessToken){
        localStorage.setItem(ACCESS_KEY,accessToken); ho
    }
    if(refreshToken){
        localStorage.setItem(REFRESH_KEY,refreshToken)
    }
}
export function ClearToken(){
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY)
}
export function StoreToken(payload){
    const accessToken=payload?.accessToken??payload?.user?.accessToken??paylod?.data?.accessToken;
    const refreshToken=payload?.refreshToken??payload?.user?.refreshToken??payload?.data?.refreshToken;
    setAccessRefreshToken({accessToken,refreshToken})
}
export async function ApiRequest(url,options={}){
    const{headers={},data,method="GET"}=options;
    const token=GetAccessToken();
    if(token){
        headers["authorization"]=`Bearer ${token}`
    }
    headers["content-type"]="application/json";
    const response= await fetch(url,{  
        method,
        headers,
        body:JSON.stringify(data),
    })
    const result =await response.json();
    return result;
}
const AuthApi={
    login:(credential)=>ApiRequest(`${base_url}/api/v1/auth/login`,{
        method:"POST",
        data:credential
    }),
    register:(credential)=>ApiRequest(`${base_url}/api/v1/auth/register`,{
        method:"POST",
        data:credential
    }),
    logout:()=>ApiRequest(`${base_url}/api/v1/auth/logout`,{
        method:"POST"
    }),
}
const ListingApi={
    createListing:(credential)=>ApiRequest(`${base_url}/api/v1/listing/add`,{
        method:"POST",
        data:credential
    }),
    updateListing:(credential)=>ApiRequest(`${base_url}/api/v1/listing/update`,{
        method:"POST",
        data:credential
    }),
    getListing:()=>ApiRequest(`${base_url}/api/v1/listing/get`,{
        method:"GET"
    }),
    getListingById:(id)=>ApiRequest(`${base_url}/api/v1/listing/:id`,{
        method:"GET"
    }),
    deleteListing:(id)=>ApiRequest(`${base_url}/api/v1/listing/delete`,{
        method:"POST"
    }),
}
const OrderApi={
    createOrder:(credential)=>ApiRequest(`${base_url}/api/v1/order/create`,{
        method:"POST",
        data:credential
    }),
    updateOrder:(credential)=>ApiRequest(`${base_url}/api/v1/order/update`,{
        method:"POST",
        data:credential
    }),
    getOrder:()=>ApiRequest(`${base_url}/api/v1/order/get`,{
        method:"GET"
    }),
    getOrderById:(id)=>ApiRequest(`${base_url}/api/v1/order/:id`,{
        method:"GET"
    }),
    deleteOrder:(id)=>ApiRequest(`${base_url}/api/v1/order/delete`,{
        method:"POST"
    }),
}
        
