import {Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Staff} from "../staff/staff.model";


@Entity("feedback")
export class Feedback {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'Very good man',description:'user feedback'})
    @Column({nullable:false})
    feedback:string;

    @ApiProperty({example:'Very good man',description:'user feedback'})

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, (user) => user.feedback)
    user: User

    @ManyToOne(() => Staff, (staff) => staff.feedback)
    staff: Staff







}