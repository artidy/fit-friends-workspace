import { TrainingDiary } from '@fit-friends/shared-types';

export class TrainingDiaryEntity implements TrainingDiary {
  public _id: string;
  public userId: string;
  public calories: number;
  public trainingId: number;
  public elapsedTime: number;
  public trainingDate: Date;

  constructor(trainingDiary: TrainingDiary) {
    this.fillEntity(trainingDiary);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: TrainingDiary): void {
    this._id = entity._id;
    this.userId = entity.userId;
    this.trainingId = entity.trainingId;
    this.calories = entity.calories;
    this.elapsedTime = entity.elapsedTime;
    this.trainingDate = entity.trainingDate;
  }
}
