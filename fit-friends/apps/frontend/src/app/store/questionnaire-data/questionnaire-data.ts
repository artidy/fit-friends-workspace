import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { QuestionnaireState } from '../../types/state';

const initialState: QuestionnaireState = {
  questionnaire: {
    id: '',
    userId: '',
    types: [],
    level: ''
  },
  isLoading: false,
};

export const questionnaireData = createSlice({
  name: NameSpace.Questionnaire,
  initialState,
  reducers: {
    setQuestionnaire: (state, action) => {
      state.questionnaire = action.payload;
    },
    setQuestionnaireLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setQuestionnaireDefault: (state) => {
      state = initialState;
    },
  },
});

export const {
  setQuestionnaire,
  setQuestionnaireLoading,
  setQuestionnaireDefault
} = questionnaireData.actions;
