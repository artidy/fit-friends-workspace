import { ChangeEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderComponent from '../components/header/header.component';
import { AppRoute, PRICE_TYPES, TRAINING_TYPES } from '../const';
import CustomToggleCheckboxComponent from '../components/custom-toggle-checkbox/custom-toggle-checkbox.component';
import TrainingItemComponent from '../components/training-item/training-item.component';
import { getTrainings } from '../store/trainings-data/selectors';
import { useAppSelector } from '../hooks';

function TrainingCatalogPage(): JSX.Element {
  const trainings = useAppSelector(getTrainings);
  const navigate = useNavigate();
  const [types, setTypes] = useState<string[]>([]);
  const [priceType, setPriceType] = useState<string>(PRICE_TYPES[0]);

  const onClickHomePageHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    navigate(AppRoute.Home);
  }

  const onChangeTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    if (types.includes(value)) {
      const idxValue = types.indexOf(value);
      setTypes([...types.slice(0, idxValue), ...types.slice(idxValue + 1)]);

      return;
    }

    setTypes([...types, evt.target.value]);
  }

  const trainingTypesBlock = TRAINING_TYPES.map((value) => {
    return (
      <li key={value} className="gym-catalog-form__check-list-item">
        <CustomToggleCheckboxComponent
          name="type"
          value={value}
          checked={types.includes(value)}
          onChange={onChangeTypeHandler}
        />
      </li>
    )
  })

  const changePriceTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceType(evt.target.value);
  }

  const priceTypesBlock = PRICE_TYPES.map((value) => {
    return (
      <label key={value}>
        <input
          type="radio"
          name="sort"
          value={value}
          onChange={changePriceTypeHandler}
          checked={value === priceType}
        />
        <span className="btn-radio-sort__label">{value}</span>
      </label>
    )
  })

  const trainingsBlock = trainings.map((training) => {
    return (
      <li className="training-catalog__item">
        <TrainingItemComponent key={training.id} training={training} />
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
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
                    type="button"
                    onClick={onClickHomePageHandler}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <form className="gym-catalog-form__form">
                    <div className="gym-catalog-form__block gym-catalog-form__block--price">
                      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input type="number" id="text-min" name="text-min" value="0" />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input type="number" id="text-max" name="text-max" value="3200" />
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
                    <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                      <h4 className="gym-catalog-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input type="number" id="text-min-cal" name="text-min-cal" />
                          <label htmlFor="text-min-cal">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input type="number" id="text-max-cal" name="text-max-cal" />
                          <label htmlFor="text-max-cal">до</label>
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
                    <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                      <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <div className="filter-raiting__scale">
                          <div className="filter-raiting__bar">
                            <span className="visually-hidden">Полоса прокрутки</span>
                          </div>
                        </div>
                        <div className="filter-raiting__control">
                          <button className="filter-raiting__min-toggle">
                            <span className="visually-hidden">Минимальное значение</span>
                          </button>
                          <span>1</span>
                          <button className="filter-raiting__max-toggle">
                            <span className="visually-hidden">Максимальное значение</span>
                          </button>
                          <span>5</span>
                        </div>
                      </div>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--type">
                      <h4 className="gym-catalog-form__block-title">Тип</h4>
                      <ul className="gym-catalog-form__check-list">
                        {trainingTypesBlock}
                      </ul>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
                      <div className="btn-radio-sort gym-catalog-form__radio">
                        {priceTypesBlock}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {trainingsBlock}
                </ul>
                <div className="show-more training-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало
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

export default TrainingCatalogPage;
