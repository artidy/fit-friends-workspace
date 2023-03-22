import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '@fit-friends/shared-types';

import { NotificationModel } from './notification.model';
import { NotificationEntity } from './notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(NotificationModel.name) private readonly notificationModel: Model<NotificationModel>
  ) {}

  public async findByUserId(userId: string): Promise<Notification[]> {
    return this.notificationModel.find({ userId });
  }

  public async create(notification: NotificationEntity): Promise<Notification> {
    return (new this.notificationModel(notification)).save();
  }

  public async destroy(id: string): Promise<void> {
    await this.notificationModel.deleteOne({ id });
  }
}
