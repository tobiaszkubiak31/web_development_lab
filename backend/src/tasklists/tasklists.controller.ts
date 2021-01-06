import { Controller, Post, UseGuards, Request, Delete } from '@nestjs/common';
import { BoardMemberGuard } from 'src/guards/board-member.guard';
import { HasType } from 'src/guards/has-type.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TasklistsService } from './tasklists.service';

@Controller('tasklists')
export class TasklistsController {
    constructor(
        private tasklistsService: TasklistsService
    ) {}

    /*
    {
        "list_id": "list id"
        "card_name": "card name",
    }
    */
    @HasType('tasklist')
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Post('add')
    async create(@Request() req) {
        return await this.tasklistsService.create(req.body);
    }

    /*
    {
        "tasklist_id": "tasklist id"
    }
    */
   @HasType('tasklist-update')
   @UseGuards(JwtAuthGuard, BoardMemberGuard)
   @Delete()
   async delete(@Request() req) {
       return await this.tasklistsService.delete(req.body.tasklist_id);
   }
}
