import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Role} from "../roles/roles.model";
import {Orders} from "../orders/orders.model";
import {Staff} from "../staff/staff.model";
import {UsersModule} from "../users/users.module";
import {StaffModule} from "../staff/staff.module";
import {Feedback} from "./feedback.model";

@Module({
  providers: [FeedbackService],
  controllers: [FeedbackController],
  imports:[TypeOrmModule.forFeature([User,Staff,Feedback]),UsersModule,StaffModule]
})
export class FeedbackModule {}
