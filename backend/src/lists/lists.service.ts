import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { AddListDto } from './lists.dto';
import { List } from './lists.entity';

@Injectable()
export class ListsService {

    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>
    ) {}

    async create(addListDto: AddListDto): Promise<List> {
        return await this.listRepository.save({ name: addListDto.list_name, board_id: addListDto.board_id });
    }

    async getLists(board_id: number) {
        return await getRepository(List)
          .createQueryBuilder('list')
          .where('list.board_id = :board_id', { board_id: board_id })
          .select(['list.id', 'list.name'])
          .getMany();
    }

    async updateName(list_id: number, list_new_name: string): Promise<boolean> {
        const updated = await this.listRepository.update(list_id, { name: list_new_name });
        return updated.affected === 1;
    }
}
