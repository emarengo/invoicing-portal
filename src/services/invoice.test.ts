import { QueryData } from 'src/models';
import { downloadCsv } from './invoice';

import axiosInstance from './axios-instance';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// jest.mock('./axios-instance.tsx');

describe('invoice service test', () => {
  test('downloadCsv', async () => {
    jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce(() =>
      Promise.reject({
        errors: [
          {
            status: 400,
            title: 'Invalid Request',
            detail: ['end_date is missing']
          }
        ]
      })
    );

    const data: QueryData = {
      startDate: '2022-06-28',
      endDate: '2022-06-29',
      rideId: '',
      driverId: '',
      userId: '',
      serviceIds: []
    };

    await act(async () => {
      try {
        await downloadCsv(data);
      } catch (error) {
        console.log(error);
      }
    });

    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalled();
    });
  });
});
