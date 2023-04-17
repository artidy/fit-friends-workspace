import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { GymsState, State } from '../../types/state';

export const getGyms = createSelector(
  (state: State) => state[NameSpace.Gyms],
  (state: GymsState) => state.gyms
);

export const getCurrentGym = createSelector(
  (state: State) => state[NameSpace.Gyms],
  (state: GymsState) => state.currentGym
);

export const isGymsLoading = createSelector(
  (state: State) => state[NameSpace.Gyms],
  (state: GymsState) => state.isLoading
);
