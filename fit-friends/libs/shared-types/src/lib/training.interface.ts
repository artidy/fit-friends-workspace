import { TrainingGender } from './training-gender.enum';
import { Duration } from './duration.enum';

export interface Training {
  id?: number;
  title: string;
  preview: string;
  level: string;
  type: string;
  duration: Duration;
  price: number;
  calories: number;
  description: string;
  gender: TrainingGender;
  video: string;
  coachId: string;
  isSpecial: boolean;
}
