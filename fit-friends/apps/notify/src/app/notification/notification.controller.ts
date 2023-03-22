import { Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { Auth, fillObject, MongoidValidationPipe, User } from '@fit-friends/core';
import { CommandEvent, UserRequest } from '@fit-friends/shared-types';

import { NotificationService } from './notification.service';
import { NotificationRdo } from './rdo/notification.rdo';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Auth()
  @Post('/')
  public async index(@User() user: UserRequest) {
    const notifications = await this.notificationService.findByUserId(user.id);

    return fillObject(NotificationRdo, notifications);
  }

  @EventPattern({ cmd: CommandEvent.AddNewNotification })
  public async addNewNotification(dto: CreateNotificationDto) {
    const notification = await this.notificationService.add(dto);

    return fillObject(NotificationRdo, notification);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Данные успешно удалены'
  })
  @Auth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
    await this.notificationService.delete(id);
  }
}
