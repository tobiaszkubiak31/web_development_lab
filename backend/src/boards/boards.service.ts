import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userboard } from 'src/userboards/userboards.entity';
import { getRepository, Repository } from 'typeorm';
import { BoardDto } from './boards.dto';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>
  ) {}

  async findByUserId(userId: Number) {
    try {
      // console.log(await this.userRepository.findOne({ "1" }));
      return await this.boardRepository.find({
        relations: ['user'],
        where: { user: { id: userId } },
      });
    } catch (err) {
      return { err };
    }
  }

  findOne(id: string): Promise<Board> {
    return this.boardRepository.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.boardRepository.delete(id);
    return deleted.affected == 1;
  }

  async create(boardDto: BoardDto): Promise<Board> {
    return await this.boardRepository.save(boardDto);
  }

  async updateName(id: number, boardDto: BoardDto): Promise<boolean> {
    const updated = await this.boardRepository.update(id, { name: boardDto.name });
    return updated.affected == 1;
  }

  async getUserBoards(id: number): Promise<Board[]> {
    return await getRepository(Board)
      .createQueryBuilder('board')
      .innerJoinAndSelect(Userboard, 'userboard', 'board.id = userboard.board_id')
      .where('userboard.user_id = :user_id', { user_id: id })
      .select('board.name')
      .getMany();
  }

  async isMember(id: number, name: string): Promise<boolean> {
    const userBoards = await this.getUserBoards(id);
    return userBoards.find(board => board.name === name) !== undefined;
  }

  async isOwner(id: number, name: string) {
     const userboard = await getRepository(Userboard)
      .createQueryBuilder('userboard')
      .innerJoinAndSelect(Board, 'board', 'board.id = userboard.board_id')
      .where('userboard.user_id = :user_id', { user_id: id })
      .andWhere('board.name = :name', { name: name })
      .select('userboard.user_role')
      .getOne();
    return userboard.user_role === "admin";
  }
}
