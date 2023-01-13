import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {Orders} from "../orders/orders.model";
import {User} from "../users/users.model";
import {Services} from "../services/services.model";
import {Staff} from "../staff/staff.model";


@Entity("order-content")
export class OrderContent {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Orders, (orders) => orders.order_content)
    orders: Orders[]

    @ManyToOne(() => Services, (services) => services.order_content)
    services: Services[]

    @ManyToOne(() => Staff, (staff) => staff.order_content)
    staff: Staff[]


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