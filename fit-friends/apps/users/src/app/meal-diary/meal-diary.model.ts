import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MealDiary, MealIntakeType } from '@fit-friends/shared-types';

@Schema({
  collection: 'meal-diaries',
  timestamps: true
})
class MealDiaryModel extends Document implements MealDiary {
  @Prop({
    required: true
  })
  public userId: string;

  @Prop({
    required: true
  })
  public calories: number;

  @Prop({
    required: true
  })
  public mealTime: Date;

  @Prop({
    required: true,
    type: String
  })
  public intakeType: MealIntakeType;
}

const MealDiarySchema = SchemaFactory.createForClass(MealDiaryModel);

export {
  MealDiaryModel,
  MealDiarySchema
}
