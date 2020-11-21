import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserboardDto } from './userboards.dto';
import { Userboard } from './userboards.entity';

@Injectable()
export class UserboardsService {
  constructor(
    @InjectRepository(Userboard)
    private userBoardsRepository: Repository<Userboard>
  ) {}

  async create(userBoardDto: UserboardDto) {
    return await this.userBoardsRepository.save(userBoardDto);
  }
}