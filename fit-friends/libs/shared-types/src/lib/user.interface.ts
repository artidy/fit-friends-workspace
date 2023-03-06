import { UserGender } from './user-gender.enum';
import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  gender: UserGender;
  birthDate: Date;
  role: UserRole;
  location: string;
  createdAt: Date;
}
