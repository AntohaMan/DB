import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const registration=async (fio,phone_number,email,password)=>{
    const {data}=await $host.post('api/auth/registration',{fio,phone_number,email,password})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)

}

export const login=async (email,password)=>{
    const {data}=await $host.post('api/auth/login',{email,password})
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)

}