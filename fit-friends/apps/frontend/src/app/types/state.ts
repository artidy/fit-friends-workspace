import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { User } from './user';
import { Questionnaire } from './questionnaire';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type QuestionnaireState = {
  questionnaire: Questionnaire;
  isLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
