import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ServicesService} from "../services/services.service";
import {CreateServicesDto} from "../services/dto/create-services.dto";
import {ChangeDto} from "../services/dto/change.dto";
import {OrdersService} from "./orders.service";
import {CreateOrdersDto} from "./dto/create-orders.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {ChangeOrderDto} from "./dto/changeOrder.dto";
import {AccessTokenGuard} from "../common/guards/accessToken.guard";

@Controller('orders')
export class OrdersController {

    constructor(private ordersService:OrdersService) {
    }
    //@Roles(eRole.Admin)
     //@UseGuards(JwtAuthGuard)
    @UseGuards(AccessTokenGuard)
    @Post()
    create(@Req() req:any,@Body() dto:CreateOrdersDto){
        return this.ordersService.createOrders(req.user.id,dto);
    }

    @Get(':id')
    get(@Param('id')id:number){
        return this.ordersService.getOrder(id)
    }

    @UseGuards(AccessTokenGuard)
    @Get()
    getUserOrders(@Req() req:any,){
        return this.ordersService.getUserOrders(req.user.id)
    }


    @Put()
    change(@Body() dto:ChangeOrderDto){
        return this.ordersService.changeOrder(dto)
    }
    @Delete()
    delete(@Body() id:number){
        return this.ordersService.del(id)
    }

}
