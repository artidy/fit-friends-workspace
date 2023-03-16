import { MealIntakeType } from './meal-intake-type.interface';

export interface FoodDiary {
  id?: number;
  calories: number;
  mealTime: Date;
  typeMealIntake: MealIntakeType;
}
