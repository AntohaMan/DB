import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {Orders} from "../orders/orders.model";
import {OrderContent} from "../order-content/order-content.model";


@Entity("staff")
export class Staff {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

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


    @OneToMany(() => OrderContent, (order_content) => order_content.staff)
    order_content: OrderContent[]




}