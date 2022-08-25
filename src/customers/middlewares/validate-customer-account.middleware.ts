import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { valid_account } = await req.headers;

    if (valid_account) next();
    else
      return res.status(HttpStatus.UNAUTHORIZED).json({
        error: 'Account is invalid',
      });
  }
}
