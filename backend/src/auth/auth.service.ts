import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const foundUser = await this.usersService.findOne(username); // Check if user exists
        if (foundUser && bcrypt.compare(password, foundUser.password)) { // comparing password with encrypted password
            const { password, ...result } = foundUser; // this extracted result type which is User type except password
            return result; // {userId, username};
        }

        return null;
    }
}
