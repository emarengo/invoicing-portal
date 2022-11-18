import {
  fireEvent,
  render,
  RenderResult,
  screen
} from '@testing-library/react';
import { AxiosRequestConfig } from 'axios';
import axiosInstance from 'src/services/axios-instance';
import { InvoiceService } from 'src/services/invoice';

import QueryPage from './QueryPage';

describe('QueryScreen test', () => {
  let component: RenderResult;

  const setup = () => (component = render(<QueryPage />));

  afterEach(() => {
    jest.clearAllMocks();
    component.unmount();
  });

  test('renders the components correctly', () => {
    setup();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Ride Start Date')).toBeInTheDocument();
    expect(screen.getByText('Ride End Date')).toBeInTheDocument();
    expect(screen.getByText('Passenger ID')).toBeInTheDocument();
    expect(screen.getByText('Ride ID')).toBeInTheDocument();
    expect(screen.getByText('Driver ID')).toBeInTheDocument();
  });

  test('button disabled when dates are empty', () => {
    const { getByTestId } = setup();
    const downloadButton = getByTestId('downloadButton') as HTMLButtonElement;

    expect(downloadButton).toBeDisabled();
  });

  test('button is not disabled when both dates are not empty', async () => {
    const { getByTestId } = setup();

    const startDateInput = getByTestId('startDate') as HTMLInputElement;
    const endDateInput = getByTestId('endDate') as HTMLInputElement;

    fireEvent.change(startDateInput, { target: { value: '2022-06-28' } });
    fireEvent.change(endDateInput, { target: { value: '2022-07-01' } });

    fireEvent.focusOut(endDateInput);

    expect(startDateInput.value).toBe('2022-06-28');
    expect(endDateInput.value).toBe('2022-07-01');

    fireEvent.focus(getByTestId('rideId'));

    expect(getByTestId('downloadButton')).not.toBeDisabled();
  });
  test('button is not disabled when entering text to the inputs', () => {
    const { getByTestId } = setup();
    const rideIdInput = getByTestId('rideId');
    const driverIdInput = getByTestId('driverId');
    const passengerIdInput = getByTestId('userId');

    const startDateInput = getByTestId('startDate') as HTMLInputElement;
    const endDateInput = getByTestId('endDate') as HTMLInputElement;

    fireEvent.change(startDateInput, { target: { value: '2022-06-28' } });
    fireEvent.change(endDateInput, { target: { value: '2022-07-01' } });

    fireEvent.change(rideIdInput, { target: { value: '1' } });
    fireEvent.change(driverIdInput, { target: { value: '2' } });
    fireEvent.change(passengerIdInput, { target: { value: '3' } });

    expect(getByTestId('downloadButton')).not.toBeDisabled();
  });
  test('download button disabled when one of both inputs required are empty', () => {
    const { getByTestId } = setup();

    const startDateInput = getByTestId('startDate') as HTMLInputElement;

    fireEvent.change(startDateInput, { target: { value: '2022-06-28' } });
    fireEvent.change(getByTestId('endDate'), {
      target: { value: '2022-06-25' }
    });
    fireEvent.focusOut(startDateInput);

    expect(getByTestId('downloadButton')).toBeDisabled();
  });

  test('calls "downloadCsv" function and returns no errors', async () => {
    const spyAxiosInstance = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementation(
        (url: string, config: AxiosRequestConfig | undefined) => {
          const { params } = config as AxiosRequestConfig;

          const startDate = params.get('start_date');
          const endDate = params.get('end_date');

          const errorMessages: Array<string> = [];
          if (!startDate) errorMessages.push('start_date is missing');
          if (!endDate) errorMessages.push('end_date is missing');

          if (errorMessages.length > 0)
            return Promise.resolve({
              errors: [
                {
                  status: '400',
                  title: 'Invalid Request',
                  detail: errorMessages
                }
              ]
            });
          return Promise.resolve({ status: '200' });
        }
      );
    const spyDownloadCsv = jest.spyOn(InvoiceService, 'downloadCsv');

    const { getByTestId } = setup();

    const startDateInput = getByTestId('startDate') as HTMLInputElement;
    const endDateInput = getByTestId('endDate') as HTMLInputElement;

    fireEvent.change(startDateInput, { target: { value: '2022-06-28' } });
    fireEvent.change(endDateInput, { target: { value: '2022-07-01' } });

    fireEvent.focusOut(endDateInput);
    fireEvent.focus(getByTestId('rideId'));

    fireEvent.click(getByTestId('downloadButton'));

    const result = await spyAxiosInstance.mock.results[0].value;

    expect(spyDownloadCsv).toHaveBeenCalledTimes(1);
    expect(spyAxiosInstance).toHaveBeenCalledTimes(1);
    expect(result).not.toHaveProperty('errors');
  });
});
