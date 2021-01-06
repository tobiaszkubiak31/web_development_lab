import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';
import { getRepository, Repository } from 'typeorm';
import { AddTasklistDto } from './tasklists.dto';
import { Tasklist } from './tasklists.entity';

@Injectable()
export class TasklistsService {
    constructor(
        @InjectRepository(Tasklist)
        private tasklistRepository: Repository<Tasklist>,
    ) {}

    async create(addTasklistDto: AddTasklistDto): Promise<Tasklist> {
        return await this.tasklistRepository.save({
            title: addTasklistDto.title,
            card_id: addTasklistDto.card_id
        });
    }

    async getTasklists(card_id: number) {
        return await getRepository(Tasklist)
          .createQueryBuilder('tasklist')
          .where('tasklist.card_id = :card_id', { card_id: card_id })
          .select(['tasklist.id', 'tasklist.title', 'tasklist.tasks'])
          .getMany();
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.tasklistRepository.delete(id);
        return deleted.affected === 1;
    }
}
