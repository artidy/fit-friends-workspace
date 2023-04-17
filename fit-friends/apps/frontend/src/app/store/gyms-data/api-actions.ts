import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { NameSpace, UrlPaths } from '../../const';
import { setCurrentGym, setGyms, setGymsLoading } from './gyms-data';
import { gymAdapt, gymsAdapt } from '../../services/adapters/gyms.adapter';
import { GymApi } from '../../types/gym';

export const fetchGyms = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.Gyms}/${UrlPaths.Gyms}`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setGymsLoading(true));

    const { data } = await api.get<GymApi[]>(UrlPaths.Gyms);

    dispatch(setGyms(gymsAdapt(data)));
    dispatch(setGymsLoading(false));
  }
);

export const getGymById = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.Gyms}/${UrlPaths.Gyms}`,
  async (gymId, { dispatch, extra: api }) => {
    dispatch(setGymsLoading(true));

    const { data } = await api.get<GymApi>(`${UrlPaths.Gyms}/${gymId}`);

    dispatch(setCurrentGym(gymAdapt(data)));
    dispatch(setGymsLoading(false));
  }
);
