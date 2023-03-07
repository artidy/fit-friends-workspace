import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Auth, fillObject } from '@fit-friends/core';

import { GymService } from './gym.service';
import { GymRdo } from './rdo/gym.rdo';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';

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

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Данные успешно добавлены'
  })
  @Auth()
  @Post('/')
  public async create(@Body() dto: CreateGymDto) {
    const gym = await this.gymService.create(dto);

    return fillObject(GymRdo, gym);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно обновлены'
  })
  @Auth()
  @Patch('/:id')
  public async update(@Param('id') id: number, @Body() dto: UpdateGymDto) {
    const gym = await this.gymService.update(id, dto);

    return fillObject(GymRdo, gym);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Данные успешно удалены'
  })
  @Auth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    await this.gymService.delete(id);
  }
}
