import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { AddTaskDto } from './tasks.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    async findOne(id: number): Promise<Task> {
        return await this.taskRepository.findOne(id);
    }

    async create(addTaskDto: AddTaskDto): Promise<Task> {
        return await this.taskRepository.save({
            title: addTaskDto.title,
            tasklist_id: addTaskDto.tasklist_id
        });
    }

    async getTasks(tasklist_id: number) {
        return await getRepository(Task)
          .createQueryBuilder('task')
          .where('task.tasklist_id = :tasklist_id', { tasklist_id: tasklist_id })
          .select(['task.id', 'task.title', 'task.done'])
          .getMany();
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.taskRepository.delete(id);
        return deleted.affected === 1;
    }

    async updateDone(task_id: number, done: boolean): Promise<boolean> {
        const updated = await this.taskRepository.update(task_id, {
            done: done,
        });
        return updated.affected === 1;
    }
}
