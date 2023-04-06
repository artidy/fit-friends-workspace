import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { User } from '@fit-friends/shared-types';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { AuthorizationStatus, BffPaths, NameSpace } from '../../const';
import { dropToken, getToken, saveToken } from '../../services/token';
import { setAuthorizationStatus, setUser } from './user-data';
import { CreateUser, LoggedUser, LoginUser } from '../../types/user';

export const checkAuth = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const token = getToken();

      if (token) {
        const { data } = await api.get<User>(BffPaths.Users);
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUser(data));

        return;
      }
    } catch {
      dropToken();
    }

    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  }
);

export const login = createAsyncThunk<void, LoginUser, AsyncThunkConfig>(
  `${NameSpace.User}/login`,
  async (authData, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post<LoggedUser>(`${BffPaths.Users}/login`, authData);
      saveToken(data.accessToken);
      dispatch(checkAuth());
    } catch {
      toast.error('Can\'t login');
    }
  }
);

export const registerUser = createAsyncThunk<void, CreateUser, AsyncThunkConfig>(
  `${NameSpace.User}/register`,
  async (userData, { extra: api }) => {

    try {
      await api.post<User>(`${BffPaths.Users}/register`, userData);
      toast.success('Sign up is success');
    } catch {
      toast.error('Can\'t Sign up');
    }
  }
);
