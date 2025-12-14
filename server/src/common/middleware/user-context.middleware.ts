import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppUnauthorizedException } from '../exceptions/unauthorized.exception';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.verify(token);
        req['user'] = payload;
      } catch(w) {
        throw new AppUnauthorizedException('Invalid token')
      }
    }
    else {
      throw new AppUnauthorizedException('Invalid token')
    }
    next();
  }
}
