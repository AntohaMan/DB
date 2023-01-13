import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {User} from "../users/users.model";
import {OrderContent} from "../order-content/order-content.model";


@Entity("orders")
export class Orders {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'2023-01-12',description:'order date'})
    @Column({ type: 'timestamptz',nullable:false })
    date:Date;


    @ManyToOne(() => User, (user) => user.orders)
    user: User

    @OneToMany(() => OrderContent, (order_content) => order_content.orders)
    order_content: OrderContent[]






}