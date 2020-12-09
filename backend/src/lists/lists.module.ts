import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/boards.entity';
import { BoardsModule } from 'src/boards/boards.module';
import { ListsController } from './lists.controller';
import { List } from './lists.entity';
import { ListsService } from './lists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    TypeOrmModule.forFeature([Board]),
    forwardRef(() => BoardsModule)
  ],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService]
})
export class ListsModule {}
