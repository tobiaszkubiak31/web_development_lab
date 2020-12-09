import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { BoardMemberGuard } from 'src/guards/board-member.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
    constructor(
        private listsService: ListsService,
    ) {}

    /*
    {
        "board_id": "board id"
        "list_name": "list name",
    }
    */
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Post('add')
    async create(@Request() req) {
        return await this.listsService.create(req.body);
    }

    /*
    {
        "board_id": "board id"
    }
    */
   @UseGuards(JwtAuthGuard, BoardMemberGuard)
   @Post('get')
   async getLists(@Request() req) {
       return await this.listsService.getLists(req.body.board_id);
   }
}
