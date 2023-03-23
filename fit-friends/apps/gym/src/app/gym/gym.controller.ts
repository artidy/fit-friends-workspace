import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { fillObject } from '@fit-friends/core';

import { GymService } from './gym.service';
import { GymRdo } from './rdo/gym.rdo';

@ApiTags('gyms')
@Controller('gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Get('/')
  public async index() {
    const gyms = await this.gymService.findAll();

    return fillObject(GymRdo, gyms);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Get('/:id')
  public async show(@Param('id') id: number) {
    const gym = await this.gymService.findById(id);

    return fillObject(GymRdo, gym);
  }
}
