import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Request() req) {
        return this.authService.register(req.body);
    }

    // If user post login request then UseGuards run LocalStrategy for validate user data
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        // We know that user data is valid, because of UseGuards
        console.log("UseGuards przeszedl")
        return this.authService.login(req.user); // return user token
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) { // get data about logged user
        return req.user;
    }
}
