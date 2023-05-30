import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length} from "class-validator";

export class ChangeUserDto{
    @ApiProperty({example:'Ivanov Ivan Ivanovich',description:'FIO'})
    @IsNotEmpty()
    @IsString({message:"need string"})
    readonly fio:string;

    @ApiProperty({example:'+375(29)932-11-12',description:'Phone number'})
    @IsNotEmpty()
    @Length(17,17,{message:"need 17 characters for phone"})
    readonly phoneNumber:string;

    @ApiProperty({example:'user@gmail.com',description:'Mail'})
    @IsNotEmpty()
    @IsEmail({},{message:"bad email"})
    readonly email:string;

    @ApiProperty({example:'12345678',description:'Password'})
    @IsNotEmpty()
    @IsString({message:"need string"})
    @Length(6,16,{message:"6 to 16 characters"})
    readonly password:string;
}