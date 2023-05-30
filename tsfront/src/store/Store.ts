import {makeAutoObservable} from "mobx";

export default class Store{
    private _service: any;
    private _staff: any;
    private _selectedService: any;


    constructor() {
        this._service=[
            {id:1,name:'elec',price:15,lead_time:'1 hour',description:'installation'},
            {id:2,name:'elec2',price:15,lead_time:'1 hour',description:'installation'},
            {id:3,name:'elec3',price:15,lead_time:'1 hour',description:'installation'},

        ]
        this._staff=[
            {id:1,fio:'Ivanov Ivan Ivanovich',birthday:'2001-03-12',phone:'+375299321112',photo:'yuiy9',specialization:'electrician'},
            {id:2,fio:'Ivanov2 Ivan2 Ivanovich2',birthday:'2001-03-12',phone:'+375299321112',photo:'yuiy9',specialization:'electrician'},
            {id:3,fio:'Ivanov2 Ivan3 Ivanovich2',birthday:'2001-03-12',phone:'+375299321112',photo:'yuiy9',specialization:'electrician'},
            {id:4,fio:'Ivanov2 Ivan4 Ivanovich2',birthday:'2001-03-12',phone:'+375299321112',photo:'yuiy9',specialization:'electrician'},
        ]
        this._selectedService={}
        makeAutoObservable(this)
    }

    setServices(service:any){
        this._service=service
    }
    setStaff(staff:any){
        this._staff=staff
    }
    setSelectedService(service:any){
        this._selectedService=service
    }

    get services(){
        return this._service
    }

    get staff(){
        return this._staff
    }
    get selectedService(){
        return this._selectedService
    }


}