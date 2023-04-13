import HeaderComponent from '../components/header/header.component';
import { AppRoute, UserRole } from '../const';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getApiCurrentUser } from '../store/user-data/api-actions';
import { getCurrentUser, IsUsersLoading } from '../store/user-data/selectors';
import LoaderComponent from '../components/loader/loader.component';
import CoachCardComponent from '../components/coach-card/coach-card.component';
import UserCardComponent from '../components/user-card/user-card.component';

function UserCardPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser);
  const isLoading = useAppSelector(IsUsersLoading);

  if (!id) {
    return <Navigate to={AppRoute.Home} />
  }

  useEffect(() => {
    dispatch(getApiCurrentUser(id));
  }, []);

  if (isLoading) {
    return <LoaderComponent />
  }

  if (!user) {
    return <div>Страница не найдена</div>
  }

  const userBlock = user?.role === UserRole.Coach ?
    <CoachCardComponent name={user.name} location={user.location} isReady={true} /> :
    <UserCardComponent name={user.name} location={user.location} isReady={true} />

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
                {userBlock}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default UserCardPage;
