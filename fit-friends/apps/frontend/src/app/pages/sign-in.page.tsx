import BackgroundComponent from '../components/background/background.component';
import LoginFormComponent from '../components/login-form/login-form.component';

function SignInPage(): JSX.Element {
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
