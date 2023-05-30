import {Module} from "@nestjs/common";
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { StaffModule } from './staff/staff.module';
import { OrdersModule } from './orders/orders.module';
import {Orders} from "./orders/orders.model";
import {Staff} from "./staff/staff.model";
import {Services} from "./services/services.model";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Auth2Module } from './auth2/auth2.module';
import path from "path";
import {Token} from "./token/token-model";
import {TokenModule} from "./token/token.module";
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { FeedbackModule } from './feedback/feedback.module';
import {Feedback} from "./feedback/feedback.model";



@Module({
    controllers:[],
    providers:[OrderService],
    imports: [ConfigModule.forRoot({
        envFilePath:`.${process.env.NODE_ENV}.env`
    }),ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', '/dist/static'),
    }),
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port:  Number(process.env.POSTGRES_PORT),
        username:  process.env.POSTGRES_USER,
        password:  process.env.POSTGRES_PASSWORD,
        database:  process.env.POSTGRES_DB,
        entities: [User,Role,Orders,Staff,Services,Token,Feedback],
        synchronize:true,
        autoLoadEntities:true
    }),UsersModule, RolesModule, AuthModule, ServicesModule, StaffModule, OrdersModule, Auth2Module,TokenModule, OrderModule, FeedbackModule]
})
export class AppModule{}