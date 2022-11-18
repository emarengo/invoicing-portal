import { BulkResponse, Driver } from '../models/driver';
import { ApiResponse } from '../models/api-response';
import { validDriverId, validFacturifyId } from '../util/validators';
import axiosInstance from './axios-instance';
import { AxiosResponse } from 'axios';

export function bulkUpload(
  data: Driver[]
): Promise<AxiosResponse<ApiResponse<BulkResponse>>> {
  if (!data.length) {
    return Promise.reject(new Error('Empty driver list.'));
  }
  return axiosInstance.post('/driver/bulk', data);
}

export function csvToDriverList(csv: string): Driver[] {
  const result: Driver[] = [];
  const text = csv.split(/\r?\n/);
  text.forEach((record: string, index: number) => {
    if (index === 0 || !record) return; // Omit headers and empty lines
    const [driver_id, facturify_id] = record.split(',');
    if (!validDriverId(driver_id) || !validFacturifyId(facturify_id)) {
      throw new Error(
        `The csv is not formatted correctly. Invalid driver id ${driver_id} or facturify id ${facturify_id}`
      );
    }
    result.push({
      driver_id: +driver_id,
      facturify_id
    });
  });
  return result;
}
