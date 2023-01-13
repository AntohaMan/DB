import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";

export class CreateOrderContentDto{

    @ApiProperty({example:'st. Yakub Kolas d.12',description:'client address'})
    @Column({nullable:false})
    address:string;

    @ApiProperty({example:'+2023-01-03 12:00',description:'services date of completion'})
    @Column({type: 'timestamptz',nullable:false})
    date_of_completion:Date;

    @ApiProperty({example:'+375299321112',description:'services lead time'})
    @Column({nullable:false})
    lead_time:number;

}