import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";
import * as bcrypt from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {DtoLoginDto} from "../users/dto/dto-login.dto";

@Injectable()
export class AuthService {


    constructor(

        private usersService:UsersService,
        private jwtService:JwtService

    ){}




    async login( userDto:DtoLoginDto) {
        const user=await this.validateUser(userDto);
        return this.generateToken(user);
    }

    private async validateUser(userDto:DtoLoginDto)
    {
        const user=await this.usersService.getUserByEmail(userDto.email);
        if(!user) {
            throw new UnauthorizedException({message:"Incorrect email"});
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(!passwordEquals) {
            throw new UnauthorizedException({message:"Incorrect password"});
        }
        return user;

    }

    async registration( userDto:CreateUserDto)
    {
        const candidate=await this.usersService.getUserByEmail(userDto.email);
        if(candidate){
            throw new HttpException('User with this email exists',HttpStatus.BAD_REQUEST)
        }

        if(!userDto.fio || !userDto.phoneNumber){
            throw new HttpException('Not all fields are filled',HttpStatus.BAD_REQUEST)
        }
        const hashPassword=await bcrypt.hash(userDto.password,5);
        const user=await this.usersService.createUser({...userDto,password:hashPassword});
        return this.generateToken(user);

    }

    private async generateToken(user:User)
    {
        const payload={id:user.id};
        return{
            accessToken:this.jwtService.sign(payload)
        }


    }

}
