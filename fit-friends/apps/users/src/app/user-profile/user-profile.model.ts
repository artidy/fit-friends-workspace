import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Duration, TrainingLevel, TrainingType, UserProfile, UserRole } from '@fit-friends/shared-types';

@Schema({
  collection: 'user-profiles',
  timestamps: true
})
class UserProfileModel extends Document implements UserProfile {
  @Prop({
    required: true
  })
  public userId: string;

  @Prop({
    required: true,
    type: String
  })
  public level: TrainingLevel;

  @Prop({
    required: true,
    type: String
  })
  public type: TrainingType;

  @Prop({
    required: true,
    type: String,
    enum: UserRole
  })
  public duration: Duration;

  @Prop({
    required: true
  })
  public loseCalories: number;

  @Prop({
    required: true
  })
  public loseCaloriesPerDay: number;

  @Prop({
    required: true
  })
  public isReady: boolean;
}

const UserProfileSchema = SchemaFactory.createForClass(UserProfileModel);

export {
  UserProfileModel,
  UserProfileSchema
}
