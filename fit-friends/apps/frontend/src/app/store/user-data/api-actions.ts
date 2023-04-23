import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { AuthorizationStatus, Message, NameSpace, TOKEN, UrlPaths } from '../../const';
import { getToken, saveTokens } from '../../services/token';
import { setAuthorizationStatus, setAvatar, setCurrentUser, setUser, setUsers, setUsersLoading } from './user-data';
import { CreateUser, LoginUser, UpdateUser, User, UserApi } from '../../types/user';
import { TokenData } from '../../types/token';
import { userAdapt, usersAdapt } from '../../services/adapters/users.adapter';
import { AvatarApi, AvatarUpload } from '../../types/avatar';
import { config } from 'rxjs';
import { avatarAdapt } from '../../services/adapters/avatar.adapter';

export const verify = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Verify}`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const token = getToken(TOKEN);

      if (token) {
        const { data } = await api.get<UserApi>(`${UrlPaths.Users}/${UrlPaths.Auth}/${UrlPaths.Verify}`);
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUser(userAdapt(data)));

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

export const getAvatar = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Avatars}`,
  async (userId, { dispatch, extra: api }) => {
    try {
      const {data} = await api.get<AvatarApi>(`${UrlPaths.Avatars}/${userId}`
      );
      dispatch(setAvatar(avatarAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }
  }
);

export const uploadAvatar = createAsyncThunk<void, AvatarUpload, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Avatars}`,
  async (avatarData, { dispatch, extra: api }) => {
    const formData = new FormData();
    formData.append('userId', avatarData.userId);
    formData.append('avatar', avatarData.avatar);

    try {
      const {data} = await api.post<AvatarApi>(
        `${UrlPaths.Avatars}/${avatarData.userId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      dispatch(setAvatar(avatarAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }
  }
);

export const deleteAvatar = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Avatars}`,
  async (userId, { dispatch, extra: api }) => {
    try {
      await api.delete<void>(`${UrlPaths.Avatars}/${userId}`);
      dispatch(setAvatar({ url: ''}));
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
      await api.post<UserApi>(`${UrlPaths.Users}/${UrlPaths.Register}`, userData);
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

export const updateUser = createAsyncThunk<void, UpdateUser, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Users}`,
  async (userData, { dispatch, extra: api }) => {

    try {
      const {data} = await api.patch<UserApi>(`${UrlPaths.Users}/${userData.id}`, userData);
      dispatch(setUser(userAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }

      toast.error(message);
    }
  }
);

export const getApiUsers = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Users}`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setUsersLoading(true));
      const {data} = await api.get<UserApi[]>(`${UrlPaths.Users}`);
      dispatch(setUsers(usersAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setUsersLoading(false));
  }
);

export const getApiCurrentUser = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.User}/${UrlPaths.Users}`,
  async (userId, { dispatch, extra: api }) => {
    try {
      dispatch(setUsersLoading(true));
      const {data} = await api.get<UserApi>(`${UrlPaths.Users}/${userId}`);
      dispatch(setCurrentUser(userAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setUsersLoading(false));
  }
);
