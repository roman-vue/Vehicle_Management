import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
  CanActivate,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('token undefined');
    }
    if (typeof token === 'undefined' || token === null)
      throw new ForbiddenException('token undefined');
    request.user = <jwt.JwtPayload>await this.jwtService.verifyToken(token);
    if (request.user) {
      return true;
    }
  }
}
