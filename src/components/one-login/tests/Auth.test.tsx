import { render, screen } from '@testing-library/react';
import Auth from '../Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe('testing scenarios for the Auth compononent', () => {
  test('auth redirects to unauthorized error when accessed without response hash', () => {
    const AErrorComponent = () => <div>AErrorComponent</div>;

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/error" element={<AErrorComponent />}></Route>
          <Route path="/" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    );
    const AErrorComponentText = screen.getByText('AErrorComponent');

    expect(AErrorComponentText).toBeInTheDocument();
  });
  
});
