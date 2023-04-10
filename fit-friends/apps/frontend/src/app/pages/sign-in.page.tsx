import { Navigate } from 'react-router-dom';

import BackgroundComponent from '../components/background/background.component';
import LoginFormComponent from '../components/login-form/login-form.component';
import { useAppSelector } from '../hooks';
import { getIsAuth } from '../store/user-data/selectors';
import { AppRoute } from '../const';

function SignInPage(): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to={AppRoute.Questionnaire} />
  }

  return (
    <main>
      <BackgroundComponent />
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <LoginFormComponent />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignInPage;
