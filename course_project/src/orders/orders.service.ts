import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "../roles/roles.model";
import {Repository} from "typeorm";
import {Orders} from "./orders.model";
import {CreateOrdersDto} from "./dto/create-orders.dto";
import {ServicesService} from "../services/services.service";
import {UsersService} from "../users/users.service";
import {StaffService} from "../staff/staff.service";
import {ChangeOrderDto} from "./dto/changeOrder.dto";


@Injectable()
export class OrdersService {

    constructor( @InjectRepository(Orders)
                 private ordersRepository:Repository<Orders>,
                 private servicesService:ServicesService,
                 private usersService:UsersService,
                 private staffService:StaffService,
                ) {}
    async createOrders(id:any,dto:CreateOrdersDto){
        const user=await this.usersService.getOne(id)
        if(!user){ throw new UnauthorizedException({message:"not found user"});}
        const date=new Date()

        const staff=await this.staffService.getStaff(dto.staffId)
        if(!staff){ throw new UnauthorizedException({message:"not found staff"});}

        const services=await this.servicesService.getOne(dto.servicesId)
        if(!services){ throw new UnauthorizedException({message:"not found services"});}

          return await  this.ordersRepository.save({...dto,date:date,coast:services.price,lead_time:services.leadTime,user:user,staff:staff,services:services})



    }
    async getOrder(id:number){
        return await this.ordersRepository.findOne({where:{id:id},relations:{staff:true,services:true,user:true}});
    }

    async getUserOrders(id:any){
        return await this.ordersRepository.find({relations:{staff:true,services:true,user:true},where:{user:{id:id}},})
    }
    async changeOrder(dto:ChangeOrderDto){
        const order=await this.ordersRepository.findOne({where:{id:dto.id}})
        await this.ordersRepository.update({id:order!.id},{...dto});
        return {message:"changed order"};
    }
    async del(id:number){
        const delOrder=await this.ordersRepository.findOneBy({id:id})
        if(!delOrder){throw new UnauthorizedException({message:'incorrect data'})}
        await this.ordersRepository.remove(delOrder);
        return {message:"deleted order"};
    }



}
