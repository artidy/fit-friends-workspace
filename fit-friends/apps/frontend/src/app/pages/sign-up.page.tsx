import { Navigate } from 'react-router-dom';

import RegisterFormComponent from '../components/register-form/register-form.component';
import BackgroundComponent from '../components/background/background.component';
import { useAppSelector } from '../hooks';
import { getIsAuth } from '../store/user-data/selectors';
import { AppRoute } from '../const';

function SignUpPage(): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to={AppRoute.Questionnaire} />
  }

  return (
    <main>
      <BackgroundComponent />
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <RegisterFormComponent />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage;
