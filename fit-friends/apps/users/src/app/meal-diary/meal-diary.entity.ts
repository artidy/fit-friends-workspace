import { MealDiary, MealIntakeType } from '@fit-friends/shared-types';

export class MealDiaryEntity implements MealDiary {
  public _id: string;
  public userId: string;
  public calories: number;
  public mealTime: Date;
  public intakeType: MealIntakeType;

  constructor(mealDiary: MealDiary) {
    this.fillEntity(mealDiary);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: MealDiary): void {
    this._id = entity._id;
    this.userId = entity.userId;
    this.calories = entity.calories;
    this.mealTime = entity.mealTime;
    this.intakeType = entity.intakeType;
  }
}
