import axios from "axios";


export const axiosCilent=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})
axiosCilent.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token")
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})
axiosCilent.interceptors.response.use((response)=>{
    return response
},(error)=>{
    console.log(error)
    if(error.response.status===401){
        localStorage.removeItem("token")
        window.location.href="/login"
    }
    return Promise.reject(error)
})