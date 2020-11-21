import { Controller, Post, Request } from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { UserboardsService } from './userboards.service';

@Controller('userboards')
export class UserboardsController {
  constructor(
      private userboardsService: UserboardsService,
      private boardsService: BoardsService
  ) {}

  @Post('add')
  async create(@Request() req) {
    const board = await this.boardsService.create({ name: req.body.name });
    return await this.userboardsService.create({
        user_id: req.body.user_id,
        board_id: board.id,
        user_role: "admin"
    });
  }
}