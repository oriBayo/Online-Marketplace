import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Rating from '../RatingComp';

describe('RatingComp', () => {
  it('renders rating component with correct stars', () => {
    render(<Rating value={3.5} text='Average Rating' color='#f8e825' />);

    const stars = screen.getAllByTestId('star');
    expect(stars).toHaveLength(5);

    expect(stars[0]).toHaveClass('fa-solid fa-star');
    expect(stars[1]).toHaveClass('fa-solid fa-star');
    expect(stars[2]).toHaveClass('fa-solid fa-star');
    expect(stars[3]).toHaveClass('fa-solid fa-star-half-stroke');
    expect(stars[4]).toHaveClass('fa-regular fa-star');

    expect(screen.getByText('Average Rating')).toBeInTheDocument();
  });

  it('renders rating component with default color if not provided', () => {
    render(<Rating value={4} text='High Rating' />);
    const stars = screen.getAllByTestId('star');
    expect(stars).toHaveLength(5);

    expect(stars[0]).toHaveStyle('color: #f8e825');
  });
});
