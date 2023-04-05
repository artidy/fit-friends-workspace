import { Route, Routes } from 'react-router-dom';

import { AppRoute } from './const';
import LayoutPage from './pages/layout-page';
import IntroPage from './pages/intro-page';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<LayoutPage />}>
        <Route index element={<IntroPage />} />
      </Route>
    </Routes>
  );
}

export default App;
