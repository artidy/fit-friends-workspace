import { Controller, Get, HttpCode, HttpStatus, Headers, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UrlPaths } from '@fit-friends/core';

import { GymService } from './gym.service';

@ApiTags(UrlPaths.Gyms)
@Controller(UrlPaths.Gyms)
export class GymController {
  constructor(private readonly service: GymService) {}

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
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getById(@Param('id') id: number, @Headers() headers) {
    return this.service.getById(id, headers);
  }
}
