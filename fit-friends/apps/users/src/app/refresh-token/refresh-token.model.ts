import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Token } from '@fit-friends/shared-types';

@Schema({
  collection: 'refresh-sessions',
  timestamps: true
})
class RefreshTokenModel extends Document implements Token {
  @Prop()
  public createdAt: Date;

  @Prop({ required: true })
  public tokenId: string;

  @Prop( { required: true })
  public userId: string;

  @Prop({ required: true })
  public expiresIn: Date;
}

const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);

export {
  RefreshTokenModel,
  RefreshTokenSchema
}
