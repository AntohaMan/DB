import {ApiProperty} from "@nestjs/swagger";

export class CreateOrdersDto {
    @ApiProperty({example:'1',description:'Unique identificator'})
    readonly servicesId:number;

    @ApiProperty({example:'1',description:'Unique identificator'})
    readonly staffId:number;


    /*@ApiProperty({example:'2023-01-12',description:'order date'})

    readonly date:Date;*/

    @ApiProperty({example:'г. Минск ул. Сурганова, 56',description:'client address'})

    readonly address:string;

    @ApiProperty({example:'2023-01-03 12:00',description:'services date of completion'})

    readonly dateOfCompletion:Date;

    @ApiProperty({example:'1 hour',description:'services lead time'})

    readonly leadTime:string;

    @ApiProperty({example:'20',description:'services coast'})

    readonly coast:number;


}