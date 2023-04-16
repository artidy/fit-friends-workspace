import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Avatar } from '@fit-friends/shared-types';

@Schema({
  collection: 'avatars',
  timestamps: true
})
class AvatarModel extends Document implements Avatar {
  @Prop()
  public id: string;

  @Prop()
  public userId: string;

  @Prop()
  public fileName: string;
}

const AvatarSchema = SchemaFactory.createForClass(AvatarModel);

export {
  AvatarModel,
  AvatarSchema
}
