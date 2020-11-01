import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// temporary User type (in future will be User entity instead of this)
export type User = {
    userId: number,
    username: string,
    password: string
};

@Injectable()
export class UsersService {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async findOne(username: string): Promise<User | undefined> {
        return await this.users.find(user => user.username === username);
    }

    async create(userData: any): Promise<any> {
        const salt = await bcrypt.genSalt(); // it is necessary for generating encrypted password
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const userId = Date.now(); // temporary solution

        this.users.push({
            userId: userId,
            username: userData.username,
            password: hashedPassword
        });

        return true;
    }
}
