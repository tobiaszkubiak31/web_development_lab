import { Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
      "name": "new board name"
    }
  */
  @Patch('update/:id')
  async updateName(@Param('id') id: number, @Request() req): Promise<any> {
    return await this.boardsService.updateName(id, req.body);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<any> {
    return await this.boardsService.delete(id);
  }
}
