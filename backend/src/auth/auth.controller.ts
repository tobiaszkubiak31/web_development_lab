import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // If user post login request then UseGuards run LocalStrategy for validate user data
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        // We know that user data is valid, because of UseGuards
        return this.authService.login(req.user); // return user token
    }
}
