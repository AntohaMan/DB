import {ApiProperty} from "@nestjs/swagger";

export class CreateOrdersDto {
    @ApiProperty({example:'1',description:'Unique identificator'})
    readonly servicesId:number;

    @ApiProperty({example:'1',description:'Unique identificator'})
    readonly staffId:number;


    @ApiProperty({example:'2023-01-12',description:'order date'})

    readonly date:Date;

    @ApiProperty({example:'st. Yakub Kolas d.12',description:'client address'})

    readonly address:string;

   // @ApiProperty({example:'2023-01-03 12:00',description:'services date of completion'})

    //readonly date_of_completion:Date;

    @ApiProperty({example:'1 hour',description:'services lead time'})

    readonly lead_time:string;

    @ApiProperty({example:'20',description:'services coast'})

    readonly coast:number;


}