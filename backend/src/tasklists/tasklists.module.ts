import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from 'src/boards/boards.module';
import { Task } from 'src/tasks/tasks.entity';
import { TasklistsController } from './tasklists.controller';
import { Tasklist } from './tasklists.entity';
import { TasklistsService } from './tasklists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasklist]),
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => BoardsModule)
  ],
  controllers: [TasklistsController],
  providers: [TasklistsService],
  exports: [TasklistsService]
})
export class TasklistsModule {}
