import DatePicker from './DatePicker';

import { fireEvent, render, RenderResult } from '@testing-library/react';

describe('DatePicker test', () => {
  const datePickerProps = {
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

  const setup = () => (component = render(<DatePicker {...datePickerProps} />));

  afterEach(() => {
    jest.clearAllMocks();
    component.unmount();
  });

  test('renders the component correctly', () => {
    const { getByText, getByTestId } = setup();
    expect(getByText('Ride Start Date')).toBeInTheDocument();
    expect(getByText('Ride End Date')).toBeInTheDocument();
    expect(getByTestId('startDate')).toBeInTheDocument();
    expect(getByTestId('endDate')).toBeInTheDocument();
  });

  test('both inputs do not have a date set by default and the font color is white', () => {
    const { getByTestId } = setup();

    const startDateInput = getByTestId('startDate') as HTMLInputElement;
    const endDateInput = getByTestId('endDate') as HTMLInputElement;

    expect(startDateInput).not.toBeNull();
    expect(startDateInput).toHaveAttribute('type', 'date');
    expect(startDateInput).toHaveStyle({ color: 'rgb(255, 255, 255);' });
    expect(startDateInput?.value).toBe('');

    expect(endDateInput).not.toBeNull();
    expect(endDateInput).toHaveAttribute('type', 'date');
    expect(endDateInput).toHaveStyle({ color: 'rgb(255, 255, 255);' });
    expect(endDateInput?.value).toBe('');
  });

  test('shows the error label and hides it when there is no error', () => {
    const { getByTestId, queryByText } = setup();

    const startDateInput = getByTestId('startDate') as HTMLInputElement;
    const endDateInput = getByTestId('endDate') as HTMLInputElement;

    fireEvent.change(startDateInput, { target: { value: '2022-07-17' } });
    fireEvent.change(endDateInput, { target: { value: '2022-06-17' } });

    expect(
      queryByText(/Start date can't be greater than end date/)
    ).not.toBeNull();

    fireEvent.change(endDateInput, { target: { value: '2022-08-17' } });

    expect(queryByText(/Start date can't be greater than end date/)).toBeNull();
  });

  test('calls the "updateQueryDataDates" function when changing the date on an input', () => {
    const { getByTestId } = setup();

    const startDateInput = getByTestId('startDate') as HTMLInputElement;
    const endDateInput = getByTestId('endDate') as HTMLInputElement;

    fireEvent.change(startDateInput, { target: { value: '2022-06-17' } });

    expect(datePickerProps.updateData).toHaveBeenCalledWith(
      'startDate',
      '2022-06-17'
    );

    fireEvent.change(endDateInput, { target: { value: '2022-06-18' } });
    expect(datePickerProps.updateData).toHaveBeenCalledWith(
      'endDate',
      '2022-06-18'
    );

    expect(startDateInput.value).toBe('2022-06-17');
    expect(endDateInput.value).toBe('2022-06-18');

    expect(datePickerProps.updateData).toHaveBeenCalledTimes(2);
  });
});
