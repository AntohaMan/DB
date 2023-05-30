import {forwardRef, Module} from '@nestjs/common';
import { Auth2Controller } from './auth2.controller';
import { Auth2Service } from './auth2.service';
import {UsersModule} from "../users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {JwtModule} from "@nestjs/jwt";
import {Token} from "../token/token-model";
import {AccessTokenStrategy} from "./strategies/accessToken.strategy";
import {RefreshTokenStrategy} from "./strategies/refreshToken.strategy";
import {TokenModule} from "../token/token.module";

@Module({
  controllers: [Auth2Controller],
  providers: [Auth2Service,AccessTokenStrategy, RefreshTokenStrategy],
  imports:[forwardRef(()=>UsersModule),TypeOrmModule.forFeature([User,Token]),
    JwtModule.register({}),TokenModule
  ],
  exports:[Auth2Service]
})
export class Auth2Module {}
