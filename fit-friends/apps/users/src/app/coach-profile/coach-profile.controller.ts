import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
import {
  Auth,
  EditDataForbiddenException,
  fillObject,
  HttpExceptionFilter,
  MongoidValidationPipe, UrlPaths,
  User
} from '@fit-friends/core';
import { UserRequest, UserRole } from '@fit-friends/shared-types';

import { CoachProfileService } from './coach-profile.service';
import { CoachProfileRdo } from './rdo/coach-profile.rdo';
import { CreateCoachProfileDto } from './dto/create-coach-profile.dto';
import { UpdateCoachProfileDto } from './dto/update-coach-profile.dto';

@UseFilters(HttpExceptionFilter)
@ApiTags(UrlPaths.QuestionnaireCoach)
@Controller(UrlPaths.QuestionnaireCoach)
export class CoachProfileController {
  constructor(private readonly coachProfileService: CoachProfileService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async index() {
    const coachProfiles = await this.coachProfileService.getAll();

    return fillObject(CoachProfileRdo, coachProfiles);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  public async getById(@Param('userId', MongoidValidationPipe) userId: string) {
    const coachProfile = await this.coachProfileService.getById(userId);

    return fillObject(CoachProfileRdo, coachProfile);
  }

  @Auth(UserRole.Coach)
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Новый профиль тренера создан'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateCoachProfileDto, @User() user: UserRequest) {
    const coachProfile = await this.coachProfileService.create(user.id, dto);

    return fillObject(CoachProfileRdo, coachProfile);
  }

  @Auth(UserRole.Coach)
  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные профиля тренера успешно обновлены'
  })
  @Patch(':userId')
  public async patch(@Param('userId', MongoidValidationPipe) userId: string,
                     @Body() dto: UpdateCoachProfileDto, @User() userRequest: UserRequest) {
    if (userRequest.id !== userId) {
      throw new EditDataForbiddenException();
    }

    const coachProfile = await this.coachProfileService.update(userId, dto);

    return fillObject(CoachProfileRdo, coachProfile);
  }

  @Auth(UserRole.Coach)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Профиль тренера успешно удален'
  })
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('userId', MongoidValidationPipe) userId: string, @User() userRequest: UserRequest) {
    if (userRequest.id !== userId) {
      throw new EditDataForbiddenException();
    }

    await this.coachProfileService.delete(userId);
  }
}
