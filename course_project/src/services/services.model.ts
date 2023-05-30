import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {Orders} from "../orders/orders.model";



@Entity("services")
export class Services {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'Electrician',description:'Electric installation work'})
    @Column({nullable:false})
    name:string;

    @ApiProperty({example:'15',description:'services price'})
    @Column({nullable:false})
    price:number;

    @ApiProperty({example:'1 hour',description:'lead time'})
    @Column({nullable:false})
    leadTime: string;

    @ApiProperty({example:'installation, dismantling of wiring, switch sockets',description:'services description '})
    @Column({nullable:false})
    description: string;


    @OneToMany(() => Orders, (orders) => orders.services)
    orders: Orders[]




}