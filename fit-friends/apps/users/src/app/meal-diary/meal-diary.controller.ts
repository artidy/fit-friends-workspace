import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, fillObject, HttpExceptionFilter, MongoidValidationPipe, User } from '@fit-friends/core';
import { UserRequest, UserRole } from '@fit-friends/shared-types';

import { CoachProfileRdo } from '../coach-profile/rdo/coach-profile.rdo';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { MealDiaryService } from './meal-diary.service';
import { MealDiaryRdo } from './rdo/meal-diary.rdo';
import { CreateMealDiaryDto } from './dto/create-meal-diary.dto';
import { UpdateMealDiaryDto } from './dto/update-meal-diary.dto';

@UseFilters(HttpExceptionFilter)
@ApiTags('meal-diary')
@Controller('meal-diary')
export class MealDiaryController {
  constructor(private readonly mealDiaryService: MealDiaryService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async index(@User() user: UserRequest) {
    const mealDiaries = await this.mealDiaryService.getByUserId(user.id);

    return fillObject(MealDiaryRdo, mealDiaries);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Новый дневник питания создан'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateMealDiaryDto, @User() user: UserRequest) {
    const coachProfile = await this.mealDiaryService.create(user.id, dto);

    return fillObject(CoachProfileRdo, coachProfile);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные дневника питания успешно обновлены'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Patch(':id')
  public async patch(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateMealDiaryDto) {
    const coachProfile = await this.mealDiaryService.update(id, dto);

    return fillObject(CoachProfileRdo, coachProfile);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Дневник питания успешно удален'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
    await this.mealDiaryService.delete(id);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Все дневники питания удалены'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAll(@User() user: UserRequest) {
    await this.mealDiaryService.deleteByUserId(user.id);
  }
}
