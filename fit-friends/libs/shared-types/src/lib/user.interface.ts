import { UserGender, UserRole, Location } from '@fit-friends/shared-types';

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  gender: UserGender;
  birthDate?: Date;
  role: UserRole;
  location: Location;
  passwordHash?: string;
  createdAt: Date;
}

export interface UserRequest {
  id: string;
  email: string;
  role: UserRole;
  name: string
  refreshTokenId?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoggedUser {
  accessToken: string;
  refreshToken: string;
}
