import { Module } from '@nestjs/common';
import { OrderContentController } from './order-content.controller';
import { OrderContentService } from './order-content.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Services} from "../services/services.model";
import {Staff} from "../staff/staff.model";
import {Orders} from "../orders/orders.model";

@Module({
  controllers: [OrderContentController],
  providers: [OrderContentService],
  imports:[TypeOrmModule.forFeature([Services,Staff,Orders])],
})
export class OrderContentModule {}
