import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { Userboard } from './userboards/userboards.entity';
import { UserboardsModule } from './userboards/userboards.module';
import { Board } from './boards/boards.entity';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { List } from './lists/lists.entity';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/cards.entity';
import { LabelsModule } from './labels/labels.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'trello',
      entities: [Board, User, Userboard, List, Card],
      synchronize: false
    }),
    AuthModule,
    UsersModule,
    BoardsModule,
    UserboardsModule,
    ListsModule,
    CardsModule,
    LabelsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
