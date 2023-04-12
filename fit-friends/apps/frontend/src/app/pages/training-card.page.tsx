import { Navigate, useParams } from 'react-router-dom';

import HeaderComponent from '../components/header/header.component';
import { AppRoute } from '../const';
import ReviewComponent from '../components/review/review.component';
import TrainingCardComponent from '../components/training-card/training-card.component';
import { useEffect } from 'react';
import { getTrainingById } from '../store/trainings-data/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCurrentTraining, isTrainingsLoading } from '../store/trainings-data/selectors';
import LoaderComponent from '../components/loader/loader.component';
import { setCurrentTraining } from '../store/trainings-data/trainings-data';

function TrainingCardPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isTrainingsLoading);
  const training = useAppSelector(getCurrentTraining);

  if (!id) {
    return <Navigate to={AppRoute.Home} />
  }

  useEffect(() => {
    dispatch(getTrainingById(id));

    return () => {
      dispatch(setCurrentTraining(null));
    }
  }, [id]);

  if (isLoading) {
    return <LoaderComponent />
  }

  if (!training) {
    return <Navigate to={AppRoute.Home} />
  }

  return (
    <>
      <HeaderComponent currentPage={AppRoute.Home} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button">
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                  <span>Назад</span>
                </button>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  <li className="reviews-side-bar__item">
                    <ReviewComponent />
                  </li>
                </ul>
                <button className="btn btn--medium reviews-side-bar__button" type="button">Оставить отзыв</button>
              </aside>
              <TrainingCardComponent training={training} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default TrainingCardPage;
