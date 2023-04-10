import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import { AsyncThunkConfig } from '../../types/thunk-config';
import { Message, NameSpace, UrlPaths } from '../../const';
import { Questionnaire, QuestionnaireCoachApi, QuestionnaireUserApi } from '../../types/questionnaire';
import { setQuestionnaireLoading, setQuestionnaire, setQuestionnaireDefault } from './questionnaire-data';
import { questionnaireAdapt } from '../../services/adapters/questionnaire.adapter';

export const fetchQuestionnaireUserById = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.Questionnaire}/${UrlPaths.QuestionnaireUser}`,
  async (userId, { dispatch, extra: api }) => {
    dispatch(setQuestionnaireLoading(true));

    const { data } = await api.get<QuestionnaireUserApi>(`${UrlPaths.QuestionnaireUser}/${userId}`);

    dispatch(setQuestionnaire(questionnaireAdapt(data)));
    dispatch(setQuestionnaireLoading(false));
  }
);

export const fetchQuestionnaireCoachById = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.Questionnaire}/${UrlPaths.QuestionnaireCoach}`,
  async (userId, { dispatch, extra: api }) => {
    dispatch(setQuestionnaireLoading(true));

    const { data } = await api.get<QuestionnaireCoachApi>(`${UrlPaths.QuestionnaireCoach}/${userId}`);

    dispatch(setQuestionnaire(questionnaireAdapt(data)));
    dispatch(setQuestionnaireLoading(false));
  }
);

export const createQuestionnaireUser = createAsyncThunk<void, Questionnaire, AsyncThunkConfig>(
  `${NameSpace.Questionnaire}/${UrlPaths.QuestionnaireUser}`,
  async (questionnaire, { dispatch, extra: api }) => {
    dispatch(setQuestionnaireLoading(true));
    try {
      const {data} = await api.post<QuestionnaireUserApi>(`${UrlPaths.QuestionnaireUser}`, questionnaire);
      dispatch(setQuestionnaire(questionnaireAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setQuestionnaireLoading(false));
  }
);

export const createQuestionnaireCoach = createAsyncThunk<void, Questionnaire, AsyncThunkConfig>(
  `${NameSpace.Questionnaire}/${UrlPaths.QuestionnaireCoach}`,
  async (questionnaire, { dispatch, extra: api }) => {
    dispatch(setQuestionnaireLoading(true));
    try {
      const {data} = await api.post<QuestionnaireCoachApi>(`${UrlPaths.QuestionnaireCoach}`, questionnaire);
      dispatch(setQuestionnaire(questionnaireAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setQuestionnaireLoading(false));
  }
);

export const updateQuestionnaireUser = createAsyncThunk<void, Questionnaire, AsyncThunkConfig>(
  `${NameSpace.Questionnaire}/${UrlPaths.QuestionnaireUser}`,
  async (questionnaire, { dispatch, extra: api }) => {
    dispatch(setQuestionnaireLoading(true));
    try {
      const {data} =
        await api.patch<QuestionnaireUserApi>(`${UrlPaths.QuestionnaireUser}/${questionnaire.userId}`, questionnaire);
      dispatch(setQuestionnaire(questionnaireAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setQuestionnaireLoading(false));
  }
);

export const updateQuestionnaireCoach = createAsyncThunk<void, Questionnaire, AsyncThunkConfig>(
  `${NameSpace.Questionnaire}/${UrlPaths.QuestionnaireCoach}`,
  async (questionnaire, { dispatch, extra: api }) => {
    dispatch(setQuestionnaireLoading(true));
    try {
      const {data} =
        await api.patch<QuestionnaireCoachApi>(`${UrlPaths.QuestionnaireCoach}/${questionnaire.userId}`, questionnaire);
      dispatch(setQuestionnaire(questionnaireAdapt(data)));
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setQuestionnaireLoading(false));
  }
);

export const deleteQuestionnaireUser = createAsyncThunk<void, Questionnaire, AsyncThunkConfig>(
  `${NameSpace.Questionnaire}/${UrlPaths.QuestionnaireUser}`,
  async (questionnaire, { dispatch, extra: api }) => {
    dispatch(setQuestionnaireLoading(true));
    try {
      await api.delete<void>(`${UrlPaths.QuestionnaireUser}/${questionnaire.userId}`);
      dispatch(setQuestionnaireDefault());
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setQuestionnaireLoading(false));
  }
);

export const deleteQuestionnaireCoach = createAsyncThunk<void, Questionnaire, AsyncThunkConfig>(
  `${NameSpace.Questionnaire}/${UrlPaths.QuestionnaireCoach}`,
  async (questionnaire, { dispatch, extra: api }) => {
    dispatch(setQuestionnaireLoading(true));
    try {
      await api.delete<void>(`${UrlPaths.QuestionnaireCoach}/${questionnaire.userId}`);
      dispatch(setQuestionnaireDefault());
    } catch(e) {
      let message = Message.UnknownMessage;

      if (isAxiosError(e)) {
        message = e.response?.data.message;
      }
      toast.error(message);
    }
    dispatch(setQuestionnaireLoading(false));
  }
);
