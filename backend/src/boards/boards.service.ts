import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListsService } from 'src/lists/lists.service';
import { Userboard } from 'src/userboards/userboards.entity';
import { UserboardsService } from 'src/userboards/userboards.service';
import { User } from 'src/users/users.entity';
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
    private userboardsService: UserboardsService,
    private listsService: ListsService
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

  async updateName(id: number, board_new_name: string): Promise<boolean> {
    const updated = await this.boardRepository.update(id, { name: board_new_name });
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

  async isMember(user_id: number, board_id: number): Promise<boolean> {
    const userboard = await this.getUserboardByUserIdAndBoardId(user_id, board_id);
    if (userboard) {
      return true;
    }
    return false;
  }

  async isMemberByListId(user_id: number, list_id: number): Promise<boolean> {
    const list = await this.listsService.findOne(list_id);
    if (list) {
      return await this.isMember(user_id, (await list.board).id);
    }
    return false;
  }

  async getUserboardByUserIdAndBoardId(user_id: number, board_id: number): Promise<Userboard> {
    return await getRepository(Userboard)
      .createQueryBuilder('userboard')
      .where('userboard.user_id = :user_id', { user_id: user_id })
      .andWhere('userboard.board_id = :board_id', { board_id: board_id })
      .getOne();
  }

  async isOwner(user_id: number, board_id: number): Promise<boolean> {
    const userboard = await this.getUserboardByUserIdAndBoardId(user_id, board_id);
    if (userboard) {
      return userboard.user_role === "admin";
    }
    return false;
  }

  async addUser(addUserToBoardDto: AddUserToBoardDto) {
    const user = await this.usersService.findOne(addUserToBoardDto.email);
    if (user && !await this.isMember(user.id, addUserToBoardDto.board_id)) {
      return await this.userboardsService.create({
        "user_id": user.id,
        "board_id": addUserToBoardDto.board_id,
        "user_role": "user"
      });
    }
    return false;
  }

  async getUsers(board_id: number) {
    return await getRepository(User)
      .createQueryBuilder('user')
      .innerJoinAndSelect(Userboard, 'userboard', 'userboard.user_id = user.id')
      .where('userboard.board_id = :board_id', { board_id: board_id })
      .select('user.email')
      .getMany();
  }
}
