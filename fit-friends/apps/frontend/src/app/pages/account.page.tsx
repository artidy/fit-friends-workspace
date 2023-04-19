import HeaderComponent from '../components/header/header.component';
import { AppRoute, UserRole } from '../const';
import UserInfoComponent from '../components/user-info/user-info.component';
import { useAppSelector } from '../hooks';
import { getUser } from '../store/user-data/selectors';
import AccountCoachComponent from '../components/account-coach/account-coach.component';
import AccountUserComponent from '../components/account-user/account-user.component';

function AccountPage(): JSX.Element {
  const user = useAppSelector(getUser);

  if (!user) {
    return <div>Данные не найдены</div>
  }

  let contentBlock = <AccountCoachComponent />

  if (user.role === UserRole.User) {
    contentBlock = <AccountUserComponent />
  }

  return (
    <>
      <HeaderComponent currentPage={AppRoute.Account} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfoComponent />
              <div className="inner-page__content">
                {contentBlock}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default AccountPage;
