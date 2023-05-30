import {ApiProperty} from "@nestjs/swagger";


export class CreateRoleDto{
    @ApiProperty({example:'ADMIN',description:'Role unique value '})
    readonly value:string;
    @ApiProperty({example:'Administrator',description:'Description role'})
    readonly description:string;

}