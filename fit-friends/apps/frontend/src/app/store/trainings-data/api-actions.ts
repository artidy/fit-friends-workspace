import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { DEFAULT_TRAINING_QUERY, Message, NameSpace, UrlPaths } from '../../const';
import { setCurrentTraining, setSpecial, setTrainings, setTrainingsLoading } from './trainings-data';
import { CreateTraining, TrainingApi, UpdateTraining } from '../../types/training';
import { trainingAdapt, trainingsAdapt } from '../../services/adapters/trainings.adapter';
import { TrainingQuery } from '../../types/query';

export const fetchTrainings = createAsyncThunk<void, TrainingQuery, AsyncThunkConfig>(
  `${NameSpace.Trainings}/${UrlPaths.Trainings}`,
  async (query, { dispatch, extra: api }) => {
    dispatch(setTrainingsLoading(true));

    const { data } = await api.get<TrainingApi[]>(`${UrlPaths.Trainings}`, { params: query });

    dispatch(setTrainings(trainingsAdapt(data)));
    dispatch(setTrainingsLoading(false));
  }
);

export const fetchSpecial = createAsyncThunk<void, TrainingQuery, AsyncThunkConfig>(
  `${NameSpace.Trainings}/${UrlPaths.Trainings}`,
  async (query, { dispatch, extra: api }) => {
    dispatch(setTrainingsLoading(true));

    const { data } = await api.get<TrainingApi[]>(`${UrlPaths.Trainings}`, { params: query });

    dispatch(setSpecial(trainingsAdapt(data)));
    dispatch(setTrainingsLoading(false));
  }
);

export const getTrainingById = createAsyncThunk<void, string, AsyncThunkConfig>(
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
      dispatch(fetchTrainings(DEFAULT_TRAINING_QUERY));
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
      dispatch(fetchTrainings(DEFAULT_TRAINING_QUERY));
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

export const deleteTraining = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.Trainings}/${UrlPaths.Trainings}`,
  async (trainingId, { dispatch, extra: api }) => {
    dispatch(setTrainingsLoading(true));
    try {
      await api.delete<void>(`${UrlPaths.Trainings}/${trainingId}`);
      dispatch(fetchTrainings(DEFAULT_TRAINING_QUERY));
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
