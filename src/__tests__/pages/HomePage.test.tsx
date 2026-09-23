import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

describe('Homepage', () => {
  it('renders the main hero heading', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', {
      name: /50 % rabatt på din första städning/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
