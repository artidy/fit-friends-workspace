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

import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { TrainingDiaryService } from './training-diary.service';
import { TrainingDiaryRdo } from './rdo/training-diary.rdo';
import { CreateTrainingDiaryDto } from './dto/create-training-diary.dto';
import { UpdateTrainingDiaryDto } from './dto/update-training-diary.dto';

@UseFilters(HttpExceptionFilter)
@ApiTags('training-diary')
@Controller('training-diary')
export class TrainingDiaryController {
  constructor(private readonly trainingDiaryService: TrainingDiaryService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async index(@User() user: UserRequest) {
    const trainingDiaries = await this.trainingDiaryService.getByUserId(user.id);

    return fillObject(TrainingDiaryRdo, trainingDiaries);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Новый дневник питания создан'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateTrainingDiaryDto, @User() user: UserRequest) {
    const trainingDiary = await this.trainingDiaryService.create(user.id, dto);

    return fillObject(TrainingDiaryRdo, trainingDiary);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные дневника питания успешно обновлены'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Patch(':id')
  public async patch(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UpdateTrainingDiaryDto) {
    const trainingDiary = await this.trainingDiaryService.update(id, dto);

    return fillObject(TrainingDiaryRdo, trainingDiary);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Дневник питания успешно удален'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
    await this.trainingDiaryService.delete(id);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Все дневники питания удалены'
  })
  @UseGuards(JwtAuthGuard)
  @Auth(UserRole.User)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAll(@User() user: UserRequest) {
    await this.trainingDiaryService.deleteByUserId(user.id);
  }
}
