import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from '../../app/store/root-reducer';
import GymsCatalogPage from '../../app/pages/gyms-catalog.page';

describe('GymsCatalogPage component', () => {
  it('should render without errors', () => {
    const store = createStore(rootReducer);
    const { container } = render(
      <Provider store={store}>
        <GymsCatalogPage />
      </Provider>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
