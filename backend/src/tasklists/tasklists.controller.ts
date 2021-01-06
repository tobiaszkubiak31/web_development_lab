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
        "card_id": "card id"
        "title": "list name",
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
        "card_id": "card id"
    }
    */
    @HasType('tasklist')
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Post('get')
    async getTasklists(@Request() req) {
        return await this.tasklistsService.getTasklists(req.body.card_id);
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
