import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";

export class ChangeDto{

    readonly id:number;

    @ApiProperty({example:'Ivanov Ivan Ivanovich',description:'staff FIO'})

    readonly fio:string;

    @ApiProperty({example:'2001-03-12',description:'staff birthday'})

    readonly birthday:Date;

    @ApiProperty({example:'+375299321112',description:' staff phone number'})

    readonly phone: string;


    @ApiProperty({example:'electrician',description:'staff specialization'})

    readonly specialization: string;

}