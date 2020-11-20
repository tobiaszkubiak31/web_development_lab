import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly boardsService: BoardsService,
    ) {}

    @Post('register')
    async register(@Request() req) {
        return this.authService.register(req.body);
    }

    // If user post login request then UseGuards run LocalStrategy for validate user data
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        // We know that user data is valid, because of UseGuards
        return this.authService.login(req.user); // return user token
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) { // get data about logged user
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('userBoards')
    getUserBoards(@Request() req) { // get boards of logged user
        return this.boardsService.getUserBoards(req.user.id);
    }
}
