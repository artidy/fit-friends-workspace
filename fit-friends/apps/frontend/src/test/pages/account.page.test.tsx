import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Store, AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import AccountPage from '../../app/pages/account.page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AccountPage component', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      userData: {
        user: {
          role: 'coach'
        }
      }
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <AccountPage />
        </Provider>
    );

    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });

  it('renders AccountCoachComponent if user role is coach', () => {
    render(
      <Provider store={store}>
        <AccountPage />
        </Provider>
    );

    expect(screen.getByTestId('account-coach-component')).toBeInTheDocument();
  });

  it('renders AccountUserComponent if user role is user', () => {
    store = mockStore({
      userData: {
        user: {
          role: 'user'
        }
      }
    });

    render(
      <Provider store={store}>
        <AccountPage />
      </Provider>
    );

    expect(screen.getByTestId('account-user-component')).toBeInTheDocument();
  });
});
