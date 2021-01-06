import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddLabelDto } from './labels.dto';
import { Label } from './labels.entity';

@Injectable()
export class LabelsService {
    constructor(
        @InjectRepository(Label)
        private labelRepository: Repository<Label>,
      ) {}
    
      async create(addLabelDto: AddLabelDto): Promise<Label> {
        return await this.labelRepository.save({
          name: addLabelDto.name,
          color: addLabelDto.color,
        });
      }

}
