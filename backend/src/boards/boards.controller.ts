import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { BoardsService } from './boards.service'

@Controller('boards')
export class BoardsController {

    constructor(private boardsService: BoardsService) {}

    @Get("all")
    getAll() {
        return this.boardsService.findAll();
    }

    @Get("single/:id")
    test(@Req() request: Request) {
        return this.boardsService.findOne(request.params.id);
    }
}
