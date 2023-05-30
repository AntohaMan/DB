import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {User} from "../users/users.model";
import {Services} from "../services/services.model";
import {Staff} from "../staff/staff.model";


@Entity("orders")
export class Orders {
    @ApiProperty({example:'1',description:'Unique identificator'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'2023-01-12',description:'order date'})
    @Column({ type: 'timestamp',nullable:true })
    date:Date;

    @ApiProperty({example:'st. Yakub Kolas d.12',description:'client address'})
    @Column({nullable:false})
    address:string;

    @ApiProperty({example:'+2023-01-03 12:00',description:'services date of completion'})
    @Column({type: 'timestamp',nullable:false})
    dateOfCompletion:Date;

    @ApiProperty({example:'+375299321112',description:'services lead time'})
    @Column({nullable:true})
    leadTime:string;

    @ApiProperty({example:'20',description:'services coast'})
    @Column({nullable:true})
    coast:number;

    @ManyToOne(() => Services, (services) => services.orders)
    services: Services

    @ManyToOne(() => Staff, (staff) => staff.orders)
    staff: Staff

    @ManyToOne(() => User, (user) => user.orders)
    user: User








}