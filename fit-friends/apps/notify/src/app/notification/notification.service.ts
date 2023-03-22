import { Injectable } from '@nestjs/common';
import { Notification } from '@fit-friends/shared-types';

import { NotificationRepository } from './notification.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEntity } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async findByUserId(userId: string): Promise<Notification[]> {
    return this.notificationRepository.findByUserId(userId);
  }

  public async add(dto: CreateNotificationDto): Promise<Notification> {
    const notification = new NotificationEntity({ ...dto });

    return this.notificationRepository.create(notification);
  }

  public async delete(id: string): Promise<void> {
    await this.notificationRepository.destroy(id);
  }
}
