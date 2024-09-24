import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '../../auth.module';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtSuperStrategy extends PassportStrategy(Strategy, 'super') {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: { userId: number }) {
        const user = await this.usersService.findOne(payload.userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const hasSuperAdminRole = user.roles.some(role => role.name === 'SUPER_ADMIN');


        if (!hasSuperAdminRole) {
            throw new UnauthorizedException('You do not have the required SUPER_ADMIN role');
        }

        return user;
    }
}