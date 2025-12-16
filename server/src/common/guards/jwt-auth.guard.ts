import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { Request } from 'express';
import { AppForbiddenException } from '../exceptions/forbidden.exception';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('MYSQL_POOL') private pool: Pool,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
  
    try {
      let payload: any = request['user']; 
      if (!payload) {
        throw new AppForbiddenException('You do not have permission');
      }

      const [rows] = await this.pool.query<RowDataPacket[]>(
        'SELECT id, username FROM users WHERE id = ? LIMIT 1',
        [payload.id],
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        throw new AppForbiddenException('You do not have permission');
      }

      return true;
    } catch (err) {
      throw new AppForbiddenException('You do not have permission');
    }
  }
}