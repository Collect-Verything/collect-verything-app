import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(@Body() registerForm: CreateUserDto) {
    return this.authService.register(registerForm);
  }

  @Post('validate-token')
  async validateToken(@Req() req: Request, @Res() res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Authorization token is missing');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Bearer token is missing');
      }

      const decoded = this.jwtService.verify(token);
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      res.status(HttpStatus.OK).send({ message: 'Token is valid' });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send({ error: error.message });
    }
  }
}
