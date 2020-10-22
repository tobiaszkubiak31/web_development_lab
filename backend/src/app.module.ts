import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/customers.entity';
import { CustomersService } from './customers/customers.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'trello',
      entities: [Customer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, CustomersService],
})
export class AppModule {}
