import { Controller } from '@nestjs/common';
import {EventPattern, Payload} from "@nestjs/microservices";
import {AuthService} from "./auth.service";

interface PatternBroker{
    pattern:string
        data:string
}

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @EventPattern('forgot-password')
    handleForgotPassword(@Payload() message: PatternBroker) {
        console.log('📥 Received on queue : --[ ', message.pattern, ' ]--');
        this.authService.sendMailWhenPasswordIsForget("collectverythings@gmail.com",message.data)
    }
}
