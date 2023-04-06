import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { getToken } from './token';
import { DEFAULT_REQUEST_TIMEOUT } from '../const';
import { setToDefault } from '../store/user-data/user-data';
import { store } from '../store';

const BACKEND_URL = process.env.NX_BACKEND_URL;
const REQUEST_TIMEOUT = Number(process.env.NX_REQUEST_TIMEOUT) ?? DEFAULT_REQUEST_TIMEOUT;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    config.headers = config.headers ?? {};
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === 401) {
        store.dispatch(setToDefault());
      }

      return Promise.reject(error);
    }
  );

  return api;
};
