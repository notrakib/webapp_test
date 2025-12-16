import { HttpException, HttpStatus } from '@nestjs/common';

export class AppConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message,
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}
