import { Duration } from '@fit-friends/shared-types';

export type Questionnaire = {
  id: string;
  userId: string;
  level: string;
  types: string[];
  certificate?: string;
  merits?: string;
  isPersonalTraining?: boolean;
  duration?: Duration;
  loseCalories?: number;
  loseCaloriesPerDay?: number;
  isReady?: boolean;
}

export type QuestionnaireUserApi = {
  id: string;
  userId: string;
  level: string;
  types: string[];
  duration: Duration;
  loseCalories: number;
  loseCaloriesPerDay: number;
  isReady: boolean;
}

export type QuestionnaireCoachApi = {
  id: string;
  userId: string;
  level: string;
  types: string[];
  certificate: string;
  merits: string;
  isPersonalTraining: boolean;
}