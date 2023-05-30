import {IsNumber, IsString} from "class-validator";


export class AddRoleDto {
    @IsString({message:"need string"})
    readonly value:string;
    @IsNumber({},{message:"need number"})
    readonly userId:number;

}