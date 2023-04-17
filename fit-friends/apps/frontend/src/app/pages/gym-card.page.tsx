import HeaderComponent from '../components/header/header.component';
import { AppRoute } from '../const';
import GymCardComponent from '../components/gym-card/gym-card.component';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getGymById } from '../store/gyms-data/api-actions';
import { getCurrentGym, isGymsLoading } from '../store/gyms-data/selectors';
import LoaderComponent from '../components/loader/loader.component';

function GymCardPage(): JSX.Element {
  const {id: gymId} = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isGymsLoading);
  const gym = useAppSelector(getCurrentGym);

  if (!gymId) {
    return <div>Не найден элемент</div>
  }

  useEffect(() => {
    dispatch(getGymById(gymId));
  }, []);

  if (isLoading) {
    return <LoaderComponent />
  }

  if (!gym) {
    return <div>Не найден элемент</div>
  }

  const {
    id,
    location,
    title,
    description,
    isVerified,
    price,
    createdAt
  } = gym;

  return (
    <>
      <HeaderComponent currentPage={AppRoute.Home} />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                <GymCardComponent
                  id={id}
                  title={title}
                  location={location}
                  description={description}
                  isVerified={isVerified}
                  price={price}
                  createdAt={createdAt}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default GymCardPage;
