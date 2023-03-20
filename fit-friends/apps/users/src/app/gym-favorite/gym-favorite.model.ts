import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GymFavorite } from '@fit-friends/shared-types';

@Schema({
  collection: 'favorite-gyms',
  timestamps: true
})
class GymFavoriteModel extends Document implements GymFavorite {
  @Prop({
    required: true
  })
  public gymId: number;

  @Prop({
    required: true
  })
  public userId: string;
}

const GymFavoriteSchema = SchemaFactory.createForClass(GymFavoriteModel);

export {
  GymFavoriteModel,
  GymFavoriteSchema
}
