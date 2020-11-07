import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const foundUser = await this.usersService.findOne(email); // Check if user exists
        console.log("foundUser: " + foundUser)
        if (foundUser) //&& await bcrypt.compare(password, foundUser.password)) { // comparing password with encrypted password
        {    
            console.log("IF przeszedl")
            const { password, ...result } = foundUser; // this extracted result type which is User type except password
            return result; // {userId, username};
        }

        return null;
    }

    async register(userDto: UserDto): Promise<any> {
        return await this.usersService.create(userDto);
    }

    async login(user: any): Promise<any> {
        const payload = { username: user.username, sub: user.userId };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
