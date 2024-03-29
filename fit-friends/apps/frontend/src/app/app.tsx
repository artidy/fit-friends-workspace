import { Route, Routes } from 'react-router-dom';

import { AppRoute } from './const';
import LayoutPage from './pages/layout.page';
import IntroPage from './pages/intro.page';
import SignUpPage from './pages/sign-up.page';
import SignInPage from './pages/sign-in.page';
import QuestionnairePage from './pages/questionnaire.page';
import AccountPage from './pages/account.page';
import HomePage from './pages/home.page';
import TrainingCatalogPage from './pages/training-catalog.page';
import TrainingCardPage from './pages/training-card.page';
import UsersCatalogPage from './pages/users-catalog.page';
import UserCardPage from './pages/user-card.page';
import GymsCatalogPage from './pages/gyms-catalog.page';
import GymCardPage from './pages/gym-card.page';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<LayoutPage />}>
        <Route index element={<IntroPage />} />
        <Route path={AppRoute.SignUp} element={<SignUpPage />} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.Questionnaire} element={<QuestionnairePage />} />
        <Route path={AppRoute.Home} element={<HomePage />} />
        <Route path={AppRoute.Account} element={<AccountPage />} />
        <Route path={AppRoute.Trainings} element={<TrainingCatalogPage />} />
        <Route path={`${AppRoute.Trainings}/:id`} element={<TrainingCardPage />} />
        <Route path={AppRoute.Users} element={<UsersCatalogPage />} />
        <Route path={`${AppRoute.Users}/:id`} element={<UserCardPage />} />
        <Route path={AppRoute.Gyms} element={<GymsCatalogPage />} />
        <Route path={`${AppRoute.Gyms}/:id`} element={<GymCardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
