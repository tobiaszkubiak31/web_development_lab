import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
    
    async findOne(email: string): Promise<Users> {
        console.log("Find one " + email)
        return await this.usersRepository.findOne(email);
    }

    async create(userDto: UserDto): Promise<any> {
        try {
            this.usersRepository.save(userDto);
            console.log("dziala!")
            return true;
        } catch (err) {
            console.log("debile nie umiecie")
            return { err };
        }
    }
    

    // async create(userData: any): Promise<any> {
    //     const salt = await bcrypt.genSalt(10); // it is necessary for generating encrypted password
    //     const hashedPassword = await bcrypt.hash(userData.password, salt);
    //     const userId = Date.now(); // temporary solution

    //     this.users.push({
    //         userId: userId,
    //         username: userData.username,
    //         password: hashedPassword
    //     });

    //     return true;
    // }
}
