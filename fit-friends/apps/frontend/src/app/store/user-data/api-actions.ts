import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { AuthorizationStatus, Message, NameSpace, REFRESH_TOKEN, TOKEN, UrlPaths } from '../../const';
import { dropToken, getToken, saveTokens } from '../../services/token';
import { setAuthorizationStatus, setToDefault, setUser } from './user-data';
import { CreateUser, LoginUser, User } from '../../types/user';
import { TokenData } from '../../types/token';
import { isAxiosError } from 'axios';

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
      const {data} = await api.post<TokenData>(`${UrlPaths.Users}/${UrlPaths.Login}`, authData);
      saveTokens(data.accessToken, data.refreshToken);
      dispatch(verify());
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }
  }
);

export const refresh = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Refresh}`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post<TokenData>(`${UrlPaths.Users}/${UrlPaths.Refresh}`);
      saveTokens(data.accessToken, data.refreshToken);
      dispatch(verify());
    } catch {
      dispatch(setToDefault());
      dropToken(REFRESH_TOKEN);
      toast.warning(Message.RefreshTokenExpired);
    }
  }
);

export const registerUser = createAsyncThunk<void, CreateUser, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Register}`,
  async (userData, { extra: api }) => {

    try {
      await api.post<User>(`${UrlPaths.Users}/${UrlPaths.Register}`, userData);

      toast.success(Message.SuccessRegistration);
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }
  }
);
