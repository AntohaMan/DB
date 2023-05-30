import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {Services} from "./services.model";
import {Orders} from "../orders/orders.model";

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  imports:[TypeOrmModule.forFeature([Orders,Services]),UsersModule,AuthModule],
  exports:[ServicesService]
})
export class ServicesModule {}
