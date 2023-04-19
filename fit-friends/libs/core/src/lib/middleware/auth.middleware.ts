import { Response, NextFunction } from 'express';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import { ExtendedRequest } from '@fit-friends/core';

export function auth (httpService: HttpService, configService: ConfigService) {
  return async function (req: ExtendedRequest, res: Response, next: NextFunction)
  {
    const authorization = req.headers?.authorization ?? req.headers?.Authorization;

    if (!authorization) {
      return next();
    }

    if (req.user) {
      req.user = undefined;
    }

    const authUrl = configService.get<string>('auth.url') ?? '';

    if (!authUrl) {
      return next();
    }

    try {
      const {data: user} = await firstValueFrom(
        httpService.get(
          authUrl,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": authorization
            }
          }
        ).pipe(catchError((e) => {
          if (e && axios.isAxiosError(e) && e.response) {
            throw new HttpException(e.response.data, e.response.status);
          }

          console.log(`Ошибка ${e}`);

          throw new HttpException('Неизвестная ошибка', 500);
        }))
      )

      req.user = user;
    } catch(e) {
      throw new Error(e.message);
    }

    next();
  }
}
