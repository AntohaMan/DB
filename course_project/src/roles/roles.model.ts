import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";


@Entity("roles")
export class Role {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'ADMIN',description:'Role unique value '})
    @Column({unique:true,nullable:false})
    value:string;

    @ApiProperty({example:'Administrator',description:'Description role'})
    @Column({nullable:false})
    description:string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];


}