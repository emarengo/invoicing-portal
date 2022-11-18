import { QueryData } from 'src/models';

export const inputNumberPattern = '^[0-9]*$';

export const validatePattern = (text: string, pattern: string): boolean =>
  new RegExp(pattern).test(text);

export const getMaxDate = (startDate: string | null) => {
  if (startDate) {
    const selectedDate = new Date(startDate);
    const maxDateUnix = selectedDate.setMonth(selectedDate.getMonth() + 3);

    const maxDate = new Date(maxDateUnix).toISOString().split('T')[0];
    return maxDate;
  }
  return '';
};

export const getMinDate = (dateInput: HTMLInputElement | null) => {
  if (dateInput) return dateInput.value;
  else return '';
};

export const fieldsPassedValidation = (data: QueryData): boolean => {
  const internalData = {
    rideId: data.rideId,
    driverId: data.driverId,
    userId: data.userId,
    startDate: data.startDate,
    endDate: data.endDate
  };

  if (Date.parse(internalData.startDate) > Date.parse(internalData.endDate))
    return false;

  for (const [key, value] of Object.entries(internalData)) {
    if (key === 'startDate' || key === 'endDate') {
      if (!value) return false;
    } else if (value) {
      if (!validatePattern(value, inputNumberPattern)) return false;
    }
  }

  return true;
};
