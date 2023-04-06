import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { getToken } from './token';
import { DEFAULT_REQUEST_TIMEOUT, REFRESH_TOKEN, TOKEN } from '../const';
import { store } from '../store';
import { refresh } from '../store/user-data/api-actions';

const BACKEND_URL = process.env.NX_BACKEND_URL;
const REQUEST_TIMEOUT = Number(process.env.NX_REQUEST_TIMEOUT) ?? DEFAULT_REQUEST_TIMEOUT;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let token = getToken(TOKEN);

    if (!token) {
      token = getToken(REFRESH_TOKEN);
    }

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
        const refreshToken = getToken(REFRESH_TOKEN);

        if (refreshToken) {
          store.dispatch(refresh());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
