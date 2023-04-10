import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { QuestionnaireState, State } from '../../types/state';

export const getQuestionnaire = createSelector(
  (state: State) => state[NameSpace.Questionnaire],
  (state: QuestionnaireState) => state.questionnaire
);

export const isQuestionnaireLoading = createSelector(
  (state: State) => state[NameSpace.Questionnaire],
  (state: QuestionnaireState) => state.isLoading
);
