import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '@fit-friends/shared-types';

import { AuthorizationStatus, NameSpace } from '../../const';
import { State, UserState } from '../../types/state';

export const getAuthorizationStatus = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.authorizationStatus
);

export const getUser = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.user
);

export const getUsers = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.users
);

export const getCurrentUser = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.currentUser
);

export const IsUsersLoading = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.isLoading
);

export const getIsAuth = createSelector(
  getAuthorizationStatus,
  (authorizationStatus: AuthorizationStatus) =>
    authorizationStatus === AuthorizationStatus.Auth
);

export const getIsUnknown = createSelector(
  getAuthorizationStatus,
  (authorizationStatus: AuthorizationStatus) =>
    authorizationStatus === AuthorizationStatus.Unknown
);

export const getIsCoach = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.user?.role === UserRole.Coach
);

export const getAvatarPath = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserState) => state.avatar
);
