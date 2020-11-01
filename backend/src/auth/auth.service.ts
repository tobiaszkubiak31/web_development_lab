import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const foundUser = await this.usersService.findOne(username); // Check if user exists
        if (foundUser && bcrypt.compare(password, foundUser.password)) { // comparing password with encrypted password
            const { password, ...result } = foundUser; // this extracted result type which is User type except password
            return result; // {userId, username};
        }

        return null;
    }

    async register(userData: any): Promise<any> {
        return await this.usersService.create(userData);
    }

    async login(user: any): Promise<any> {
        const payload = { username: user.username, sub: user.userId };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
