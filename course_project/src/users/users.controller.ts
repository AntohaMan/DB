import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
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

    @ApiOperation({summary:'Get all users'})
    @ApiResponse({status:200,type:[User]})
    @Get()
    getAll()
    {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary:'Get one'})
    @ApiResponse({status:200,type:[User]})
    @Roles(eRole.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    getOne(@Param('id')id:number)
    {
        return this.usersService.getOne(id);
    }

    @ApiOperation({summary:'Give role'})
    @ApiResponse({status:200})
    @Roles(eRole.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role')
    addRole(@Body() dto:AddRoleDto)
    {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary:'Ban user'})
    @ApiResponse({status:200})
    @Roles(eRole.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/ban')
    ban(@Body() dto:BanUserDto)
    {
        return this.usersService.ban(dto);
    }
}
