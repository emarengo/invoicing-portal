import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

describe('tests for the protected route component', () => {
  test('renders AComponent because of redirection to /login', () => {
    const AComponent = () => <div>AComponent</div>;
    const ProtectedComponent = () => <div>ProtectedComponent</div>;

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AComponent />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute redirectTo="/login">
                <ProtectedComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
    const AComponentText = screen.getByText('AComponent');

    expect(AComponentText).toBeInTheDocument();
  });
});
