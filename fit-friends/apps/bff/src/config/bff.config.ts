import { registerAs } from '@nestjs/config';

export const bffConfig = registerAs('bff', () => ({
  usersUrl: process.env.USERS_URL,
}));
