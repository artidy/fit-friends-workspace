import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { UrlPaths } from '@fit-friends/core';

@Injectable()
export class AvatarsService {
  private readonly serviceAddress: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceAddress = this.configService.get<string>('bff.uploaderUrl');
  }

  public async getByUserId(userId: string, headers) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.serviceAddress}/${UrlPaths.Avatars}/${userId}`,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return { url: data.url !== '' ? `${this.serviceAddress.replace('api', '')}${data.url}` : ''};
  }

  public async create(userId: string, avatar, headers) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.serviceAddress}/${UrlPaths.Avatars}/${userId}`,
        avatar,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    );

    return data;
  }

  public async update(userId: string, avatar, headers) {
    const { data } = await firstValueFrom(
      this.httpService.patch(
        `${this.serviceAddress}/${UrlPaths.Avatars}/${userId}`,
        avatar,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }

  public async delete(userId, headers) {
    const { data } = await firstValueFrom(
      this.httpService.delete(
        `${this.serviceAddress}/${UrlPaths.Avatars}/${userId}`,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }
}
