import {
    Body,
    Controller,
    Delete, Get, Param,
    Post,
    Put, Query,
    Req,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateStaffDto} from "./dto/create-staff.dto";
import {StaffService} from "./staff.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {eRole} from "../roles/role.enum";
import {ImageDto} from "./dto/image.dto";
import {ChangeDto} from "./dto/change.dto";
import {SearchDto} from "./dto/search.dto";
import {AccessTokenGuard} from "../common/guards/accessToken.guard";

@Controller('staff')
export class StaffController {
    constructor(private staffService:StaffService) {
    }
    //@Roles(eRole.Admin)
    //@UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto:CreateStaffDto){
    return this.staffService.createStaff(dto);
}
   // @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Put('add/image')
    addImage(@Body() dto:ImageDto,@UploadedFile() image:Express.Multer.File)
    {

        return this.staffService.addImage(dto, image)
    }

    //@UseGuards(JwtAuthGuard)

    @Put()
    change(@Body() dto:ChangeDto)
    {

        return this.staffService.changeStaff(dto)
    }
    @Delete(':id')
    delete(@Param('id')id:number){
        return this.staffService.deleteStaff(id)
    }
    @UseGuards(AccessTokenGuard)

    @Get("all")
    getAllStaff(){

        return this.staffService.getAllStaff();
    }

    @Get()
    getAll(@Query() dto:SearchDto){

        return this.staffService.getAll(dto);
    }
    @Get("search/:fio")
    searchStaff(@Param('fio')fio:string){
    console.log(fio)
        return this.staffService.searchStaff(fio);
    }

    @Get(":id")
    getOne(@Param('id')id:number){
       return  this.staffService.getOne(id)
}





}
