import { Notification } from '@fit-friends/shared-types';

export class NotificationEntity implements Notification {
  public _id: string;
  public userId: string;
  public text: string;

  constructor(notification: Notification) {
    this.fillEntity(notification);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: Notification) {
    this._id = entity._id;
    this.userId = entity.userId;
    this.text = entity.text;
  }
}
