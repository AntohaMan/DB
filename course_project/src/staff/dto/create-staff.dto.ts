import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";
import {IsNotEmpty, IsString, Length} from "class-validator";

export class CreateStaffDto{

    @ApiProperty({example:'Ivanov Ivan Ivanovich',description:'staff FIO'})
    @IsNotEmpty()
    @IsString({message:"need string"})
    readonly fio:string;

    @ApiProperty({example:'2001-03-12',description:'staff birthday'})

    readonly birthday:Date;


    @ApiProperty({example:'+375(29)932-11-12',description:'Staff phone number'})
    @IsNotEmpty()
    @Length(17,17,{message:"need 17 characters for phone"})

    readonly phone: string;


    @ApiProperty({example:'electrician',description:'staff specialization'})

    readonly specialization: string;

}