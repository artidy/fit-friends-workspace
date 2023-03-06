import { Gender } from './gender.enum';
import { UserRole } from './user-role.enum';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  gender: Gender;
  birthDate: Date;
  role: UserRole;
  location: string;
  createdAt: Date;
}
