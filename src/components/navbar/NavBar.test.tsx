import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

test('Link to upload UUID page', () => {
  const history = createMemoryHistory();
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  userEvent.click(screen.getByText('Upload UUIDs'));
  expect(history.location.pathname).toBe('/');
});
