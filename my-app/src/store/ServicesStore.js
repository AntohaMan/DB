import {makeAutoObservable} from "mobx";

export default class ServicesStore{
    constructor(){
        this._services=[]
            this._staff=[]
        this._selectedService={}
        this._selectedStaff={}
        this._page=1//current page
        this._totalCount=0//
        this._limit=8//count staff on page

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
        this._selectedStaff=serv
    }
    setPage(page){
        this._page=page
    }
    setTotalCount(count){
        this._totalCount=count
    }

    get serv(){
        return this._services

    }
    get staf(){
        return this._staff

    }
    get selectedService(){
        this.setPage(1)
        return this._selectedService
    }

    get selectedStaff(){
        this.setPage(1)
        return this._selectedStaff
    }
    get totalCount(){
        return this._totalCount
    }
    get page(){
        return this._page
    }
    get limit(){
        return this._limit
    }

}