import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class DtoLoginDto{

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