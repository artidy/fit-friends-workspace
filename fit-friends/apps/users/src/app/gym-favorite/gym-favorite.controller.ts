import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, fillObject, HttpExceptionFilter, MongoidValidationPipe, User } from '@fit-friends/core';
import { UserRequest, UserRole } from '@fit-friends/shared-types';

import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { GymFavoriteService } from './gym-favorite.service';
import { GymFavoriteRdo } from './rdo/gym-favorite.rdo';

@UseFilters(HttpExceptionFilter)
@ApiTags('favorite-gyms')
@Controller('favorite-gyms')
export class GymFavoriteController {
  constructor(private readonly gymFavoriteService: GymFavoriteService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async index(@User() user: UserRequest) {
    const gymFavorites = await this.gymFavoriteService.getByUserId(user.id);

    return fillObject(GymFavoriteRdo, gymFavorites);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Зал успешно добавлен в список избранных'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Post(':gymId')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Param('gymId') gymId: number, @User() user: UserRequest) {
    const gymFavorite = await this.gymFavoriteService.create(user.id, gymId);

    return fillObject(GymFavoriteRdo, gymFavorite);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Зал успешно удален из списка избранных'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
    await this.gymFavoriteService.delete(id);
  }
}
