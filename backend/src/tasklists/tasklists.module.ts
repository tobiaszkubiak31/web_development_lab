import { Module } from '@nestjs/common';
import { TasklistsController } from './tasklists.controller';
import { TasklistsService } from './tasklists.service';

@Module({
  controllers: [TasklistsController],
  providers: [TasklistsService]
})
export class TasklistsModule {}
