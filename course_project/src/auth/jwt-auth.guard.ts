import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {raw} from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService:JwtService, private readonly userService: UsersService) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req=context.switchToHttp().getRequest()
        try{
            const authHeader=req.headers.authorization;
            const bearer=authHeader.split(' ')[0];
            const token=authHeader.split(' ')[1];
            if(bearer!=='Bearer' || !token){
                 throw new UnauthorizedException({message:"User is not authorized"});
            }
            const tokenPayload = this.jwtService.verify(token);
            req.user = await this.userService.getOne(tokenPayload.id);
            return true;
        }
        catch (e){
            console.log(e)
             throw new UnauthorizedException({message:"User is not authorized"});
        }
    }

}