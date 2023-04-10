import { REFRESH_TOKEN, TOKEN } from '../const';

export const getToken = (tokenType: string) => {
  const token = localStorage.getItem(tokenType);

  return token ?? '';
};

export const getActiveToken = () => {
  const token = localStorage.getItem(TOKEN);

  return token ?? localStorage.getItem(REFRESH_TOKEN);
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const dropToken = (tokenType: string) => {
  localStorage.removeItem(tokenType);
};

export const dropTokens = () => {
  dropToken(TOKEN);
  dropToken(REFRESH_TOKEN);
};
