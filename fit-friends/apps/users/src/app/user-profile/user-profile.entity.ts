import { Duration, TrainingLevel, TrainingType, UserProfile, } from '@fit-friends/shared-types';

export class UserProfileEntity implements UserProfile {
  public _id: string;
  public userId: string;
  public level: TrainingLevel;
  public type: TrainingType;
  public duration: Duration;
  public loseCalories: number;
  public loseCaloriesPerDay: number;
  public isReady: boolean;

  constructor(userProfile: UserProfile) {
    this.fillEntity(userProfile);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: UserProfile): void {
    this._id = entity._id;
    this.userId = entity.userId;
    this.level = entity.level;
    this.type = entity.type;
    this.duration = entity.duration;
    this.loseCalories = entity.loseCalories;
    this.loseCaloriesPerDay = entity.loseCaloriesPerDay;
    this.isReady = entity.isReady;
  }
}
