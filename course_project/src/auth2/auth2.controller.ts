import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { Request,Response } from 'express';
import {DtoLoginDto} from "../users/dto/dto-login.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "../auth/auth.service";
import {Auth2Service} from "./auth2.service";
import {AccessTokenGuard} from "../common/guards/accessToken.guard";
import {RefreshTokenGuard} from "../common/guards/refreshToken.guard";


@Controller('auth2')
export class Auth2Controller {
    constructor(private auth2Service:Auth2Service) {
    }

    @Post("/registration")
    async registration(@Body() userDto:CreateUserDto,@Res({ passthrough: true }) response: Response){

        const userData=await this.auth2Service.registration(userDto);
        response.cookie('refreshToken',userData.refreshToken,{maxAge:7*24*60*60*1000,httpOnly:true});
        return userData;


    }

    @Post("/login")
    async login(@Body() userDto:DtoLoginDto,@Res({ passthrough: true }) response: Response){
        const userData=await this.auth2Service.login(userDto);
        response.cookie('refreshToken',userData.refreshToken,{maxAge:7*24*60*60*1000,httpOnly:true});
        return userData;

    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logOut(@Req() req:any,@Res({ passthrough: true }) response: Response){
        this.auth2Service.logout(req.user['id']);
        response.clearCookie('refreshToken')

    }
    @UseGuards(RefreshTokenGuard)
    @Get('/refresh')
    async refresh(@Req() req:any,@Res({ passthrough: true }) response: Response){
        const userId = req.user['id'];
        const refreshToken = req.user['refreshToken'];
        const userData=await this.auth2Service.refreshTokens(userId, refreshToken);
        response.cookie('refreshToken',userData.refreshToken,{maxAge:7*24*60*60*1000,httpOnly:true});
        return userData;
    }



}
