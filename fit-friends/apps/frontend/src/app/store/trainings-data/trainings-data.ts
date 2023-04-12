import { createSlice } from '@reduxjs/toolkit';

import { TrainingsState } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: TrainingsState = {
  currentTraining: null,
  trainings: [],
  isLoading: false,
};

export const trainingsData = createSlice({
  name: NameSpace.Trainings,
  initialState,
  reducers: {
    setTrainings: (state, action) => {
      state.trainings = action.payload;
    },
    setCurrentTraining: (state, action) => {
      state.currentTraining = action.payload;
    },
    setDefaultState: (state) => {
      state = initialState;
    },
    setTrainingsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTrainings,
  setCurrentTraining,
  setDefaultState,
  setTrainingsLoading
} = trainingsData.actions;
