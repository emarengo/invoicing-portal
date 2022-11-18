import { QueryData } from 'src/models';
import {
  fieldsPassedValidation,
  getMaxDate,
  getMinDate,
  validatePattern
} from './';

describe('index test file', () => {
  describe('validatePattern', () => {
    test('should return true if text matches pattern', () => {
      expect(validatePattern('texto', '([a-z])+')).toBe(true);
    });

    test('should return false if text does not match pattern', () => {
      expect(validatePattern('123', '([a-z])+')).toBe(false);
    });
  });

  describe('getMaxDate', () => {
    const input: HTMLInputElement = document.createElement('input');

    input.value = '2022-06-28';
    const maxDate = getMaxDate(input.value);

    test('should return the max date', () => {
      expect(maxDate).not.toBeUndefined();
      expect(typeof maxDate).toBe('string');
    });

    test('should be greater than the startDate', () => {
      expect(new Date(maxDate as string).getMonth()).toBeGreaterThan(
        new Date(input.value).getMonth()
      );
    });

    test('should return undefined', () => {
      input.value = '';
      const undefinedMaxDate = getMaxDate(input.value);

      expect(undefinedMaxDate).toBe('');
    });
  });

  describe('getMinDate', () => {
    const input = document.createElement('input');

    input.type = 'date';
    input.value = '2022-06-08';

    const minDate = getMinDate(input);

    test('should return the min date', () => {
      expect(minDate).not.toBeUndefined();
      expect(typeof minDate).toBe('string');
    });

    test('should be equal to the start date', () => {
      expect(minDate).toEqual(input.value);
    });

    test('should return undefined', () => {
      const undefinedMinDate = getMinDate(null);
      expect(undefinedMinDate).toBe('');
    });
  });

  describe('fieldsPassedValidation', () => {
    const data: QueryData = {
      serviceIds: [],
      rideId: '',
      driverId: '',
      userId: '',
      startDate: '',
      endDate: ''
    };

    afterEach(() => {
      data.serviceIds = [];
      data.rideId = '';
      data.driverId = '';
      data.userId = '';
      data.startDate = '';
      data.endDate = '';
    });

    test('it should return true when both startDate and endDate have a value', () => {
      data.startDate = '2022-06-28';
      data.endDate = '2022-06-30';

      expect(fieldsPassedValidation(data)).toBe(true);
    });
  });
});
