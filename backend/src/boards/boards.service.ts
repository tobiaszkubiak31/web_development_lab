import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userboard } from 'src/userboards/userboards.entity';
import { UserboardsService } from 'src/userboards/userboards.service';
import { UsersService } from 'src/users/users.service';
import { getRepository, Repository } from 'typeorm';
import { AddUserToBoardDto, BoardDto } from './boards.dto';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private usersService: UsersService,
    private userboardsService: UserboardsService
  ) {}

  async findByUserId(userId: number) {
    try {
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
    return deleted.affected === 1;
  }

  async create(boardDto: BoardDto): Promise<Board> {
    return await this.boardRepository.save(boardDto);
  }

  async updateName(id: number, boardDto: BoardDto): Promise<boolean> {
    const updated = await this.boardRepository.update(id, { name: boardDto.name });
    return updated.affected === 1;
  }

  async getUserBoards(id: number): Promise<Board[]> {
    return await getRepository(Board)
      .createQueryBuilder('board')
      .innerJoinAndSelect(Userboard, 'userboard', 'board.id = userboard.board_id')
      .where('userboard.user_id = :user_id', { user_id: id })
      .select('board.name')
      .getMany();
  }

  async getUserBoardsWithIds(id: number): Promise<Board[]> {
    return await getRepository(Board)
      .createQueryBuilder('board')
      .innerJoinAndSelect(Userboard, 'userboard', 'board.id = userboard.board_id')
      .where('userboard.user_id = :user_id', { user_id: id })
      .select(['board.id', 'board.name'])
      .getMany();
  }

  async isMember(id: number, name: string): Promise<boolean> {
    const userBoards = await this.getUserBoards(id);
    return userBoards.find(board => board.name === name) !== undefined;
  }

  async getUserboardByUserIdAndBoardName(id: number, name: string): Promise<Userboard> {
    return await getRepository(Userboard)
      .createQueryBuilder('userboard')
      .innerJoinAndSelect(Board, 'board', 'userboard.board_id = board.id')
      .where('board.name = :name', { name: name })
      .andWhere('userboard.user_id = :user_id', { user_id: id })
      .getOne();
  }

  async isOwner(id: number, name: string): Promise<boolean> {
    const userboard = await this.getUserboardByUserIdAndBoardName(id, name);
    if (userboard) {
      return userboard.user_role === "admin";
    }
    return false;
  }

  async addUser(addUserToBoardDto: AddUserToBoardDto, id: number) {
    const user = await this.usersService.findOne(addUserToBoardDto.email);
    if (user && !await this.isMember(user.id, addUserToBoardDto.name)) {
      const userBoards = await this.getUserBoardsWithIds(id);
      if (userBoards) {
        const userBoard = await userBoards.find(board => board.name === addUserToBoardDto.name);
        if (userBoard) {
          return await this.userboardsService.create({
            "user_id": user.id,
            "board_id": userBoard.id,
            "user_role": "user"
          });
        }
      }
    }
    return false;
  }
}
