import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from 'src/boards/boards.module';
import { TasklistsController } from './tasklists.controller';
import { Tasklist } from './tasklists.entity';
import { TasklistsService } from './tasklists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasklist]),
    forwardRef(() => BoardsModule)
  ],
  controllers: [TasklistsController],
  providers: [TasklistsService]
})
export class TasklistsModule {}
