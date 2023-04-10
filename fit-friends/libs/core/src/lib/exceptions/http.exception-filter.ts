import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const body = request.body;

    console.log(exception);

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        date: new Date().toISOString(),
        resource: request.url,
        sourceData: body
      });
  }
}
