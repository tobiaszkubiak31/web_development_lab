import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
      ) {}

    async findAll() {
        try {
            return await this.boardRepository.find();
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
}
