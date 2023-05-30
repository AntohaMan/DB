import {forwardRef, Module} from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Staff} from "./staff.model";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersService} from "../users/users.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {FilesModule} from "../files/files.module";
import {Orders} from "../orders/orders.model";
import {Feedback} from "../feedback/feedback.model";

@Module({
  providers: [StaffService],
  controllers: [StaffController],
  imports:[TypeOrmModule.forFeature([Orders,Staff,Feedback]),UsersModule,AuthModule,FilesModule],
  exports:[StaffService]
})
export class StaffModule {}
