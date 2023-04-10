import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import HeaderComponent from '../components/header/header.component';
import { getUser } from '../store/user-data/selectors';
import { useAppDispatch, useAppSelector } from '../hooks';
import LoaderComponent from '../components/loader/loader.component';
import { getQuestionnaire, isQuestionnaireLoading } from '../store/questionnaire-data/selectors';
import {
  fetchQuestionnaireCoachById,
  fetchQuestionnaireUserById,
  updateQuestionnaireCoach
} from '../store/questionnaire-data/api-actions';
import { LOCATIONS, TRAINING_TYPES, UserRole } from '../const';
import CustomSelectComponent from '../components/custom-select/custom-select.component';
import BtnCheckboxComponent from '../components/btn-checkbox/btn-checkbox.component';

function AccountPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const profile = useAppSelector(getQuestionnaire);
  const isLoading = useAppSelector(isQuestionnaireLoading);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [name, setName] = useState<string>(user?.name ?? '');
  const [merits, setMerits] = useState<string>(profile.merits ?? '');
  const [isPersonalTraining, setPersonalTraining] = useState<boolean>(profile.isPersonalTraining ?? false);
  const [types, setTypes] = useState<string[]>(profile.types);
  const [level, setLevel] = useState<string>(profile.level);
  const [location, setLocation] = useState<string>(user?.location ?? '');

  useEffect(() => {
    if (user?.role === UserRole.Coach) {
      dispatch(fetchQuestionnaireCoachById(user?.id ?? ''));
    }

    if (user?.role === UserRole.User) {
      dispatch(fetchQuestionnaireUserById(user?.id ?? ''));
    }
  }, []);

  if (!user || isLoading) {
    return <LoaderComponent />
  }

  const onSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (readOnly) {
      setReadOnly(false);

      return;
    }

    dispatch(updateQuestionnaireCoach({
      id: '',
      isPersonalTraining,
      level,
      merits,
      types,
      userId: user.id
    }));

    setReadOnly(true);
  }

  const changeTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const valueIndex = types.indexOf(value);

    if (valueIndex === -1) {
      setTypes([...types, value]);

      return;
    }

    setTypes([...types.slice(0, valueIndex), ...types.slice(valueIndex + 1)]);
  }

  const checkboxesBlock = TRAINING_TYPES.map((type) => {
    return <BtnCheckboxComponent
      key={type}
      value={type}
      name="specialisation"
      values={types}
      onChange={changeTypeHandler}
    />
  });

  return (
    <>
      <HeaderComponent />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div className="user-info-edit__header">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        className="visually-hidden"
                        type="file"
                        name="user-photo-1"
                        accept="image/png, image/jpeg"
                        readOnly={readOnly}
                      />
                      <span className="input-load-avatar__avatar">
                        <img
                          src={user.avatar}
                          width="98"
                          height="98"
                          alt="user photo"
                        />
                      </span>
                    </label>
                  </div>
                  <div className="user-info-edit__controls">
                    <button className="user-info-edit__control-btn" aria-label="обновить">
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-change"></use>
                      </svg>
                    </button>
                    <button className="user-info-edit__control-btn" aria-label="удалить">
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <form className="user-info-edit__form" action="#" method="post" onSubmit={onSubmitHandler}>
                  <button
                    className="btn-flat btn-flat--underlined user-info-edit__save-button"
                    type="submit"
                    aria-label="Сохранить"
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span>Сохранить</span>
                  </button>
                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title">Обо мне</h2>
                    <div className="custom-input user-info-edit__input">
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(evt) => setName(evt.target.value)}
                            readOnly={readOnly}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="custom-textarea user-info-edit__textarea">
                      <label>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          name="description"
                          placeholder=""
                          value={merits}
                          onChange={(evt) => setMerits(evt.target.value)}
                          readOnly={readOnly}
                        >
                          {merits}
                        </textarea>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section user-info-edit__section--status">
                    <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
                    <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
                      <label>
                        <input
                          type="checkbox"
                          name="ready-for-training"
                          onChange={(evt) => setPersonalTraining(evt.target.checked)}
                          checked={isPersonalTraining}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">Готов тренировать</span>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
                    <div className="specialization-checkbox user-info-edit__specialization">
                      {checkboxesBlock}
                    </div>
                  </div>
                  <div className="custom-select user-info-edit__select">
                    <CustomSelectComponent
                      title={'Локация'}
                      currentItem={location}
                      items={LOCATIONS}
                      setCurrentItem={setLocation}
                    />
                  </div>
                  <div className="custom-select user-info-edit__select"><span
                    className="custom-select__label">Пол</span>
                    <div className="custom-select__placeholder">Женский</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul>
                  </div>
                  <div className="custom-select user-info-edit__select"><span
                    className="custom-select__label">Уровень</span>
                    <div className="custom-select__placeholder">Профессионал</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation"><a
                    className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-flash"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои тренировки</span></a><a
                    className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-add"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Создать тренировку</span></a><a
                    className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-friends"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои друзья</span></a><a
                    className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-bag"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои заказы</span></a>
                    <div className="personal-account-coach__calendar"></div>
                  </div>
                  <div className="personal-account-coach__additional-info">
                    <div className="personal-account-coach__label-wrapper">
                      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
                      <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-import"></use>
                        </svg>
                        <span>Загрузить</span>
                      </button>
                      <div className="personal-account-coach__controls">
                        <button className="btn-icon personal-account-coach__control" type="button"
                                aria-label="previous">
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-left"></use>
                          </svg>
                        </button>
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-right"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ul className="personal-account-coach__list">

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default AccountPage;
