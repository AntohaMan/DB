import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {Orders} from "../orders/orders.model";
import {Token} from "../token/token-model";
import {Staff} from "../staff/staff.model";
import {Feedback} from "../feedback/feedback.model";


@Entity("users")
export class User {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'Ivanov Ivan Ivanovich',description:'FIO'})
    @Column({nullable:false})
    fio:string;

    @ApiProperty({example:'+375299321112',description:'Phone number'})
    @Column({unique:true,nullable:false})
    phoneNumber:string;

    @ApiProperty({example:'user@gmail.com',description:'Mail'})
    @Column({unique:true,nullable:false})
    email: string;

    @ApiProperty({example:'12345678',description:'Password'})
    @Column({nullable:false})
    password: string;

    @ApiProperty({example:'true',description:'Banned or not'})
    @Column({default:false })
    banned: boolean;

    @ApiProperty({example:'For violating community rules',description:'Ban reason'})
    @Column({ nullable:true })
    banReason: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[]

    @OneToMany(() => Orders, (orders) => orders.user)
    orders: Orders[]

    @OneToMany(() => Feedback, (feedback) => feedback.user)
    feedback: Feedback[]

    @OneToOne(() => Token, (token) => token.user)

    token: Token




}