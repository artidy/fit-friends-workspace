import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const bffConfig = registerAs('bff', () => ({
  usersUrl: process.env.USERS_URL,
  gym: process.env.GYM_URL,
  uploaderUrl: process.env.UPLOAD_URL
}));
