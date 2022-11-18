import axios from 'axios';
import { beginAuth } from '../components/one-login/api/oidcApi';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return beginAuth();
    }
    return Promise.reject(error);
  }
);

export function setAPIToken(token: string) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
