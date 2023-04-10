import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers, Param, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe, UrlPaths } from '@fit-friends/core';

import { QuestionnaireUserService } from './questionnaire-user.service';

@ApiTags(UrlPaths.QuestionnaireUser)
@Controller(UrlPaths.QuestionnaireUser)
export class QuestionnaireUserController {
  constructor(private readonly service: QuestionnaireUserService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async index(@Headers() headers) {
    return this.service.getAll(headers);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  public async getByCoachId(@Param('userId', MongoidValidationPipe) userId: string, @Headers() headers) {
    return this.service.getByCoachId(userId, headers);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Данные сохранены'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() questionnaire, @Headers() headers) {
    return this.service.create(questionnaire, headers);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно обновлены'
  })
  @Patch(':userId')
  @HttpCode(HttpStatus.OK)
  public async update(@Param('userId', MongoidValidationPipe) userId: string,
                       @Body() questionnaire,
                       @Headers() headers) {
    return this.service.update(userId, questionnaire, headers);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно удалены'
  })
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('userId', MongoidValidationPipe) userId: string, @Headers() headers) {
    return this.service.delete(userId, headers);
  }
}
