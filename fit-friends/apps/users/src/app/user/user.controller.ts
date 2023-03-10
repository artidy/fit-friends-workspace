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
import { fillObject, HttpExceptionFilter, MongoidValidationPipe, User, EditDataForbiddenException } from '@fit-friends/core';
import { UserRequest } from '@fit-friends/shared-types';

import { UserService } from './user.service';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@UseFilters(HttpExceptionFilter)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async index() {
    const users = await this.userService.getAll();

    return fillObject(UserRdo, users);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getById(@Param('id', MongoidValidationPipe) id: string) {
    const user = await this.userService.getUserById(id);

    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Новый пользователь создан'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK, description: 'Проверка пользователя прошла успешно'
  })
  @Get('jwt/verify')
  public async verify(@User() userRequest: UserRequest) {
    const user = await this.userService.getUserById(userRequest.id);

    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные пользователя успешно обновлены'
  })
  @Patch(':id')
  public async patch(@Param('id', MongoidValidationPipe) id: string,
                     @Body() dto: UpdateUserDto, @User() userRequest: UserRequest) {
    if (userRequest.id !== id) {
      throw new EditDataForbiddenException();
    }

    const user = await this.userService.update(id, dto);

    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Пользователь успешно удален'
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', MongoidValidationPipe) id: string, @User() userRequest: UserRequest) {
    if (userRequest.id !== id) {
      throw new EditDataForbiddenException();
    }

    await this.userService.delete(id);
  }
}
