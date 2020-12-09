import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from 'src/boards/boards.module';
import { List } from 'src/lists/lists.entity';
import { CardsController } from './cards.controller';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([List]),
    BoardsModule
  ],
  controllers: [CardsController],
  providers: [CardsService]
})
export class CardsModule {}
