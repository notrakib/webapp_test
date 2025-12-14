import { HttpException, HttpStatus } from '@nestjs/common';

export class AppUnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message,
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
