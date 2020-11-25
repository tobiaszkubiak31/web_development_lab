import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { // connect nestjs with passport-local
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }



    async validate(email: string, password: string): Promise<any> {
        const user = this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}