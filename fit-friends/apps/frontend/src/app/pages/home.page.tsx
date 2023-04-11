import HeaderComponent from '../components/header/header.component';
import SpecialComponent from '../components/special/special.component';
import OffersComponent from '../components/offers/offers.component';
import PopularTrainingsComponents from '../components/popular-trainings/popular-trainings.components';
import LookForCompanyComponent from '../components/look-for-company/look-for-company.component';
import { AppRoute } from '../const';

function HomePage(): JSX.Element {
  return (
    <>
      <HeaderComponent currentPage={AppRoute.Home} />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <section className="special-for-you">
          <div className="container">
            <SpecialComponent />
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
