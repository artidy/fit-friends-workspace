import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { fillObject, HttpExceptionFilter, MongoidValidationPipe, User } from '@fit-friends/core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRequest } from '@fit-friends/shared-types';

import { FriendService } from './friend.service';
import { UserRdo } from '../user/rdo/user.rdo';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';

@UseFilters(HttpExceptionFilter)
@ApiTags('friends')
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async getById(@User() user: UserRequest) {
    const friends = await this.friendService.getFriendsById(user.id);

    return fillObject(UserRdo, friends);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Новый друг добавлен'
  })
  @UseGuards(JwtAuthGuard)
  @Post(':friendId')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Param('friendId', MongoidValidationPipe) friendId: string, @User() user: UserRequest) {
    const friend = await this.friendService.create(user.id, friendId);

    return fillObject(UserRdo, friend);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Друг успешно удален из списка'
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':friendId')
  public async delete(@Param('friendId', MongoidValidationPipe) friendId: string, @User() userRequest: UserRequest) {
    await this.friendService.delete(userRequest.id, friendId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Все друзья из списка удалены'
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAll(@User() userRequest: UserRequest) {
    await this.friendService.deleteAll(userRequest.id);
  }
}
