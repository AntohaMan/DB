import {Controller, ForbiddenException, Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Repository} from "typeorm";
import {Token} from "./token-model";
import * as bcrypt from "bcryptjs"
import {CreateUpdateDto} from "./dto/create-update.dto";


@Injectable()
export class TokenService{
    constructor(@InjectRepository(Token)
                private tokenRepository:Repository<Token>,
                private userService:UsersService) {}

    async saveToken(userId:number,refreshToken:string){
        const hashRefreshToken= await bcrypt.hash(refreshToken,5);
        const token=await this.tokenRepository.save({refreshToken:hashRefreshToken});
        await this.userService.addToken(userId,token);
    }

    async updateToken(userId:number,refreshToken:string){
        const user=await this.userService.getOne(userId);
        const hashRefreshToken= await bcrypt.hash(refreshToken,5);
        await this.tokenRepository.update(user!.token.id,{refreshToken:hashRefreshToken});
    }

    async logOut(userId:number){
        const user=await this.userService.getOne(userId);
        await this.tokenRepository.update(user!.token.id,{refreshToken:''});
    }

    async compareRefreshTokens(user:User,refreshToken:string){
        const token=await this.tokenRepository.findOneBy({id:user.token.id})
        const equalTokens=await bcrypt.compare(refreshToken,token!.refreshToken)
        if(!equalTokens)throw new ForbiddenException('Access Denied');
        return true;
    }










}