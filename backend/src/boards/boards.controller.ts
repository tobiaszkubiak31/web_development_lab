import { Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BoardOwnerGuard } from 'src/guards/board-owner.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserboardsService } from 'src/userboards/userboards.service';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(
    private boardsService: BoardsService,
    private userboardsService: UserboardsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get')
  getUserBoards(@Request() req) { // get boards of logged user
      return this.boardsService.getUserBoards(req.user.id);
  }

  /*
    {
      "name": "board name"
    }
  */
 @UseGuards(JwtAuthGuard)
 @Post('add')
 async create(@Request() req) {
   // create only when user doesn't created board with this same name
    if (!this.boardsService.isMember(req.user.id, req.body.name)) {
      const board = await this.boardsService.create({ name: req.body.name });
      return await this.userboardsService.create({
        user_id: req.user.id,
        board_id: board.id,
        user_role: "admin"
      });
    }
    return null;
 }

  /*
    {
      "name": "new board name"
    }
  */
  @UseGuards(JwtAuthGuard, BoardOwnerGuard)
  @Patch()
  async updateName(@Request() req): Promise<any> {
    return await this.boardsService.updateName(req.user.id, req.body);
  }

  @UseGuards(JwtAuthGuard, BoardOwnerGuard)
  @Delete()
  async remove(@Param('id') id: number): Promise<any> {
    return await this.boardsService.delete(id);
  }
}
