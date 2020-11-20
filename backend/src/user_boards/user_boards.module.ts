import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Board } from './user_boards.entity';
import { User_BoardsService } from './user_boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([User_Board])],
  providers: [User_BoardsService],
  exports: [User_BoardsService],
})
export class User_BoardsModule {}