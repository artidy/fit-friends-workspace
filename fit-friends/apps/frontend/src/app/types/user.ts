import { UserGender, UserRole } from '../const';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  gender: UserGender;
  birthDate?: Date;
  role: UserRole;
  location: string;
  passwordHash?: string;
  createdAt: Date;
}

export type LoginUser = {
  email: string;
  password: string;
}

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  gender: UserGender;
  birthDate?: Date;
  role: UserRole;
  location: string;
}
