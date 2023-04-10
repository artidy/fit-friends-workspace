import { Route, Routes } from 'react-router-dom';

import { AppRoute } from './const';
import LayoutPage from './pages/layout.page';
import IntroPage from './pages/intro.page';
import SignUpPage from './pages/sign-up.page';
import SignInPage from './pages/sign-in.page';
import QuestionnairePage from './pages/questionnaire.page';
import AccountPage from './pages/account.page';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<LayoutPage />}>
        <Route index element={<IntroPage />} />
        <Route path={AppRoute.SignUp} element={<SignUpPage />} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.Questionnaire} element={<QuestionnairePage />} />
        <Route path={AppRoute.Account} element={<AccountPage />} />
      </Route>
    </Routes>
  );
}

export default App;
