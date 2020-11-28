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
    if (!await this.boardsService.isMember(req.user.id, req.body.name)) {
      const board = await this.boardsService.create({ name: req.body.name });
      return await this.userboardsService.create({
        user_id: req.user.id,
        board_id: board.id,
        user_role: "admin"
      });
    }
    return false;
 }

  /*
    {
      "name": "old board name",
      "new_name": "new board name"
    }
  */
  @UseGuards(JwtAuthGuard, BoardOwnerGuard)
  @Patch()
  async updateName(@Request() req): Promise<any> {
    const userboardWithModifiedName = await this.boardsService.getUserboardByUserIdAndBoardName(req.user.id, req.body.new_name);
    if (!userboardWithModifiedName) { // new board name should be unique for owner
      const userboard = await this.boardsService.getUserboardByUserIdAndBoardName(req.user.id, req.body.name);
      if (userboard) {
        return await this.boardsService.updateName(userboard.board_id, { "name": req.body.new_name });
      }
    }
    return false;
  }

  @UseGuards(JwtAuthGuard, BoardOwnerGuard)
  @Delete()
  async remove(@Request() req): Promise<any> {
    const userboard = await this.boardsService.getUserboardByUserIdAndBoardName(req.user.id, req.body.name);
    if (userboard) {
      return await this.boardsService.delete(userboard.board_id);
    }
    return false;
  }

  /*
  {
    "email": "user_emal",
    "name": "board_name"
  }
  */
  @UseGuards(JwtAuthGuard, BoardOwnerGuard)
  @Post('addUser')
  async addUser(@Request() req) {
    return await this.boardsService.addUser(req.body, req.user.id);
  }
}
