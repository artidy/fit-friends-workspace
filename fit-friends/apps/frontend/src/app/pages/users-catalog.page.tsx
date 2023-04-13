import { ChangeEvent, useEffect, useState } from 'react';

import HeaderComponent from '../components/header/header.component';
import { AppRoute, LOCATIONS, TRAINING_LEVELS, TRAINING_TYPES, USER_TYPES } from '../const';
import CustomToggleCheckboxComponent from '../components/custom-toggle-checkbox/custom-toggle-checkbox.component';
import { toggleArrayValue } from '../services/helpers';
import CustomToggleRadioComponent from '../components/custom-toggle-radio/custom-toggle-radio.component';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getApiUsers } from '../store/user-data/api-actions';
import { getUsers, IsUsersLoading } from '../store/user-data/selectors';
import LoaderComponent from '../components/loader/loader.component';
import UsersCatalogItem from '../components/users-catalog-item/users-catalog-item';

function UsersCatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isUsersLoading = useAppSelector(IsUsersLoading);
  const users = useAppSelector(getUsers);
  const [locations, setLocations] = useState<string[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [level, setLevel] = useState<string>('');
  const [type, setType] = useState<string>('');

  useEffect(() => {
    dispatch(getApiUsers());
  }, []);

  if (isUsersLoading) {
    return <LoaderComponent />
  }

  const onChangeLocationsHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setLocations(toggleArrayValue(evt.target.value, locations));
  }

  const onChangeSpecializationsHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setSpecializations(toggleArrayValue(evt.target.value, specializations));
  }

  const onChangeLevelHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setLevel(evt.target.value);
  }

  const onChangeTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setType(evt.target.value);
  }

  const locationsBlock = LOCATIONS.map((value) => {
    return (
      <li key={value} className="user-catalog-form__check-list-item">
        <CustomToggleCheckboxComponent
          name="user-location"
          value={value}
          checked={locations.includes(value)}
          onChange={onChangeLocationsHandler}
        />
      </li>
    )
  });

  const specializationBlock = TRAINING_TYPES.map((value) => {
    return (
      <li key={value} className="user-catalog-form__check-list-item">
        <CustomToggleCheckboxComponent
          name="spezialization"
          value={value}
          checked={specializations.includes(value)}
          onChange={onChangeSpecializationsHandler}
        />
      </li>
    )
  });

  const levelsBlock = TRAINING_LEVELS.map((value) => {
    return <CustomToggleRadioComponent
      key={value}
      name="user-level"
      value={value}
      checked={value === level}
      onChangeHandler={onChangeLevelHandler}
    />
  });

  const typesBlock = USER_TYPES.map((value) => {
    return (
      <label key={value}>
        <input
          type="radio"
          value={value}
          name="sort"
          onChange={onChangeTypeHandler}
          checked={value === type}
        />
        <span className="btn-radio-sort__label">{value}</span>
      </label>
    )
  });

  const usersBlock = users.map((user) => {
    return (
      <li key={user.id} className="users-catalog__item">
        <UsersCatalogItem
          id={user.id}
          name={user.name}
          location={user.location}
        />
      </li>
    )
  });

  return (
    <>
      <HeaderComponent currentPage={AppRoute.Home} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <button className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button">
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <form className="user-catalog-form__form">
                    <div className="user-catalog-form__block user-catalog-form__block--location">
                      <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
                      <ul className="user-catalog-form__check-list">
                        {locationsBlock}
                      </ul>
                      <button className="btn-show-more user-catalog-form__btn-show" type="button">
                        <span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                      <h4 className="user-catalog-form__block-title">Специализация</h4>
                      <ul className="user-catalog-form__check-list">
                        {specializationBlock}
                      </ul>
                      <button className="btn-show-more user-catalog-form__btn-show" type="button">
                        <span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--level">
                      <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
                      <div className="custom-toggle-radio">
                        {levelsBlock}
                      </div>
                    </div>
                    <div className="user-catalog-form__block">
                      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                      <div className="btn-radio-sort">
                        {typesBlock}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {usersBlock}
                  </ul>
                  <div className="show-more users-catalog__show-more">
                    <button className="btn show-more__button show-more__button--more" type="button">
                      Показать еще
                    </button>
                    <button className="btn show-more__button show-more__button--to-top" type="button">
                      Вернуться в начало
                    </button>
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

export default UsersCatalogPage;
