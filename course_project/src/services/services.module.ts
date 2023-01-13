import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../roles/roles.model";
import {User} from "../users/users.model";
import {OrderContent} from "../order-content/order-content.model";

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  imports:[TypeOrmModule.forFeature([OrderContent])],
})
export class ServicesModule {}
