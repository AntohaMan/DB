import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Role} from "./roles.model";

@Module({
  imports:[TypeOrmModule.forFeature([Role,User])],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
