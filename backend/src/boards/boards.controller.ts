import { Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BoardMemberGuard } from 'src/guards/board-member.guard';
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
    const board = await this.boardsService.create({ name: req.body.name });
    return await this.userboardsService.create({
      user_id: req.user.id,
      board_id: board.id,
      user_role: "admin"
    });
  }

  /*
    {
      "board_id": "board id",
      "board_new_name": "new board name"
    }
  */
  @UseGuards(JwtAuthGuard, BoardOwnerGuard)
  @Patch()
  async updateName(@Request() req): Promise<any> {
    const userboard = await this.boardsService.getUserboardByUserIdAndBoardId(req.user.id, req.body.board_id);
    if (userboard) {
      return await this.boardsService.updateName(userboard.board_id, { "name": req.body.board_new_name });
    }
    return false;
  }

  /*
  {
    "board_id": "board id"
  }
  */
  @UseGuards(JwtAuthGuard, BoardOwnerGuard)
  @Post("delete")
  async remove(@Request() req): Promise<any> {
    const userboard = await this.boardsService.getUserboardByUserIdAndBoardId(req.user.id, req.body.board_id);
    if (userboard) {
      return await this.boardsService.delete(userboard.board_id);
    }
    return false;
  }

  /*
  {
    "board_id": "board id",
    "email": "user_emal"
  }
  */
  @UseGuards(JwtAuthGuard, BoardOwnerGuard)
  @Post('addUser')
  async addUser(@Request() req) {
    return await this.boardsService.addUser(req.body);
  }

  /*
  {
    "board_id": "board id"
  }
  */
  @UseGuards(JwtAuthGuard, BoardMemberGuard)
  @Post('getUsers')
  async getUsers(@Request() req) {
    return await this.boardsService.getUsers(req.body.board_id);
  }
}
