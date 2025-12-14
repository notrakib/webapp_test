import { HttpException, HttpStatus } from '@nestjs/common';

export class AppBadRequestException extends HttpException {
  constructor(message = 'Bad request') {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
