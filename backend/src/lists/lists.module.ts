import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/boards.entity';
import { ListsController } from './lists.controller';
import { List } from './lists.entity';
import { ListsService } from './lists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([Board]),
  ],
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule {}
