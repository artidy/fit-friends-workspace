import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { User } from './user';
import { Questionnaire } from './questionnaire';
import { Training } from './training';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
};

export type QuestionnaireState = {
  questionnaire: Questionnaire;
  isLoading: boolean;
};

export type TrainingsState = {
  trainings: Training[];
  currentTraining: Training | null;
  isLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
