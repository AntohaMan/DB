import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length} from "class-validator";
import {Column} from "typeorm";


export class CreateServicesDto{
    @IsNotEmpty()
    @ApiProperty({example:'Electrician',description:'Electric installation work'})
    @Column({nullable:false})
    name:string;

    @IsNotEmpty()
    @ApiProperty({example:'15',description:'services price'})
    @Column({nullable:false})
    price:number;

    @IsNotEmpty()
    @ApiProperty({example:'1 hour',description:'lead time'})
    @Column({nullable:false})
    leadTime: string;

    @IsNotEmpty()
    @ApiProperty({example:'installation, dismantling of wiring, switch sockets',description:'services description '})
    @Column({nullable:false})
    description: string;
}