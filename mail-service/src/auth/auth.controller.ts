import { Controller } from '@nestjs/common';
import {EventPattern, Payload} from "@nestjs/microservices";
import {AuthService} from "./auth.service";

export interface ForgotPassBrokeObject {
    email: string;
    password: string;
}

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @EventPattern('forgot-password')
    handleForgotPassword(@Payload() messageReceived: ForgotPassBrokeObject) {
        console.log('📥 Received on queue : --[ forgot-password ]--');
        this.authService.sendForgotPassword(messageReceived)
    }
}
