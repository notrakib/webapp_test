import { HttpException, HttpStatus } from '@nestjs/common';

export class AppNotFoundException extends HttpException {
  constructor(message = 'Resource not found') {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message,
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
