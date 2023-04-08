import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { User } from './user';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
