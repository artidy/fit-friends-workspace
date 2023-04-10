import { Questionnaire, QuestionnaireCoachApi, QuestionnaireUserApi } from '../../types/questionnaire';

export function questionnaireAdapt(questionnaire: QuestionnaireUserApi | QuestionnaireCoachApi): Questionnaire {
  return {
    ...questionnaire
  }
}
