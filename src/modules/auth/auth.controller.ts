import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags(`AUTH`)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  public async signIn(@Body() authDto: AuthDto) {
    const data = await this.authService;
    return data;
  }

  @Post('sign-up')
  public async signUp(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService;
    return data;
  }
}
