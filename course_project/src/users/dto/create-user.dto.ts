import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateUserDto{
   @ApiProperty({example:'Ivanov Ivan Ivanovich',description:'FIO'})
   @IsNotEmpty({message:"ФИО не должно быть пустым"})
   @IsString({message:"need string"})
   readonly fio:string;

   @ApiProperty({example:'+375(29)932-11-12',description:'Phone number'})
   @IsNotEmpty({message:"не должно быть пустым"})
   @Length(17,17,{message:`необходимо 17 символов для телефона`})
   readonly phoneNumber:string;

   @ApiProperty({example:'user@gmail.com',description:'Mail'})
   @IsNotEmpty({message:"не должно быть пустым"})
   @IsEmail({},{message:"неккоректная почта"})
   readonly email:string;

   @ApiProperty({example:'12345678',description:'Password'})
   @IsNotEmpty({message:"не должно быть пустым"})
   @IsString({message:"need string"})
   @Length(6,16,{message:"пароль 6-16 символов"})
   readonly password:string;
}