import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private usersRepository: Repository<Customer>,
  ) {}

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (err) {
      return { err };
    }
  }
}
