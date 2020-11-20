import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserboardDto } from './userboards.dto';
import { Userboard } from './userboards.entity';

@Injectable()
export class UserboardsService {
  constructor(
    @InjectRepository(Userboard)
    private userBoardsRepository: Repository<Userboard>,
  ) {}

  async getUserBoards(id: number): Promise<Userboard[]> {
    return await getRepository(Userboard)
      .createQueryBuilder("userboard")
      .where("userboard.user_id = :user_id", { user_id: id })
      .getMany();
  }

  async create(userBoardDto: UserboardDto) {
    await this.userBoardsRepository.save(userBoardDto);
  }
}