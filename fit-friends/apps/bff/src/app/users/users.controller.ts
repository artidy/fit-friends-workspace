import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UrlPaths } from '@fit-friends/core';
import { LoginUser } from '@fit-friends/shared-types';

import { UsersService } from './users.service';

@ApiTags(UrlPaths.Users)
@Controller(UrlPaths.Users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async verify(@Headers() headers) {
    return this.usersService.verify(headers);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно авторизовались'
  })
  @Post(UrlPaths.Login)
  @HttpCode(HttpStatus.OK)
  public async login(@Body() user: LoginUser, @Headers() headers) {
    return this.usersService.login(user, headers);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Новый пользователь создан'
  })
  @Post(UrlPaths.Register)
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() user, @Headers() headers) {
    return this.usersService.register(user, headers);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Токены доступа обновлены'
  })
  @Get(UrlPaths.Refresh)
  @HttpCode(HttpStatus.OK)
  public async refresh(@Headers() headers) {
    return this.usersService.refresh(headers);
  }
}
