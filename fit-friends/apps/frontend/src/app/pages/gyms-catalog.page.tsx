import { ChangeEvent, useEffect, useState } from 'react';

import HeaderComponent from '../components/header/header.component';
import { AppRoute, FEATURES, LOCATIONS } from '../const';
import { toggleArrayValue } from '../services/helpers';
import CustomToggleCheckboxComponent from '../components/custom-toggle-checkbox/custom-toggle-checkbox.component';
import LoaderComponent from '../components/loader/loader.component';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchGyms } from '../store/gyms-data/api-actions';
import { getGyms, isGymsLoading } from '../store/gyms-data/selectors';
import GymsCatalogItemComponent from '../components/gyms-catalog-item/gyms-catalog-item.component';

function GymsCatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isGymsLoading);
  const gyms = useAppSelector(getGyms);
  const [locations, setLocations] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [isVerified, toggleVerified] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchGyms());
  }, []);

  if (isLoading) {
    return <LoaderComponent />
  }

  const onChangeLocationsHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setLocations(toggleArrayValue(evt.target.value, locations));
  }

  const onChangeFeaturesHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setLocations(toggleArrayValue(evt.target.value, features));
  }

  const onChangeMinPriceHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(+evt.target.value);
  }

  const onChangeMaxPriceHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(+evt.target.value);
  }

  const onChangeVerifiedHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    toggleVerified(evt.target.checked);
  }

  const locationsBlock = LOCATIONS.map((value) => {
    return (
      <li key={value} className="gym-hall-form__check-list-item">
        <CustomToggleCheckboxComponent
          name="gym-location"
          value={value}
          checked={locations.includes(value)}
          onChange={onChangeLocationsHandler}
        />
      </li>
    )
  });

  const featuresBlock = FEATURES.map((value) => {
    return (
      <li key={value} className="gym-hall-form__check-list-item">
        <CustomToggleCheckboxComponent
          name="gym-features"
          value={value}
          checked={features.includes(value)}
          onChange={onChangeFeaturesHandler}
        />
      </li>
    )
  });

  const gymsBlock = gyms.map((gym) => {
    return (
      <li key={gym.id} className="gyms-catalog__item">
        <GymsCatalogItemComponent
          id={gym.id}
          title={gym.title}
          location={gym.location}
          isVerified={gym.isVerified}
          description={gym.description}
        />
      </li>
    )
  })

  return (
    <>
      <HeaderComponent currentPage={AppRoute.Home} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог залов</h1>
              <div className="gym-hall-form">
                <h2 className="visually-hidden">Каталог залов фильтр</h2>
                <div className="gym-hall-form__wrapper">
                  <button className="btn-flat btn-flat--underlined gym-hall-form__btnback" type="button">
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="gym-hall-form__title">Фильтры</h3>
                  <form className="gym-hall-form__form">
                    <div className="gym-hall-form__block">
                      <h4 className="gym-hall-form__block-title gym-hall-form__block-title--price">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input
                            type="number"
                            id="text-min"
                            name="text-min"
                            value={minPrice}
                            onChange={onChangeMinPriceHandler}
                          />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input
                            type="number"
                            id="text-max"
                            name="text-max"
                            value={maxPrice}
                            onChange={onChangeMaxPriceHandler}
                          />
                          <label htmlFor="text-max">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <div className="filter-range__scale">
                          <div className="filter-range__bar">
                            <span className="visually-hidden">Полоса прокрутки</span>
                          </div>
                        </div>
                        <div className="filter-range__control">
                          <button className="filter-range__min-toggle">
                            <span className="visually-hidden">Минимальное значение</span>
                          </button>
                          <button className="filter-range__max-toggle">
                            <span className="visually-hidden">Максимальное значение</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="gym-hall-form__block gym-hall-form__block--location">
                      <h4 className="gym-hall-form__block-title">Локация, станция метро</h4>
                      <ul className="gym-hall-form__check-list">
                        {locationsBlock}
                      </ul>
                      <button className="btn-show-more gym-hall-form__btn-show" type="button">
                        <span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="gym-hall-form__block gym-hall-form__block--addition">
                      <h4 className="gym-hall-form__block-title">Дополнительно</h4>
                      <ul className="gym-hall-form__check-list">
                        {featuresBlock}
                      </ul>
                    </div>
                    <div className="gym-hall-form__block">
                      <h3 className="gym-hall-form__title gym-hall-form__title--status">Статус</h3>
                      <div className="custom-toggle custom-toggle--switch">
                        <label>
                          <input
                            type="checkbox"
                            value="status-1"
                            name="status"
                            onChange={onChangeVerifiedHandler}
                            checked={isVerified}
                          />
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="custom-toggle__label">Только проверенные</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="gyms-catalog">
                <ul className="gyms-catalog__list">
                  {gymsBlock}
                </ul>
                <div className="show-more gyms-catalog__show-more">
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
        </section>
      </main>
    </>
  )
}

export default GymsCatalogPage;
