import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    name: string;
}
