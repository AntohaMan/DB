import {forwardRef, Module} from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "../roles/roles.model";
import {User} from "../users/users.model";
import {Orders} from "./orders.model";
import {Staff} from "../staff/staff.model";
import {Services} from "../services/services.model";
import {ServicesModule} from "../services/services.module";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {StaffModule} from "../staff/staff.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[TypeOrmModule.forFeature([User,Orders,Staff,Services]),ServicesModule,UsersModule,AuthModule,StaffModule],
})
export class OrdersModule {}
