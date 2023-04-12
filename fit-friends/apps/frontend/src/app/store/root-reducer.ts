import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { userData } from './user-data/user-data';
import { questionnaireData } from './questionnaire-data/questionnaire-data';
import { trainingsData } from './trainings-data/trainings-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Questionnaire]: questionnaireData.reducer,
  [NameSpace.Trainings]: trainingsData.reducer,
});
