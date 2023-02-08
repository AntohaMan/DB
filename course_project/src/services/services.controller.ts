
import {ChangeDto} from "./dto/change.dto";
import {ServicesService} from "./services.service";
import {CreateServicesDto} from "./dto/create-services.dto";
import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

@Controller('services')
export class ServicesController {
    constructor(private servicesService:ServicesService) {
    }
    //@Roles(eRole.Admin)
    // @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() dto:CreateServicesDto){
        return this.servicesService.createServices(dto);
    }


    @Get(':id')
    getOne(@Param('id')id:number)
    {
        return this.servicesService.getOne(id);
    }
    @Get('take/:name')
    getSpec(@Param('name')name:string)
    {
        return this.servicesService.getSpec(name);
    }
    @Get()
    getAll(){
        return this.servicesService.getAll();
    }

    //@UseGuards(JwtAuthGuard)

    @Put()
    change(@Body() dto:ChangeDto)
    {

        return this.servicesService.changeServices(dto)
    }
    @Delete(':id')
    delete(@Param('id')id:number){
        return this.servicesService.deleteServices(id)
    }

}









