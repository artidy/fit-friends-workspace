import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { getIsAuth, getIsCoach, getIsUnknown } from '../store/user-data/selectors';
import QuestionnaireCoachComponent from '../components/questionnaire-coach/questionnaire-coach.component';
import QuestionnaireUserComponent from '../components/questionnaire-user/questionnaire-user.component';
import BackgroundComponent from '../components/background/background.component';
import { AppRoute } from '../const';

function QuestionnairePage(): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);
  const isCoach = useAppSelector(getIsCoach);
  const IsUnknown = useAppSelector(getIsUnknown);

  if (IsUnknown) {
    return <div>Идет загрузка...</div>
  }

  if (!isAuth) {
    return <Navigate to={AppRoute.Main} replace={true} />
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
