import { MealIntakeType } from './meal-intake-type.interface';

export interface MealDiary {
  _id?: string;
  userId: string;
  calories: number;
  mealTime: Date;
  intakeType: MealIntakeType;
}
