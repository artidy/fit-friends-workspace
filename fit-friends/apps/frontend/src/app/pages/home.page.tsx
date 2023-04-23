import { Navigate } from 'react-router-dom';

import HeaderComponent from '../components/header/header.component';
import SpecialComponent from '../components/special/special.component';
import OffersComponent from '../components/offers/offers.component';
import PopularTrainingsComponents from '../components/popular-trainings/popular-trainings.components';
import LookForCompanyComponent from '../components/look-for-company/look-for-company.component';
import { AppRoute, UserRole } from '../const';
import { useAppSelector } from '../hooks';
import { getIsUnknown, getUser } from '../store/user-data/selectors';
import { getQuestionnaire } from '../store/questionnaire-data/selectors';
import LoaderComponent from '../components/loader/loader.component';

function HomePage(): JSX.Element {
  const user = useAppSelector(getUser);
  const isLoading = useAppSelector(getIsUnknown);
  const userProfile = useAppSelector(getQuestionnaire);

  if (isLoading) {
    return <LoaderComponent />
  }

  if (!user) {
    return <Navigate to={AppRoute.Main} />
  }

  if (user.role === UserRole.Coach) {
    return <Navigate to={AppRoute.Account} />
  }

  return (
    <>
      <HeaderComponent currentPage={AppRoute.Home} />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <section className="special-for-you">
          <div className="container">
            <SpecialComponent level={userProfile.level} types={userProfile.types} />
          </div>
        </section>
        <section className="special-offers">
          <div className="container">
            <OffersComponent />
          </div>
        </section>
        <section className="popular-trainings">
          <div className="container">
            <PopularTrainingsComponents />
          </div>
        </section>
        <section className="look-for-company">
          <div className="container">
            <LookForCompanyComponent />
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage;
