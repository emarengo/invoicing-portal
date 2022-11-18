import { render, screen } from '@testing-library/react';
import Error from '../Error';

const response = {
  error: 'error',
  error_description: 'error description'
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: response
  })
}));

test('renders error and error description from location', () => {
  render(<Error />);

  const errorText = screen.getByText('error');
  const errorDescriptionText = screen.getByText('error description');

  expect(errorText).toBeInTheDocument();
  expect(errorDescriptionText).toBeInTheDocument();
});
