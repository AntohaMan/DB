import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Staff} from "../staff/staff.model";
import {Repository} from "typeorm";
import {FilesService} from "../files/files.service";
import {Services} from "./services.model";
import {CreateServicesDto} from "./dto/create-services.dto";
import {ChangeDto} from "./dto/change.dto";

@Injectable()
export class ServicesService {
    constructor( @InjectRepository(Services)
                 private servicesRepository:Repository<Services>) {}
    async createServices(dto:CreateServicesDto){
        return  this.servicesRepository.save(dto);
}

    async changeServices(dto:ChangeDto){
        const services=await this.servicesRepository.findOne({where:{id:dto.id}})
        await this.servicesRepository.update({id:services!.id},{...dto});
        return {message:"changed services"};
    }

    async getOne(id:number)
    {
        return await this.servicesRepository.findOne({where:{id:id}});
    }

    async deleteServices(id:number){
        const delServices=await this.servicesRepository.findOneBy({id:id})
        if(!delServices){throw new UnauthorizedException({message:'incorrect data'})}
        await this.servicesRepository.remove(delServices);
        return {message:"deleted services"};
    }
    async getAll(){
        return this.servicesRepository.find();
    }

    async getSpec(name:string){
        return await this.servicesRepository.findOne({where:{name:name}});
    }
}
