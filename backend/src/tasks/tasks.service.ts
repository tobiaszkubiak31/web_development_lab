import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTaskDto } from './tasks.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    async create(addTaskDto: AddTaskDto): Promise<Task> {
        return await this.taskRepository.save({
            title: addTaskDto.title,
            tasklist_id: addTaskDto.tasklist_id
        });
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
