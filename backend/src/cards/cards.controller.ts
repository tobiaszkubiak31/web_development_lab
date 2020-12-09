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
    @HasType('card')
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
    @HasType('card')
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Post('get')
    async getCards(@Request() req) {
        return await this.cardsService.getCards(req.body.list_id);
    }

    /*
    {
        "card_id": "card id",
        "card_new_name": "card new name"
    }
    */
    @HasType('card-update')
    @UseGuards(JwtAuthGuard, BoardMemberGuard)
    @Patch()
    async updateName(@Request() req): Promise<any> {
        return await this.cardsService.updateName(req.body.card_id, req.body.card_new_name);
    }

    /*
    {
        "card_id": "card id",
        "time_limit": "time limit"
    }
    */
   @HasType('card-update')
   @UseGuards(JwtAuthGuard, BoardMemberGuard)
   @Patch('updateTimeLimit')
   async updateTimeLimit(@Request() req): Promise<any> {
       return await this.cardsService.updateTimeLimit(req.body.card_id, req.body.time_limit);
   }
}
