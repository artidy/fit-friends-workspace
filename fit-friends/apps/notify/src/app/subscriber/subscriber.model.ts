import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Subscriber } from '@fit-friends/shared-types';

@Schema({
  collection: 'subscribers',
  timestamps: true,
})
class SubscriberModel extends Document implements Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public firstname: string;

  @Prop()
  public coachId: string;
}

const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);

export {
  SubscriberModel,
  SubscriberSchema,
}
