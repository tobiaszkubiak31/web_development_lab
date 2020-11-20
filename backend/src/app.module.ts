import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/boards.entity';
import { User } from './users/users.entity';
import { User_Board } from './user_boards/user_boards.entity';
import { UserBoardsModule } from './user_boards/user_boards.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'trello',
      entities: [Board, User, User_Board],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    BoardsModule,
    UserBoardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
