import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ default: 'rcalderin@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ default: 'string' })
  @IsString()
  password: string;
}
