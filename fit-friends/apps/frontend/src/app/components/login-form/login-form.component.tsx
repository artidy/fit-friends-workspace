import { FormEvent, useState } from 'react';

import { login } from '../../store/user-data/api-actions';
import { useAppDispatch } from '../../hooks';

function LoginFormComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(login({
      email,
      password
    }));
  };

  return (
    <form method="post" action="#" onSubmit={handleSubmit}>
      <div className="sign-in">
        <div className="custom-input sign-in__input">
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
        <div className="custom-input sign-in__input">
          <label>
            <span className="custom-input__label">Пароль</span>
            <span className="custom-input__wrapper">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                required
              />
            </span>
          </label>
        </div>
        <button className="btn sign-in__button" type="submit">Продолжить</button>
      </div>
    </form>
  )
}

export default LoginFormComponent;
