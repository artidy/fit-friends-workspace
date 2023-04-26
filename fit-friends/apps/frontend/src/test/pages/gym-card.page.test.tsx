import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import GymCardPage from '../../app/pages/gym-card.page';

const mockStore = configureStore([thunk]);

describe('GymCardPage', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      gyms: {
        currentGym: {
          id: '1',
          title: 'Test Gym',
          location: 'Test Location',
          description: 'Test Description',
          isVerified: true,
          price: 100,
          createdAt: '2022-04-26T15:43:00.000Z',
        },
        isLoading: false,
        error: null,
      },
    });
  });

  test('renders GymCardComponent with correct data', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[`/gyms/${store.getState().gyms.currentGym.id}`]}>
        <Provider store={store}>
          <Route path="/gyms/:id">
            <GymCardPage />
          </Route>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Test Gym/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/Проверено/i)).toBeInTheDocument();
    expect(screen.getByText(/26 апреля, 2022/i)).toBeInTheDocument();
  });

  test('renders loader when gyms data is loading', () => {
    store = mockStore({
      gyms: {
        currentGym: null,
        isLoading: true,
        error: null,
      },
    });

    render(
      <MemoryRouter initialEntries={[`/gyms/${store.getState().gyms.currentGym.id}`]}>
        <Provider store={store}>
          <Route path="/gyms/:id">
            <GymCardPage />
          </Route>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    store = mockStore({
      gyms: {
        currentGym: null,
        isLoading: false,
        error: 'Failed to load gym data',
      },
    });

    render(
      <MemoryRouter initialEntries={[`/gyms/${store.getState().gyms.currentGym.id}`]}>
        <Provider store={store}>
          <Route path="/gyms/:id">
            <GymCardPage />
          </Route>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Не найден элемент/i)).toBeInTheDocument();
  });
});
