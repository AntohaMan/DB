import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Orders} from "../orders/orders.model";
import {Auth2Module} from "../auth2/auth2.module";
import {Token} from "../token/token-model";
import {Feedback} from "../feedback/feedback.model";



@Module({
  imports:[TypeOrmModule.forFeature([User,Role,Orders,Feedback]),RolesModule,forwardRef(()=>AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
