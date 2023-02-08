import {makeAutoObservable} from "mobx";

export default class ServicesStore{
    constructor(){
        this._services=[]
            this._staff=[]
        this._selectedService={}

        makeAutoObservable(this)
    }

    setServices(services){
        this._services=services

    }
    setStaff(staff){
        this._staff=staff

    }
    setSelectedService(serv){
        this._selectedService=serv
    }
    setSelectedStaff(serv){
        this._selectedService=serv
    }
    get serv(){
        return this._services

    }
    get staf(){
        return this._staff

    }
    get selectedService(){
        return this._selectedService
    }
    get selectedStaff(){
        return this._selectedService
    }

}