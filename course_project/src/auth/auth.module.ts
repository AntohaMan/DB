import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";

import {User} from "../users/users.model";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {Role} from "../roles/roles.model";
import {RolesGuard} from "./roles.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService,RolesGuard],
  imports:[forwardRef(()=>UsersModule),TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '30s' },
    }),
  ],
  exports:[AuthService,JwtModule]
})
export class AuthModule {}
