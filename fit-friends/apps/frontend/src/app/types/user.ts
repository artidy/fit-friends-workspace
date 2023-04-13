import { UserGender, UserRole } from '../const';
import { UpdateEntity } from './update-entity';

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

export type UserApi = {
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

export type UpdateUser = UpdateEntity & {
  name?: string;
  email?: string;
  password?: string;
  gender?: UserGender;
  birthDate?: Date;
  location?: string;
}
