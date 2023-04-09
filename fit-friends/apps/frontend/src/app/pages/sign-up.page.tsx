import RegisterFormComponent from '../components/register-form/register-form.component';
import BackgroundComponent from '../components/background/background.component';

function SignUpPage(): JSX.Element {
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
