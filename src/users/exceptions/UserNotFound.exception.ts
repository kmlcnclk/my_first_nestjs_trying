import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(msg?: string | Record<string, any>, status?: HttpStatus) {
    super(msg || 'User not found', status || HttpStatus.NOT_FOUND);
  }
}
