import React from 'react';
import { QueryData, QueryError } from 'src/models';

export const useQuery = () => {
  const [data, setData] = React.useState<QueryData>({
    serviceIds: [],
    rideId: '',
    driverId: '',
    userId: '',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = React.useState<QueryError>({
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

  const updateData = (name: string, value: string | string[]) =>
    setData({ ...data, [name]: value });

  const updateErrors = (name: string, error: boolean, message: string) =>
    setErrors({
      ...errors,
      [name]: { errorMessage: message, hasError: error }
    });

  return {
    data,
    errors,
    updateData,
    updateErrors
  };
};
