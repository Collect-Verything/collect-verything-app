import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  newPassword: string;
}
