import { QueryData } from 'src/models';
import axiosInstance from './axios-instance';

export const downloadCsv = async (data: QueryData) => {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    const keyArray = key.split(/(?=[A-Z])/);
    const newKey = keyArray[0].concat('_', keyArray[1].toLowerCase());

    if (typeof value === 'object' && value.length > 0) {
      queryParams.append(newKey, value);
    } else if (typeof value !== 'object' && value) {
      queryParams.append(newKey, value);
    }
  }

  const res = await axiosInstance.get('/invoice-request/csv/', {
    responseType: 'blob',
    params: queryParams,
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.style.display = 'none';
  link.setAttribute('download', 'invoices.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const InvoiceService = {
  downloadCsv
};
