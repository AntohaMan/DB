import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderContent} from "../order-content/order-content.model";

@Module({
  providers: [StaffService],
  controllers: [StaffController],
  imports:[TypeOrmModule.forFeature([OrderContent])],
  exports:[StaffService]
})
export class StaffModule {}
