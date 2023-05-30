import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";
import React from "react";

export const registration=async (fio,phoneNumber,email,password)=>{
    const {data}=await $host.post('api/auth2/registration',{fio,phoneNumber,email,password})
    localStorage.setItem('token',data.accessToken)
    return jwt_decode(data.accessToken)

}

export const login=async (email,password)=>{
    //try {
        const {data}=await $host.post('api/auth2/login',{email,password})
        localStorage.setItem('token',data.accessToken)
        return jwt_decode(data.accessToken)
    //}
//     catch (e){
//         alert(<><div className="alert alert-danger" role=" alert">
//   Это уведомление об опасности — check it out!
// </div></>)
//         alert(e.response.data.message)
//     }

}

/*export const check=async ()=>{
    const {data}= await $authHost.get('api/auth2/refresh')
    localStorage.setItem('token',data.accessToken)
    return jwt_decode(data.accessToken)
}*/

export const checkAuth=async ()=>{
    const {data}=await axios.get(`${process.env.REACT_APP_API_URL}api/auth2/refresh `,{withCredentials:true})
    localStorage.setItem('token',data.accessToken)
    return jwt_decode(data.accessToken)
}

export const logOUT=async ()=>{
    await $authHost.get('api/auth2/logout')
    localStorage.setItem('token',null)
}