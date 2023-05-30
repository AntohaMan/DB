import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Repository} from "typeorm";
import {Staff} from "./staff.model";
import {CreateStaffDto} from "./dto/create-staff.dto";
import {FilesService} from "../files/files.service";
import {UsersService} from "../users/users.service";
import {ImageDto} from "./dto/image.dto";
import {ChangeDto} from "./dto/change.dto";
import {ServicesService} from "../services/services.service";
import {SearchDto} from "./dto/search.dto";

@Injectable()
export class StaffService {

    constructor( @InjectRepository(Staff)
        private staffRepository:Repository<Staff>,
                 private filesService:FilesService,
                 //private servicesService:ServicesService
                 ) {
    }

    async createStaff(dto:CreateStaffDto){
        return this.staffRepository.save(dto);
    }

    async addImage(dto:ImageDto,image:Express.Multer.File){
        const fileName=await this.filesService.createFile(image);
        if (!dto.staffId){return {message:"not found staffId"};}
        const staff=await this.staffRepository.findOne({where:{id:dto.staffId}})
        await this.staffRepository.update({id:staff!.id},{photo:fileName});
        return {message:"image added"};
    }
   async changeStaff(dto:ChangeDto){
        const staff=await this.staffRepository.findOne({where:{id:dto.id}})
       await this.staffRepository.update({id:staff!.id},{...dto});
       return {message:"changed staff"};


    }
    async deleteStaff(id:number){
        const delStaff=await this.staffRepository.findOneBy({id:id})
        if(!delStaff){throw new UnauthorizedException({message:'incorrect data'})}
        await this.staffRepository.remove(delStaff);
        return {message:"deleted staff"};
    }

    async getStaff(id:number){
        return await this.staffRepository.findOneBy({id:id})
    }
async getAllStaff(){
        return await this.staffRepository.find();
}
    async searchStaff(fio:string){
        return await this.staffRepository.findOneBy({fio:fio});
    }

    async getAll (dto:SearchDto){
        let {serviceName,limit,page}=dto
        page=page || 1
        limit=limit || 8
        let offset=page*limit - limit
        let staff;

        if(!serviceName){
            staff=await this.staffRepository.findAndCount({skip:offset,take:limit})
        }
        if(serviceName){
            staff=await this.staffRepository.findAndCount({where:{specialization:serviceName},skip:offset,take:limit})
        }


        return staff;
    }

    async getOne(id:number){
        return this.staffRepository.findOne({where:{id:id}})
    }

}
