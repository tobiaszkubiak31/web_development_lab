import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/boards.entity';
import { User } from 'src/users/users.entity';
import { Userboard } from './userboards.entity';
import { UserboardsService } from './userboards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userboard]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Board]),
  ],
  providers: [UserboardsService],
  exports: [UserboardsService],
})
export class UserboardsModule {}