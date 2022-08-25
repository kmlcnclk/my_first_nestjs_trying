import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface IExceptionResponse {
  message?: string;
  statusCode?: number;
  error?: string;
}

type ExceptionResponseType = string | IExceptionResponse;

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const exceptionResponse: ExceptionResponseType = exception.getResponse();
    console.log(exceptionResponse);

    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    if (typeof exceptionResponse === 'object')
      response.status(exceptionResponse.statusCode).json({
        status: exceptionResponse.statusCode,
        message: exceptionResponse.message,
        error: exceptionResponse.error,
      });
    else
      response.status(exception.getStatus()).json({
        status: exception.getStatus(),
        message: exception.getResponse(),
      });
  }
}
