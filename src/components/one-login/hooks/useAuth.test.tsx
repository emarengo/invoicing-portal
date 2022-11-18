import { useAuthValue } from './useAuth';
import { act, renderHook } from '@testing-library/react';

describe('authenthication hooks testing cases', () => {
  it('authed changes to true after login', () => {
    const { result } = renderHook(useAuthValue);

    act(() => {
      result.current.login('token', 60);
    });
    expect(result.current.authed).toBe(true);
  });
  it('authed changes to false after logout', () => {
    const { result } = renderHook(useAuthValue);

    act(() => {
      result.current.logout();
    });
    expect(result.current.authed).toBe(false);
  });
});
