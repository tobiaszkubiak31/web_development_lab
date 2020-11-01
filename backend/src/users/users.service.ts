import { Injectable } from '@nestjs/common';

// temporary User type (in future will be User entity instead of this)
export type User = {
    userId: number,
    username: string,
    password: string
};

@Injectable()
export class UsersService {}
