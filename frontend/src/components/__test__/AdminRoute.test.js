import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for more assertions
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store'; // You might need to install this package

import AdminRoute from '../AdminRoute';

describe('AdminRoute', () => {
  const mockStore = configureStore();

  it('render child route when user is admin', () => {
    const initialState = {
      users: {
        userInfo: {
          isAdmin: true,
        },
      },
    };
    const store = mockStore(initialState);
    const { container } = render(
      <Provider store={store}>
        <Router>
          <AdminRoute />
        </Router>
      </Provider>
    );

    expect(
      container.querySelector('.admin-specific-element')
    ).toBeInTheDocument();
  });
});
