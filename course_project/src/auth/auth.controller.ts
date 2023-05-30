import {Body, Controller, Post, Put} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {DtoLoginDto} from "../users/dto/dto-login.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) {}



    @Post("/login")
    login(@Body() userDto:DtoLoginDto)
    {
        return this.authService.login(userDto);
    }

    @Post("/registration")
    registration(@Body() userDto:CreateUserDto)
    {

        return this.authService.registration(userDto);

    }


}
