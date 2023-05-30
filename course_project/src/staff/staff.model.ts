import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {Orders} from "../orders/orders.model";
import {User} from "../users/users.model";
import {Feedback} from "../feedback/feedback.model";



@Entity("staff")
export class Staff {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'Ivanov Ivan Ivanovich',description:'staff FIO'})
    @Column({nullable:false})
    fio:string;

    @ApiProperty({example:'2001-03-12',description:'staff birthday'})
    @Column({type: 'date',nullable:false,select:false})
    birthday:Date;

    @ApiProperty({example:'+375299321112',description:' staff phone number'})
    @Column({unique:true,nullable:false,select:false})
    phone: string;

    @ApiProperty({example:'yuiy9',description:'staff photo'})
    @Column({nullable:true})
    photo: string;

    @ApiProperty({example:'electrician',description:'staff specialization'})
    @Column({nullable:false})
    specialization: string;



    @OneToMany(() => Orders, (orders) => orders.staff)
    orders: Orders[]

    @OneToMany(() => Feedback, (feedback) => feedback.staff)
    feedback: Feedback[]





}