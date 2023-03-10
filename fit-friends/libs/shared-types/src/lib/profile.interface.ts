import { Duration, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export interface Profile {
  _id?: string;
  userId: string;
  level: TrainingLevel;
  type: TrainingType;
}

export interface UserProfile extends Profile {
  duration: Duration;
  loseCalories: number;
  loseCaloriesPerDay: number;
  isReady: boolean;
}

export interface CoachProfile extends Profile {
  certificate: string;
  merits: string;
  isPersonalTraining: boolean;
}
