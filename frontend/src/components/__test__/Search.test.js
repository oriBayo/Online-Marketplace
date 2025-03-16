import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from '../SearchComp';

const MockSearchComponent = () => {
  return (
    <Router>
      <Search />
    </Router>
  );
};

describe('SearchComp', () => {
  it('renders search component with input field and button', () => {
    render(<MockSearchComponent />);

    const inputField = screen.getByPlaceholderText('Search');
    expect(inputField).toBeInTheDocument();

    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });

  it('redirect to correct URL when search button is clicked', () => {
    render(<MockSearchComponent />);
    const inputField = screen.getByPlaceholderText('Search');
    fireEvent.change(inputField, { target: { value: 'test' } });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(window.location.pathname).toBe('/products/search/test');
  });

  it('redirect to /product when search button clicked with empty keyword', () => {
    render(<MockSearchComponent />);
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(window.location.pathname).toBe('/products');
  });
});
