import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { dropToken, getActiveToken, getToken, saveTokens } from './token';
import { DEFAULT_REQUEST_TIMEOUT, REFRESH_TOKEN, TOKEN, UrlPaths } from '../const';
import { TokenData } from '../types/token';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.NX_BACKEND_URL;
const REQUEST_TIMEOUT = Number(process.env.NX_REQUEST_TIMEOUT) ?? DEFAULT_REQUEST_TIMEOUT;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let token = getActiveToken();

    config.headers = config.headers ?? {};

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError) => {
      const {response} = error;
      const originalRequest = response?.config as InternalAxiosRequestConfig & {_retry: boolean};

      if (response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      try {
        dropToken(TOKEN);
        const {data} = await api.get<TokenData>(`${UrlPaths.Users}/${UrlPaths.Refresh}`);
        saveTokens(data.accessToken, data.refreshToken);

        originalRequest._retry = true;

        return api(originalRequest);
      } catch {
        return Promise.reject(new Error('Текущая сессия истекла.'));
      }
    }
  );

  return api;
};
