import { renderHook, act } from '@testing-library/react-hooks';
import { useQuery } from 'src/components/query/hooks/useQuery';

describe('useQuery hook test', () => {
  test('validates property hooks', () => {
    const { result } = renderHook(useQuery);
    expect(result.current.data).toEqual({
      serviceIds: [],
      rideId: '',
      driverId: '',
      userId: '',
      startDate: '',
      endDate: ''
    });

    expect(result.current.errors).toEqual({
      rideId: {
        hasError: false,
        errorMessage: ''
      },
      driverId: {
        hasError: false,
        errorMessage: ''
      },
      userId: {
        hasError: false,
        errorMessage: ''
      },
      startDate: {
        hasError: true,
        errorMessage: ''
      },
      endDate: {
        hasError: true,
        errorMessage: ''
      }
    });

    expect(typeof result.current.updateData).toBe('function');
    expect(typeof result.current.updateErrors).toBe('function');
  });

  test('updates data property correctly', () => {
    const { result } = renderHook(useQuery);

    act(() => {
      result.current.updateData('driverId', '12');
    });

    expect(result.current.data.driverId).toBe('12');

    act(() => {
      result.current.updateData('rideId', '12');
    });

    expect(result.current.data.rideId).toBe('12');
  });

  test('updates error properties correctly', () => {
    const { result } = renderHook(useQuery);

    act(() => {
      result.current.updateErrors('driverId', true, 'This is an error message');
    });

    expect(result.current.errors.driverId).toEqual({
      hasError: true,
      errorMessage: 'This is an error message'
    });

    act(() => {
      result.current.updateErrors(
        'startDate',
        true,
        'This is another error message'
      );
    });

    expect(result.current.errors.startDate).toEqual({
      hasError: true,
      errorMessage: 'This is another error message'
    });
  });
});
