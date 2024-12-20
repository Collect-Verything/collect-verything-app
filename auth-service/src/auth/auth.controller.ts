import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {ForgotEntity} from "./entity/forgot.entity";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('forgot-password')
  @ApiOkResponse({ type: ForgotEntity })
  async forgotPassword(@Body() mail:{email:string}) {
    return this.authService.forgotPassword(mail);
  }
}
