import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserGender, UserRole } from '@fit-friends/shared-types';

@Schema({
  collection: 'users'
})
class UserModel extends Document implements User {
  @Prop({
    required: true
  })
  public name: string;

  @Prop({
    unique: true,
    required: true,
  })
  public email: string;

  @Prop({
    required: true
  })
  public avatar: string;

  @Prop({
    required: true
  })
  public gender: UserGender;

  @Prop({
    required: true
  })
  public birthDate?: Date;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole
  })
  public role: UserRole;

  @Prop({
    required: true,
    type: String,
  })
  public location: any;

  @Prop({
    required: true
  })
  public createdAt: Date;
}

const UserSchema = SchemaFactory.createForClass(UserModel);

export {
  UserModel,
  UserSchema
}
