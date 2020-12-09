import { Controller, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { BoardMemberGuard } from 'src/guards/board-member.guard';
import { HasType } from 'src/guards/has-type.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
    constructor(
        private cardsService: CardsService
    ) {}

    /*
    {
        "list_id": "list id"
        "card_name": "card name",
    }
    */
    @HasType("card")
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Post('add')
    async create(@Request() req) {
        return await this.cardsService.create(req.body);
    }

    /*
    {
        "list_id": "list id"
    }
    */
    @HasType("card")
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Post('get')
    async getCards(@Request() req) {
        return await this.cardsService.getCards(req.body.list_id);
    }
}
