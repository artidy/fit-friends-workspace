import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Auth, fillObject, User } from '@fit-friends/core';
import { UserRequest, UserRole } from '@fit-friends/shared-types';

import { ApplicationService } from './application.service';
import { ApplicationRdo } from './rdo/application.rdo';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Auth()
  @Get()
  public async index(@User() user: UserRequest) {
    const applications = user.role === UserRole.User ?
      await this.applicationService.findByUserId(user.id) :
      await this.applicationService.findByCoachId(user.id);

    return fillObject(ApplicationRdo, applications);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Данные успешно добавлены'
  })
  @Auth(UserRole.User)
  @Post('/')
  public async create(@User() user: UserRequest, @Body() dto: CreateApplicationDto) {
    const application = await this.applicationService.create(user.id, dto);

    return fillObject(ApplicationRdo, application);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно обновлены'
  })
  @Auth()
  @Patch('/:id')
  public async update(@Param('id') id: number, @Body() dto: UpdateApplicationDto) {
    const application = await this.applicationService.update(id, dto);

    return fillObject(ApplicationRdo, application);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Данные успешно удалены'
  })
  @Auth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    await this.applicationService.delete(id);
  }
}
