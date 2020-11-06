import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/customers.entity';
import { CustomersService } from './customers/customers.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/boards.entity'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'trello',
      entities: [Customer, Board],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer]),
    AuthModule,
    UsersModule,
    BoardsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, CustomersService],
})
export class AppModule {}
