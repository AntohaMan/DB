import {Body, Request, Controller, Delete, Get, Param, Post, UseGuards, Put, Req} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {eRole} from "../roles/role.enum";
import {AccessTokenGuard} from "../common/guards/accessToken.guard";
import {ChangeDto} from "../staff/dto/change.dto";
import {ChangeUserDto} from "./dto/change-user.dto";


@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}
    @ApiOperation({summary:'Create user'})
    @ApiResponse({status:200,type:User})
    @Post()
    create(@Body() userDto:CreateUserDto)
    {
        return this.usersService.createUser(userDto);
    }

    @UseGuards(AccessTokenGuard)
    @Put()
    change(@Req() req:any,@Body() dto:ChangeUserDto)
    {

        return this.usersService.changeUser(req.user.id,dto)
    }

    @UseGuards(AccessTokenGuard)
    @Put('feedback')
    feedback(@Req() req:any,@Body() text:string)
    {

        return this.usersService.feedback(req.user.id,text)
    }
   // @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:'Get all users'})
    @ApiResponse({status:200,type:[User]})
    @Roles(eRole.User)
    @UseGuards(AccessTokenGuard)
    @UseGuards(RolesGuard)
    @Get()
    getAll(@Request() req:any)
    {

        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary:'Get one'})
    @ApiResponse({status:200,type:[User]})
    @Get('/req')
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @UseGuards(AccessTokenGuard)
    //@Roles(eRole.User)
    //@UseGuards(RolesGuard)
    getOneUser(@Req() req:any)
    {//console.log(req.user.id)
        return this.usersService.getOne(req.user.id);
    }
    @ApiOperation({summary:'Get one'})
    @ApiResponse({status:200,type:[User]})
    @Roles(eRole.Admin)
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @UseGuards(RolesGuard)
    @Get(':id')
    getOne(@Param('id')id:number)
    {
        return this.usersService.getOne(id);
    }


    @ApiOperation({summary:'Give role'})
    @ApiResponse({status:200})
    @Roles(eRole.Admin)
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role')
    addRole(@Body() dto:AddRoleDto)
    {
        return this.usersService.addRole(dto);
    }

    @Delete(':id')
    delete(@Param('id')id:number){
        return this.usersService.delUser(id);
    }


    @ApiOperation({summary:'Ban user'})
    @ApiResponse({status:200})
    @Roles(eRole.Admin)
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/ban')
    ban(@Body() dto:BanUserDto)
    {
        return this.usersService.ban(dto);
    }
}
