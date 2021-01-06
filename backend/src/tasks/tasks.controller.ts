import { Controller, Post, UseGuards, Request, Delete, Patch } from '@nestjs/common';
import { BoardMemberGuard } from 'src/guards/board-member.guard';
import { HasType } from 'src/guards/has-type.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {}

    /*
    {
        "tasklist_id": "tasklist id"
        "title": "title",
    }
    */
    @HasType('task')
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Post('add')
    async create(@Request() req) {
        return await this.tasksService.create(req.body);
    }

    /*
    {
        "task_id": "task id"
    }
    */
    @HasType('task-update')
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Delete()
    async delete(@Request() req) {
        return await this.tasksService.delete(req.body.task_id);
    }

    /*
    {
        "task_id": "task id",
        "done": true
    }
    */
    @HasType('task-update')
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Patch('updateDone')
    async updateTimeLimit(@Request() req): Promise<any> {
        return await this.tasksService.updateDone(req.body.task_id, req.body.done);
    }
}
