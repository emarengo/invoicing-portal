interface QueryError {
  rideId: {
    hasError: boolean;
    errorMessage: string;
  };
  driverId: {
    hasError: boolean;
    errorMessage: string;
  };
  userId: {
    hasError: boolean;
    errorMessage: string;
  };
  startDate: {
    hasError: boolean;
    errorMessage: string;
  };
  endDate: {
    hasError: boolean;
    errorMessage: string;
  };
}

export default QueryError;