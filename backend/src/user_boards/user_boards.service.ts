import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User_Board } from './user_boards.entity';

@Injectable()
export class User_BoardsService {
  constructor(
    @InjectRepository(User_Board)
    private userBoardsRepository: Repository<User_Board>,
  ) {}

  async getUserBoards(id: number): Promise<User_Board[]> {
    return await getRepository(User_Board)
      .createQueryBuilder("user_board")
      .where("user_board.userId = :userId", { userId: id })
      .getMany();
  }
}