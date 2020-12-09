import { Controller, Post, UseGuards, Request, Patch } from '@nestjs/common';
import { BoardMemberGuard } from 'src/guards/board-member.guard';
import { HasType } from 'src/guards/has-type.decorator';
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

    /*
    {
        "list_id": "list id",
        "list_new_name": "list new name"
    }
    */
    @HasType('list-update')
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Patch()
    async updateName(@Request() req): Promise<any> {
        return await this.listsService.updateName(req.body.list_id, req.body.list_new_name);
    }
}
