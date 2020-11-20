import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Board } from './user_boards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User_Board])],
})
export class UserBoardsModule {}