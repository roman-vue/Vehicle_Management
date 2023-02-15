import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  public async generateToken(object: Object) {
    const generateAccess = await jwt.sign(
      object,
      this.configService.get<string>('JWT_ACCESS'),
      { expiresIn: '7h' },
    );

    const generateRefresh = await jwt.sign(
      object,
      this.configService.get<string>('JWT_REFRESH'),
      { expiresIn: '9h' },
    );
    return { accessToken: generateAccess, refreshToken: generateRefresh };
  }

  public async verifyToken(token: string) {
    const verify = await jwt.verify(
      token,
      this.configService.get<string>('JWT_ACCESS'),
    );
    return verify;
  }
}
