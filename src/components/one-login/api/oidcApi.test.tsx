import { beginAuth } from './oidcApi';

jest.mock('nanoid', () => ({
  nanoid: () => {
    return '123';
  }
}));
const mockResponse = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse
    },
    assign: mockResponse
  },
  writable: true
});
test('expect windows.location.assign to be called', () => {
  window.location.assign = jest.fn();

  beginAuth();
  expect(window.location.assign).toBeCalledTimes(1);
});
