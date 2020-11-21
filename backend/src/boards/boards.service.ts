import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { BoardDto } from './boards.dto';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
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

  async remove(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }

  async create(boardDto: BoardDto): Promise<Board> {
    return await this.boardRepository.save(boardDto);
  }

  async updateName(id: number, boardDto: BoardDto): Promise<boolean> {
    const updated = await this.boardRepository.update(id, { name: boardDto.name });
    return updated.affected == 1;
  }
}
