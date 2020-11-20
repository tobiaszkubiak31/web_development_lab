import { Controller, Post, Request } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('add')
  async create(@Request() req) {
    return await this.boardsService.create(req.body);
  }
}
