import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Friend } from '@fit-friends/shared-types';
import { Type } from 'class-transformer';
import { User } from '@fit-friends/core';

@Schema({
  collection: 'friends',
  timestamps: true
})
class FriendModel extends Document implements Friend {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User'
  })
  @Type(() => User)
  public userId: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User'
  })
  @Type(() => User)
  public friendId: string;
}

const FriendSchema = SchemaFactory.createForClass(FriendModel);

export {
  FriendModel,
  FriendSchema
}
