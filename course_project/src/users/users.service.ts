import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {create} from "domain";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {Token} from "../token/token-model";
import * as bcrypt from "bcryptjs";
import {ChangeUserDto} from "./dto/change-user.dto";

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
    private usersRepository:Repository<User>,
        private roleService:RolesService
        ){}

    async createUser(dto:CreateUserDto) {
        const user=await this.usersRepository.create(dto);
        const role= await this.roleService.getRoleByValue("USER");
        if(!role) {
            throw new UnauthorizedException({message:"Incorrect data"});

        }
        user.roles = [role];
        await  this.usersRepository.save(user);
        return user;
    }

    async changeUser(userId:any,dto:ChangeUserDto){
        const user=await this.usersRepository.findOneBy({id:userId})
        await this.usersRepository.update({id:user!.id},{...dto})
        return {message:"Ваши данные обновлены"};
    }


    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find({relations:{roles:true,token:true}});
    }

    async getUserByEmail(email:string)
    {
        return this.usersRepository.findOne({where:{email},relations:{roles:true,token:true}});
    }

    async getOne(id:any)
    {
        return await this.usersRepository.findOne({where:{id:id},relations:{roles:true,token:true}});
    }

    async addRole(dto:AddRoleDto):Promise<AddRoleDto>{
        const user=await this.usersRepository.findOne({where:{id:dto.userId}});
        const role=await this.roleService.getRoleByValue(dto.value);
        if(user && role){
            user.roles = [role];
            await this.usersRepository.save(user);
            return dto;
        }
        throw new HttpException('User or role dont find',HttpStatus.NOT_FOUND);

    }

    async delUser(id:number){
        const delUser=await this.usersRepository.findOneBy({id:id})
        if(!delUser){throw new UnauthorizedException({message:'incorrect data'})}
        await this.usersRepository.remove(delUser);
        return {message:"deleted user"};

    }

    async ban(dto: BanUserDto) {
        const user=await this.usersRepository.findOne({where:{id:dto.userId}})
        if(!user){
            throw new HttpException('User dont find',HttpStatus.NOT_FOUND);
        }

        user.banned=true;
        user.banReason=dto.banReason;
        await this.usersRepository.save(user);
        return user;
    }

    async addToken(userId:number,token:Token){
        const user=await this.getOne(userId);
        if(!user){  throw new HttpException('User dont find',HttpStatus.NOT_FOUND);}
         user.token=token;
        await this.usersRepository.save(user);
    }

    async feedback(userId:number,text:string){
        const user=await this.getOne(userId);
        if(!user){  throw new HttpException('User dont find',HttpStatus.NOT_FOUND);}

    }


}
