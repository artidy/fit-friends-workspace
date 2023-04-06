import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UrlPaths } from '@fit-friends/core';
import { LoggedUser, LoginUser, User } from '@fit-friends/shared-types';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { AuthorizationStatus, NameSpace, REFRESH_TOKEN, TOKEN } from '../../const';
import { dropToken, dropTokens, getToken, saveTokens } from '../../services/token';
import { setAuthorizationStatus, setToDefault, setUser } from './user-data';
import { CreateUser } from '../../types/user';

export const verify = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Verify}`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const token = getToken(TOKEN);

      if (token) {
        const { data } = await api.get<User>(UrlPaths.Users);
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUser(data));

        return;
      }
    } catch {
      dropToken(TOKEN);
    }

    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  }
);

export const login = createAsyncThunk<void, LoginUser, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Login}`,
  async (authData, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post<LoggedUser>(`${UrlPaths.Users}/${UrlPaths.Login}`, authData);
      saveTokens(data.accessToken, data.refreshToken);
      dispatch(verify());
    } catch {
      toast.error('Can\'t login');
    }
  }
);

export const refresh = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Refresh}`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post<LoggedUser>(`${UrlPaths.Users}/${UrlPaths.Refresh}`);
      saveTokens(data.accessToken, data.refreshToken);
      dispatch(verify());
    } catch {
      dispatch(setToDefault());
      dropToken(REFRESH_TOKEN);
      toast.warning('Время текущего сеанса истекло.');
    }
  }
);

export const registerUser = createAsyncThunk<void, CreateUser, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Register}`,
  async (userData, { extra: api }) => {

    try {
      await api.post<User>(`${UrlPaths.Users}/${UrlPaths.Register}`, userData);
      toast.success('Sign up is success');
    } catch {
      toast.error('Can\'t Sign up');
    }
  }
);
