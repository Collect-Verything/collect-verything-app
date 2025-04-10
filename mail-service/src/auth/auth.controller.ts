import { Controller } from '@nestjs/common';
import {EventPattern, Payload} from "@nestjs/microservices";

interface PatternBroker{
    pattern:string
        data:unknown
}

@Controller()
export class AuthController {
    @EventPattern('forgot-password')
    handleForgotPassword(@Payload() data: PatternBroker) {
        console.log('📥 Received on queue : --[ ', data.pattern, ' ]--');
    }
}
