import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Notification } from '@fit-friends/shared-types';

@Schema({
  collection: 'notifications',
  timestamps: true,
})
class NotificationModel extends Document implements Notification {
  @Prop()
  public userId: string;

  @Prop()
  public text: string;
}

const NotificationSchema = SchemaFactory.createForClass(NotificationModel);

export {
  NotificationModel,
  NotificationSchema,
}
