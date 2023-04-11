import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { getIsAuth, getIsCoach } from '../store/user-data/selectors';
import QuestionnaireCoachComponent from '../components/questionnaire-coach/questionnaire-coach.component';
import QuestionnaireUserComponent from '../components/questionnaire-user/questionnaire-user.component';
import BackgroundComponent from '../components/background/background.component';
import { AppRoute } from '../const';
import { getQuestionnaire } from '../store/questionnaire-data/selectors';

function QuestionnairePage(): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);
  const isCoach = useAppSelector(getIsCoach);
  const profile = useAppSelector(getQuestionnaire);

  if (!isAuth) {
    return <Navigate to={AppRoute.Main} replace={true} />
  }

  if (profile.id) {
    return <Navigate to={AppRoute.Account} />
  }

  const questionnaire = isCoach ? <QuestionnaireCoachComponent /> : <QuestionnaireUserComponent />;

  return (
    <main>
      <BackgroundComponent />
      {questionnaire}
    </main>
  )
}

export default QuestionnairePage;
