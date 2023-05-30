import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";

export class ChangeOrderDto{

    readonly id:number
    @ApiProperty({example:'st. Yakub Kolas d.12',description:'client address'})

    readonly address:string;

    @ApiProperty({example:'2023-01-03 12:00',description:'services date of completion'})

    readonly date_of_completion:Date;

    @ApiProperty({example:'+375299321112',description:'services lead time'})

    readonly lead_time:string;

    @ApiProperty({example:'20',description:'services coast'})

   readonly coast:number;
}