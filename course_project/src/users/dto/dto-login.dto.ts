import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class DtoLoginDto{

    @ApiProperty({example:'user@gmail.com',description:'Mail'})
    @IsNotEmpty({message:"не должна быть пустой"})
    @IsEmail({},{message:"неккоректная почта"})
    readonly email:string;

    @ApiProperty({example:'12345678',description:'Password'})
    @IsNotEmpty({message:"не должен быть пустым"})
    @IsString({message:"need string"})
    @Length(6,16,{message:"6-16 символов"})
    readonly password:string;


}