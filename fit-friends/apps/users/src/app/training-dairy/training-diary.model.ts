import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TrainingDiary } from '@fit-friends/shared-types';

@Schema({
  collection: 'training-diaries',
  timestamps: true
})
class TrainingDiaryModel extends Document implements TrainingDiary {
  @Prop({
    required: true
  })
  public userId: string;

  @Prop({
    required: true
  })
  public trainingId: number;

  @Prop({
    required: true
  })
  public calories: number;

  @Prop({
    required: true
  })
  public elapsedTime: number;

  @Prop({
    required: true
  })
  public trainingDate: Date;
}

const TrainingDiarySchema = SchemaFactory.createForClass(TrainingDiaryModel);

export {
  TrainingDiaryModel,
  TrainingDiarySchema
}
