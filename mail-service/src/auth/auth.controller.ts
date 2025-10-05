import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ForgotPassBrokeObject } from './entities/auth.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('forgot-password')
  handleForgotPassword(@Payload() messageReceived: ForgotPassBrokeObject) {
    console.log('📥 Received on queue : --[ Forgot-Password ]--');
    this.authService.sendForgotPassword(messageReceived);
  }
}
