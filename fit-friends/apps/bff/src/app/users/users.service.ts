import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { UrlPaths } from '@fit-friends/core';
import { LoginUser } from '@fit-friends/shared-types';

@Injectable()
export class UsersService {
  private readonly serviceAddress: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.serviceAddress = this.configService.get<string>('bff.usersUrl');
  }

  public async verify(headers) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.serviceAddress}/${UrlPaths.Users}/${UrlPaths.Verify}`,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }

  public async register(user, headers) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.serviceAddress}/${UrlPaths.Users}`,
        user,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }

  public async login(user: LoginUser, headers) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.serviceAddress}/${UrlPaths.Auth}/${UrlPaths.Login}`,
        user,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }

  public async update(userId, updateData, headers) {
    const { data } = await firstValueFrom(
      this.httpService.patch(
        `${this.serviceAddress}/${UrlPaths.Users}/${userId}`,
        updateData,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }

  public async refresh(headers){
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.serviceAddress}/${UrlPaths.Auth}/${UrlPaths.Refresh}`,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }

  public async getAll(headers) {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.serviceAddress}/${UrlPaths.Users}`,
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
        `${this.serviceAddress}/${UrlPaths.Users}/${id}`,
        {headers}
      ).pipe(catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }))
    )

    return data;
  }
}
