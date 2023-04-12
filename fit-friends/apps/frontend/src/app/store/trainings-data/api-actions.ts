import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { Message, NameSpace, UrlPaths } from '../../const';
import { setCurrentTraining, setTrainings, setTrainingsLoading } from './trainings-data';
import { CreateTraining, TrainingApi, UpdateTraining } from '../../types/training';
import { trainingAdapt, trainingsAdapt } from '../../services/adapters/trainings.adapter';

export const fetchTrainings = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.Trainings}/${UrlPaths.Trainings}`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setTrainingsLoading(true));

    const { data } = await api.get<TrainingApi[]>(`${UrlPaths.Trainings}`);

    dispatch(setTrainings(trainingsAdapt(data)));
    dispatch(setTrainingsLoading(false));
  }
);

export const getTrainingById = createAsyncThunk<void, number, AsyncThunkConfig>(
  `${NameSpace.Trainings}/${UrlPaths.Trainings}`,
  async (trainingId, { dispatch, extra: api }) => {
    dispatch(setTrainingsLoading(true));

    const { data } = await api.get<TrainingApi>(`${UrlPaths.Trainings}/${trainingId}`);

    dispatch(setCurrentTraining(trainingAdapt(data)));
    dispatch(setTrainingsLoading(false));
  }
);

export const createTraining = createAsyncThunk<void, CreateTraining, AsyncThunkConfig>(
  `${NameSpace.Trainings}/${UrlPaths.Trainings}`,
  async (training, { dispatch, extra: api }) => {
    dispatch(setTrainingsLoading(true));
    try {
      await api.post<TrainingApi>(`${UrlPaths.Trainings}`, training);
      dispatch(fetchTrainings());
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setTrainingsLoading(false));
  }
);

export const updateTraining = createAsyncThunk<void, UpdateTraining, AsyncThunkConfig>(
  `${NameSpace.Trainings}/${UrlPaths.Trainings}`,
  async (training, { dispatch, extra: api }) => {
    dispatch(setTrainingsLoading(true));
    try {
      await api.patch<TrainingApi>(`${UrlPaths.Trainings}/${training.id}`, training);
      dispatch(fetchTrainings());
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setTrainingsLoading(false));
  }
);

export const deleteTraining = createAsyncThunk<void, number, AsyncThunkConfig>(
  `${NameSpace.Trainings}/${UrlPaths.Trainings}`,
  async (trainingId, { dispatch, extra: api }) => {
    dispatch(setTrainingsLoading(true));
    try {
      await api.delete<void>(`${UrlPaths.Trainings}/${trainingId}`);
      dispatch(fetchTrainings());
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setTrainingsLoading(false));
  }
);
