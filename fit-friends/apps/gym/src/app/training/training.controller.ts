import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Auth, fillObject, UrlPaths, User } from '@fit-friends/core';
import { UserRequest, UserRole } from '@fit-friends/shared-types';

import { TrainingService } from './training.service';
import { TrainingRdo } from './rdo/training.rdo';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@ApiTags(UrlPaths.Trainings)
@Controller(UrlPaths.Trainings)
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Auth()
  @Get('/')
  public async index() {
    const trainings = await this.trainingService.findAll();

    return fillObject(TrainingRdo, trainings);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Auth()
  @Get('/:id')
  public async show(@Param('id') id: number) {
    const training = await this.trainingService.findById(id);

    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Данные успешно добавлены'
  })
  @Auth(UserRole.Coach)
  @Post('/')
  public async create(@Body() dto: CreateTrainingDto, @User() user: UserRequest) {
    const training = await this.trainingService.create(dto, user.id);

    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно обновлены'
  })
  @Auth(UserRole.Coach)
  @Patch('/:id')
  public async update(@Param('id') id: number, @Body() dto: UpdateTrainingDto) {
    const training = await this.trainingService.update(id, dto);

    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Данные успешно удалены'
  })
  @Auth(UserRole.Coach)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    await this.trainingService.delete(id);
  }
}
