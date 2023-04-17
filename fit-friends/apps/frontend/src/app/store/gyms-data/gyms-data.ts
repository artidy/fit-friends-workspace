import { createSlice } from '@reduxjs/toolkit';

import { GymsState } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: GymsState = {
  gyms: [],
  currentGym: null,
  isLoading: false,
};

export const gymsData = createSlice({
  name: NameSpace.Gyms,
  initialState,
  reducers: {
    setGyms: (state, action) => {
      state.gyms = action.payload;
    },
    setCurrentGym: (state, action) => {
      state.currentGym = action.payload;
    },
    setDefaultState: (state) => {
      state = initialState;
    },
    setGymsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setGyms,
  setCurrentGym,
  setDefaultState,
  setGymsLoading
} = gymsData.actions;
