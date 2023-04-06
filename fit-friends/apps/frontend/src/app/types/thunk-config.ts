import { AppDispatch, State } from './state';
import { AxiosInstance } from 'axios';

export type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
