import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Param,
  Patch,
  Delete,
  Query
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UrlPaths } from '@fit-friends/core';

import { TrainingsService } from './trainings.service';

@ApiTags(UrlPaths.Trainings)
@Controller(UrlPaths.Trainings)
export class TrainingsController {
  constructor(private readonly service: TrainingsService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async index(@Headers() headers, @Query() query) {
    return this.service.getAll(headers, query);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getByCoachId(@Param('id') id: number, @Headers() headers) {
    return this.service.getById(id, headers);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Данные сохранены'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() training, @Headers() headers) {
    return this.service.create(training, headers);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно обновлены'
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(@Param('id') id: number,
                       @Body() training,
                       @Headers() headers) {
    return this.service.update(id, training, headers);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно удалены'
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number, @Headers() headers) {
    return this.service.delete(id, headers);
  }
}
