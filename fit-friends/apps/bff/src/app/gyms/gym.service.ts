import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { UrlPaths } from '@fit-friends/core';

@Injectable()
export class GymService {
  private readonly serviceAddress: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.serviceAddress = this.configService.get<string>('bff.gym');
  }

  public async getAll(headers) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.serviceAddress}/${UrlPaths.Gyms}`,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }

  public async getById(id, headers) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.serviceAddress}/${UrlPaths.Gyms}/${id}`,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }
}
