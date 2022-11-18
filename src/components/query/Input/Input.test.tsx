import Input from './Input';

import { fireEvent, render, RenderResult } from '@testing-library/react';

describe('Input test', () => {
  describe('Ride input test', () => {
    const rideInputProps = {
      type: 'text',
      pattern: '[1-9]\\d+',
      inputTitle: 'Ride ID',
      name: 'rideId',
      errors: {
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
          hasError: false,
          errorMessage: ''
        },
        endDate: {
          hasError: false,
          errorMessage: ''
        }
      },
      updateData: jest.fn(),
      updateErrors: jest.fn()
    };

    let component: RenderResult;

    const setup = () => (component = render(<Input {...rideInputProps} />));

    afterEach(() => {
      jest.clearAllMocks();
      component.unmount();
    });

    test('renders the component correctly', () => {
      const { getByTestId, getByText } = setup();
      expect(getByText('Ride ID')).toBeInTheDocument();
      expect(getByTestId('rideId')).toBeInTheDocument();
    });

    test('ride input is a numeric input and does not have an initial value', () => {
      const { getByTestId } = setup();
      const rideInput = getByTestId('rideId') as HTMLInputElement;
      expect(rideInput).not.toBeNull();
      expect(rideInput).toHaveProperty('type', 'text');

      expect(rideInput.value).toBe('');
    });

    test('calls "handleTextChange" function when changing the value 1', () => {
      const { getByTestId } = setup();
      const rideInput = getByTestId('rideId');

      fireEvent.change(rideInput, { target: { value: '33' } });

      expect(rideInputProps.updateData).toBeCalledTimes(1);
      expect(rideInputProps.updateData).toBeCalledWith('rideId', '33');
    });

    test('calls "handleTextChange" function when changing the value 2', () => {
      const { getByTestId } = setup();
      const rideInput = getByTestId('rideId');

      fireEvent.change(rideInput, { target: { value: 'este es un texto' } });
      fireEvent.blur(rideInput);

      expect(rideInputProps.updateData).toBeCalledTimes(1);
      expect(rideInputProps.updateErrors).toBeCalledWith(
        'rideId',
        true,
        'Only numbers are allowed'
      );
    });
  });
});
