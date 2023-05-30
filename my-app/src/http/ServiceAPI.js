import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

export const createService=async (name,price,leadTime,description)=>{
    const {data}=await $authHost.post('api/services',{name,price,leadTime,description})

    return data

}
export const changeService=async (id,name,price,leadTime,description)=>{
    const {data}=await $authHost.put('api/services',{id,name,price,leadTime,description})
    return data

}


export const getServ=async ()=>{
    const {data}=await $host.get('api/services')
    return data

}
export const deleteService=async (id)=>{
    const {data}=await $authHost.delete('api/services/'+id)

    return data

}

export const createStaff=async (fio,birthday,phone,specialization)=>{
    const {data}=await $authHost.post('api/staff',{fio,birthday,phone,specialization})

    return data

}
export const changeStaff=async (id,fio,birthday,phone,specialization)=>{
    const {data}=await $authHost.put('api/staff',{id,fio,birthday,phone,specialization})
    return data

}

export const getStaff=async (serviceName,limit=8,page)=>{
    const {data}=await $host.get('api/staff',{params:{
            serviceName, limit, page
        }})
    return data

}

export const getAllStaff=async ()=>{
    const {data}=await $authHost.get('api/staff/all')
    return data

}
export const deleteStaff=async (id)=>{
    const {data}=await $authHost.delete('api/staff/'+id)
    return data
}

export const getOneStaff=async (id)=>{
    const {data}=await $host.get('api/staff/'+id)
    return data
}

const config = {
    headers: { 'content-type': 'multipart/form-data' }
}

export const createPhotoStaff=async (staffId,image)=>{
    const {data}=await axios.put(`${process.env.REACT_APP_API_URL}api/staff/add/image`,{staffId,image},config)
    return data

}
export const getSpec=async (name)=>{
    const {data}=await $host.get('api/services/take/'+name)
    return data

}


export const createOrder=async(servicesId,staffId,address,dateOfCompletion,leadTime,coast)=>{
    const {data}=await $authHost.post('api/orders',{servicesId,staffId,address,dateOfCompletion,leadTime,coast})

    return data
}

export const getUserOrders=async()=>{
    const {data}=await $authHost.get('api/orders')
//data.map(d=>console.log(d))
    return data
}
export const changeUser=async (fio,phoneNumber,email,password)=>{
    const {data}=await $authHost.put('api/users',{fio,phoneNumber,email,password})
    return data

}
export const getOneReq=async()=>{
    const {data}=await $authHost.get('api/users/req')
    return data
}

export const createFeedback=async(staffId,text)=>{
    const {data}=await $authHost.post('api/feedback', {staffId, text})
    return data;
}
export const getFeedbackById=async (id)=>{
    const {data}=await $host.get('api/feedback/'+id)
    return data;
}
export const searchOneStaff=async (fio)=>{
    const {data}=await $host.get('api/staff/search/'+fio)
    return data;
}