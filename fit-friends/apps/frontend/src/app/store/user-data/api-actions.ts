import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { AuthorizationStatus, Message, NameSpace, TOKEN, UrlPaths } from '../../const';
import { getToken, saveTokens } from '../../services/token';
import { setAuthorizationStatus, setUser } from './user-data';
import { CreateUser, LoginUser, User } from '../../types/user';
import { TokenData } from '../../types/token';

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

      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }
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

export const registerUser = createAsyncThunk<void, CreateUser, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Register}`,
  async (userData, { dispatch, extra: api }) => {

    try {
      await api.post<User>(`${UrlPaths.Users}/${UrlPaths.Register}`, userData);
      dispatch(login({email: userData.email, password: userData.password}));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }
  }
);
