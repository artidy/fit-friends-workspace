import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { State, TrainingsState } from '../../types/state';

export const getTrainings = createSelector(
  (state: State) => state[NameSpace.Trainings],
  (state: TrainingsState) => state.trainings
);

export const getCurrentTraining = createSelector(
  (state: State) => state[NameSpace.Trainings],
  (state: TrainingsState) => state.currentTraining
);

export const isTrainingsLoading = createSelector(
  (state: State) => state[NameSpace.Trainings],
  (state: TrainingsState) => state.isLoading
);
