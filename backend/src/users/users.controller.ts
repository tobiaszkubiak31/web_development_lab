import { Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('users')
export class UsersController {
  @Get()
  getHello(): string {
    return 'First user';
  }
}
