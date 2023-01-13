import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Orders} from "../orders/orders.model";



@Module({
  imports:[TypeOrmModule.forFeature([User,Role,Orders]),RolesModule,forwardRef(()=>AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
