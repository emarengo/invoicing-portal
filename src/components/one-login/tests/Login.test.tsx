import { render } from '@testing-library/react';
import Login from '../Login';
import { beginAuth } from '../api/oidcApi';

jest.mock('../api/oidcApi', () => ({ beginAuth: jest.fn() }));

test('check if oidcApi have been called in Login', () => {
  render(<Login />);
  expect(beginAuth).toBeCalled();
});
