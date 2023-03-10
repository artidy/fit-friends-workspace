import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CoachProfile, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

@Schema({
  collection: 'coach-profiles',
  timestamps: true
})
class CoachProfileModel extends Document implements CoachProfile {
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
    required: true
  })
  public certificate: string;

  @Prop({
    required: true
  })
  public merits: string;

  @Prop({
    required: true
  })
  public isPersonalTraining: boolean;
}

const CoachProfileSchema = SchemaFactory.createForClass(CoachProfileModel);

export {
  CoachProfileModel,
  CoachProfileSchema
}
