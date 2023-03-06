import { Duration, TrainingGender, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export interface Training {
  id?: number;
  title: string;
  preview: string;
  level: TrainingLevel;
  type: TrainingType;
  duration: Duration;
  price: number;
  calories: number;
  description: string;
  gender: TrainingGender;
  video: string;
  coachId: string;
  isSpecial: boolean;
}
