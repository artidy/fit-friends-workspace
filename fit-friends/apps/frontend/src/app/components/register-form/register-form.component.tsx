import { FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/user-data/api-actions';
import { getFormatTitle } from '../../services/helpers';
import { LOCATIONS, USER_ROLES, UserGender, UserRole } from '../../const';
import CustomSelectComponent from '../custom-select/custom-select.component';

function RegisterFormComponent() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<UserGender>(UserGender.Unknown);
  const [birthDate, setBirthDate] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.User);
  const [location, setLocation] = useState<string>('');
  const [isAgreementConfirmed, setIsAgreementConfirmed] = useState<boolean>(true);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const birthDateValue = new Date(birthDate);

    dispatch(registerUser({
      name,
      email,
      password,
      gender,
      birthDate: birthDateValue,
      role,
      location
    }));
  };

  const genderBlock = Object.values(UserGender).map((userGender) => {
    return (
      <div key={userGender} className="custom-toggle-radio__block">
        <label>
          <input
            type="radio"
            name="sex"
            value={userGender}
            onChange={(evt) => setGender(evt.target.value as UserGender)}
            checked={userGender === gender}
          />
          <span className="custom-toggle-radio__icon" />
          <span className="custom-toggle-radio__label">{getFormatTitle(userGender)}</span>
        </label>
      </div>
    )
  });

  const rolesBlock = USER_ROLES.map((userRole) => {
    return (
      <div key={userRole.role} className="role-btn">
        <label>
          <input
            className="visually-hidden"
            type="radio"
            name="role"
            value={userRole.role}
            onChange={(evt) => setRole(evt.target.value as UserRole)}
            checked={userRole.role === role}
          />
          <span className="role-btn__icon">
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-cup"></use>
            </svg>
          </span>
          <span className="role-btn__btn">{userRole.title}</span>
        </label>
      </div>
    )
  });

  return (
    <form method="post" action="#" onSubmit={handleSubmit}>
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <div className="input-load-avatar">
            <label>
              <input className="visually-hidden" type="file" accept="image/png, image/jpeg" />
              <span className="input-load-avatar__btn">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-import"></use>
                </svg>
              </span>
            </label>
          </div>
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
          </div>
        </div>
        <div className="sign-up__data">
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                  required
                />
              </span>
            </label>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">E-mail</span>
              <span className="custom-input__wrapper">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  required
                />
              </span>
            </label>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Дата рождения</span>
              <span className="custom-input__wrapper">
                <input
                  type="date"
                  name="birthday"
                  max="2099-12-31"
                  value={birthDate}
                  onChange={(evt) => setBirthDate(evt.target.value)}
                />
              </span>
            </label>
          </div>
          <CustomSelectComponent
            title={'Ваша локация'}
            currentItem={location}
            items={LOCATIONS}
            setCurrentItem={setLocation}
          />
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Пароль</span>
              <span className="custom-input__wrapper">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
              </span>
            </label>
          </div>
          <div className="sign-up__radio">
            <span className="sign-up__label">Пол</span>
            <div className="custom-toggle-radio custom-toggle-radio--big">
              {genderBlock}
            </div>
          </div>
        </div>
        <div className="sign-up__role">
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            {rolesBlock}
          </div>
        </div>
        <div className="sign-up__checkbox">
          <label>
            <input
              type="checkbox"
              value="user-agreement"
              name="user-agreement"
              onChange={(evt) => setIsAgreementConfirmed(!evt.currentTarget.checked)}
              checked={isAgreementConfirmed}
            />
            <span className="sign-up__checkbox-icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check"></use>
              </svg>
            </span>
            <span className="sign-up__checkbox-label">Я соглашаюсь с
              <span>политикой конфиденциальности</span> компании
            </span>
          </label>
        </div>
        <button className="btn sign-up__button" type="submit" disabled={!isAgreementConfirmed}>Продолжить</button>
      </div>
    </form>
  )
}

export default RegisterFormComponent;
