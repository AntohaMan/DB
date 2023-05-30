import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/users.model";
import {Repository} from "typeorm";
import {Feedback} from "./feedback.model";
import {UsersController} from "../users/users.controller";
import {UsersService} from "../users/users.service";
import {StaffService} from "../staff/staff.service";
import {Staff} from "../staff/staff.model";

@Injectable()
export class FeedbackService {
    constructor( @InjectRepository(Feedback)
                 private feedbackRepository:Repository<Feedback>,
                 private usersService:UsersService,
                 private staffService:StaffService) {
    }

    async createFeedback(userId:number,data:any) {
        const user = await this.usersService.getOne(userId);
        if(!user){throw new UnauthorizedException({message:'incorrect user data'})}
        const staff = await this.staffService.getOne(data.staffId);
        if(!staff){throw new UnauthorizedException({message:'incorrect staff data'})}
        const feedback=await this.feedbackRepository.create({feedback: data.text})
        feedback.user=user;
        feedback.staff=staff;
        await this.feedbackRepository.save(feedback);



    }

    getAllById(id:number){
        return this.feedbackRepository.find({relations:{staff:true,user:true},where:{staff:{id:id}}})
    }



}
