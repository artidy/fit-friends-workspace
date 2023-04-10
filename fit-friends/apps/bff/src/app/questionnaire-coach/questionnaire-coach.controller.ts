import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers, Param, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe, UrlPaths } from '@fit-friends/core';

import { QuestionnaireCoachService } from './questionnaire-coach.service';

@ApiTags(UrlPaths.QuestionnaireCoach)
@Controller(UrlPaths.QuestionnaireCoach)
export class QuestionnaireCoachController {
  constructor(private readonly service: QuestionnaireCoachService) {}

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
  @Get(':coachId')
  @HttpCode(HttpStatus.OK)
  public async getByCoachId(@Param('coachId', MongoidValidationPipe) coachId: string, @Headers() headers) {
    return this.service.getByCoachId(coachId, headers);
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
  @Patch(':coachId')
  @HttpCode(HttpStatus.OK)
  public async update(@Param('coachId', MongoidValidationPipe) coachId: string,
                       @Body() questionnaire,
                       @Headers() headers) {
    return this.service.update(coachId, questionnaire, headers);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно удалены'
  })
  @Delete(':coachId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('coachId', MongoidValidationPipe) coachId: string, @Headers() headers) {
    return this.service.delete(coachId, headers);
  }
}
