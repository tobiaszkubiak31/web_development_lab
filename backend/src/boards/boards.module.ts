import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './boards.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userboard } from 'src/userboards/userboards.entity';
import { UserboardsModule } from 'src/userboards/userboards.module';
import { UsersModule } from 'src/users/users.module';
import { List } from 'src/lists/lists.entity';
import { ListsModule } from 'src/lists/lists.module';
import { CardsModule } from 'src/cards/cards.module';
import { TasklistsModule } from 'src/tasklists/tasklists.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([Userboard]),
    TypeOrmModule.forFeature([List]),
    UserboardsModule,
    UsersModule,
    ListsModule,
    CardsModule,
    TasklistsModule,
    TasksModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService]
})
export class BoardsModule {}
