import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity'
import { UserDto } from "./user.dto"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async findAll() {
        try {
            return await this.usersRepository.find();
        } catch (err) {
            return { err };
        }
    }
    
    async findOne(email: string): Promise<Users | undefined> {
        return await this.usersRepository.findOne({ email });
    }

    async create(userDto: UserDto): Promise<any> {
        try {
            if (await this.findOne(userDto.email) === undefined) {
                this.usersRepository.save(userDto);
                return true;
            }
        } catch (err) {
            console.log(err);
        }
        return false;
    }
}
