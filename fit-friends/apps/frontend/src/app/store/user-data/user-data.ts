import { createSlice } from '@reduxjs/toolkit';

import { UserState } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../const';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  users: [],
  avatar: { url: '' },
  currentUser: null,
  isLoading: false,
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsersLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const {
  setAuthorizationStatus,
  setUser,
  setUsers,
  setCurrentUser,
  setUsersLoading,
  setAvatar,
} = userData.actions;
