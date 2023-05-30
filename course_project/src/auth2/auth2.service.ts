import {
    BadRequestException, ForbiddenException,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {DtoLoginDto} from "../users/dto/dto-login.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import {TokenService} from "../token/token.service";

@Injectable()
export class Auth2Service {

    constructor(private usersService: UsersService,
                private jwtService: JwtService,

               private tokenService: TokenService) {
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST);
        }
        const hash = await bcrypt.hash(dto.password, 5);
        const user = await this.usersService.createUser({...dto, password: hash});
        const tokens = await this.getTokens(user.id);
        await this.tokenService.saveToken(user.id,tokens.refreshToken)
        return tokens;
    }


    async getTokens(userId: number) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    id: userId
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    id: userId,
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }


    async login(dto: DtoLoginDto) {
        const user=await this.usersService.getUserByEmail(dto.email);
        if(!user){ throw new BadRequestException({message:"Incorrect email"});}
        const passwordEquals=bcrypt.compare(dto.password,user.password)
        if(!passwordEquals){throw new BadRequestException({message:"Incorrect password"});}
        const tokens = await this.getTokens(user.id);
        await this.tokenService.updateToken(user.id,tokens.refreshToken)
        return tokens;


    }

    async logout(id:number) {
        await this.tokenService.logOut(id);
    }

    async refreshTokens(userId:number,refreshToken: string){
        const user=await this.usersService.getOne(userId);
        if (!user || user.token.refreshToken==='') throw new ForbiddenException('Access Denied');
        const equalTokens=await this.tokenService.compareRefreshTokens(user,refreshToken);
        if(equalTokens){
            const tokens = await this.getTokens(user.id);
            await this.tokenService.updateToken(user.id,tokens.refreshToken)
            return tokens;
        }
        throw new BadRequestException({message:"Incorrect data"})

    }




}
