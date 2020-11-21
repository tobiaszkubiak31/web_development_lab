import { Controller, Param, Patch, Request } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  /*
    {
      "name": "new board name"
    }
  */
  @Patch('update/:id')
  async updateName(@Param('id') id: number, @Request() req): Promise<any> {
    return await this.boardsService.updateName(id, req.body);
  }
}
