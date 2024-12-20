import { ApiProperty } from '@nestjs/swagger';

export class ForgotEntity {
    @ApiProperty()
    mail: string;
}