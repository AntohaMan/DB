import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";

export class CreateStaffDto{

    @ApiProperty({example:'Ivanov Ivan Ivanovich',description:'staff FIO'})
    @Column({nullable:false})
    fio:string;

    @ApiProperty({example:'2001-03-12',description:'staff birthday'})
    @Column({type: 'date',nullable:false})
    birthday:Date;

    @ApiProperty({example:'+375299321112',description:' staff phone number'})
    @Column({unique:true,nullable:false})
    phone: string;

    @ApiProperty({example:'yuiy9',description:'staff photo'})
    @Column({nullable:false})
    photo: string;

    @ApiProperty({example:'electrician',description:'staff specialization'})
    @Column({nullable:false})
    specialization: string;

}