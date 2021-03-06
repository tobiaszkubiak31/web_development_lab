import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from 'src/boards/boards.module';
import { List } from 'src/lists/lists.entity';
import { Tasklist } from 'src/tasklists/tasklists.entity';
import { CardsController } from './cards.controller';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([Tasklist]),
    forwardRef(() => BoardsModule)
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService]
})
export class CardsModule {}
