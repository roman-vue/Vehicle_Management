import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/users.dto';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async signIn(authDto: AuthDto) {
    const verifyEmail = await this.usersService.getOneByEmail(authDto.email);
    const compare = await bcrypt.compare(
      authDto.password,
      verifyEmail.password,
    );
    if (!compare) {
      throw new UnauthorizedException(`contraseña incorrecta`);
    }
    let sign = {
      id: verifyEmail.id,
    };
    const tokens = this.jwtService.generateToken(sign);
    return tokens;
  }

  public async signUp(createUserDto: CreateUserDto) {
    const createUser = await this.usersService.created(createUserDto);
    return createUser;
  }
}
