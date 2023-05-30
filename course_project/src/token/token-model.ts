import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {Orders} from "../orders/orders.model";
import {User} from "../users/users.model";


@Entity("tokens")
export class Token {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'+375299321112',description:'Phone number'})
    @Column({nullable:true})
    refreshToken:string;

    @OneToOne(() => User, (user) => user.token)
    @JoinColumn()
    user: User




}