import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('user/:id')
  getBoardByUserId(@Param('id') userId: Number, @Req() request: Request) {
    return this.boardsService.findByUserId(Number(request.params.id));
  }

  @Get('single/:id')
  test(@Req() request: Request) {
    return this.boardsService.findOne(request.params.id);
  }
}
