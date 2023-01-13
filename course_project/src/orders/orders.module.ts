import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../roles/roles.model";
import {User} from "../users/users.model";
import {OrderContent} from "../order-content/order-content.model";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[TypeOrmModule.forFeature([User,OrderContent])],
})
export class OrdersModule {}
