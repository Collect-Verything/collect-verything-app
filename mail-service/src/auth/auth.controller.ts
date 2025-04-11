import { Controller } from '@nestjs/common';
import {EventPattern, Payload} from "@nestjs/microservices";
import {AuthService} from "./auth.service";
import {configEnv} from "../../env-config";

export interface ForgotPassBrokeObject {
    email: string;
    password: string;
}

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @EventPattern(configEnv.FORGOT_PASSWORD_PATTERN)
    handleForgotPassword(@Payload() messageReceived: ForgotPassBrokeObject) {
        console.log('📥 Received on queue : --[ ',configEnv.FORGOT_PASSWORD_PATTERN,' ]--');
        this.authService.sendForgotPassword(messageReceived)
    }
}
