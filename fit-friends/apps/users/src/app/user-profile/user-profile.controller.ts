import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { fillObject, MongoidValidationPipe, User } from '@fit-friends/core';
import { UserRequest } from '@fit-friends/shared-types';

import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { UserProfileService } from './user-profile.service';
import { UserProfileRdo } from './rdo/user-profile.rdo';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@ApiTags('user-profile')
@Controller('user-profile')
export class UserController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async index() {
    const userProfiles = await this.userProfileService.getAll();

    return fillObject(UserProfileRdo, userProfiles);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  public async getById(@Param('userId', MongoidValidationPipe) userId: string) {
    const userProfile = await this.userProfileService.getById(userId);

    return fillObject(UserProfileRdo, userProfile);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Новый профиль пользователя создан'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateUserProfileDto, @User() user: UserRequest) {
    const userProfile = await this.userProfileService.create(user.id, dto);

    return fillObject(UserProfileRdo, userProfile);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные профиля пользователя успешно обновлены'
  })
  @Patch(':userId')
  public async patch(@Param('userId', MongoidValidationPipe) userId: string,
                     @Body() dto: UpdateUserProfileDto, @User() userRequest: UserRequest) {
    if (userRequest.id !== userId) {
      throw new Error('Редактировать данные другого пользователя недопускается.');
    }

    const userProfile = await this.userProfileService.update(userId, dto);

    return fillObject(UserProfileRdo, userProfile);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Профиль пользователя успешно удален'
  })
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('userId', MongoidValidationPipe) userId: string, @User() userRequest: UserRequest) {
    if (userRequest.id !== userId) {
      throw new Error('Нельзя удалить профиль другого пользователя.');
    }

    await this.userProfileService.delete(userId);
  }
}
