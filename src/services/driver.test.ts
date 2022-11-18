import { bulkUpload, csvToDriverList } from './driver';
import { validDriverId, validFacturifyId } from '../util/validators';
import axiosInstance from './axios-instance';

jest.mock( './axios-instance');
jest.mock('../util/validators');

describe('bulkUpload', () => {

  it('should return error if empty list', async () => {
    await expect(bulkUpload([])).rejects.toEqual(
      new Error('Empty driver list.')
    );
  });

  it('should call endpoint if data is correct', async () => {
    await bulkUpload([{ driver_id: 1, facturify_id: 'test' }]);
    expect(axiosInstance.post).toHaveBeenCalled();
  });
});

describe('csvToDriverList', () => {
  it('should return an empty list if csv is empty', () => {
    const result = csvToDriverList('');
    expect(result).toEqual([]);
  });

  it('should return an empty list if csv has only headers', () => {
    const result = csvToDriverList('driver_id, facturify_id');
    expect(result).toEqual([]);
  });

  it('should return an empty list if csv has only empty lines', () => {
    const result = csvToDriverList('driver_id, facturify_id\n');
    expect(result).toEqual([]);
  });

  it('should throw an error if invalid driver_id', () => {
    (validDriverId as jest.MockedFn<typeof validDriverId>).mockReturnValue(
      false
    );
    expect(() => {
      csvToDriverList('driver_id,facturify_id\n123,test');
    }).toThrowError(new Error('The csv is not formatted correctly. Invalid driver id 123 or facturify id test'));
  });

  it('should throw an error if invalid facturify_id', () => {
    (validDriverId as jest.MockedFn<typeof validDriverId>).mockReturnValue(
      true
    );
    (
      validFacturifyId as jest.MockedFn<typeof validFacturifyId>
    ).mockReturnValue(false);
    expect(() => {
      csvToDriverList('driver_id,facturify_id\n123,test');
    }).toThrowError(new Error('The csv is not formatted correctly. Invalid driver id 123 or facturify id test'));
  });

  it('should return a list of drivers', () => {
    (validDriverId as jest.MockedFn<typeof validDriverId>).mockReturnValue(
      true
    );
    (
      validFacturifyId as jest.MockedFn<typeof validFacturifyId>
    ).mockReturnValue(true);
    const expected = [
      {
        driver_id: 123,
        facturify_id: '22cff210-a78b-4744-9751-e9c6e55c3108'
      }
    ];
    const result = csvToDriverList(
      'driver_id,facturify_id\n123,22cff210-a78b-4744-9751-e9c6e55c3108'
    );
    expect(result).toEqual(expected);
  });
});
