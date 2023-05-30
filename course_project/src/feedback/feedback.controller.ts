import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../common/guards/accessToken.guard";
import {FeedbackService} from "./feedback.service";
import {Staff} from "../staff/staff.model";

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService:FeedbackService) {
    }

    @Post()
    @UseGuards(AccessTokenGuard)
    feedback(@Req() req:any,@Body() data:any){
        return this.feedbackService.createFeedback(req.user.id,data)
    }

    @Get(":id")
    getAllById(@Param('id')id:number){
        return this.feedbackService.getAllById(id)
    }



}
