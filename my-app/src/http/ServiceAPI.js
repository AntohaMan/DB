import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const createService=async (name,price,lead_time,description)=>{
    const {data}=await $authHost.post('api/services',{name,price,lead_time,description})

    return data

}

export const getServ=async ()=>{
    const {data}=await $host.get('api/services')
    return data

}

export const createStaff=async (fio,birthday,phone,specialization)=>{
    const {data}=await $authHost.post('api/staff',{fio,birthday,phone,specialization})

    return data

}

export const getStaff=async ()=>{
    const {data}=await $host.get('api/staff')
    return data

}

export const getOneStaff=async (id)=>{

    const {data}=await $host.get('api/staff/'+id)

    return data

}

export const createPhotoStaff=async (staffId,image)=>{
    const {data}=await $authHost.post('api/staff/add/image',{staffId,image})
    return data

}
export const getSpec=async (name)=>{
    const {data}=await $host.get('api/services/take/'+name)
    return data

}


