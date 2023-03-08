import { UserGender, UserRole, Location } from '@fit-friends/shared-types';

export interface User {
  name: string;
  email: string;
  avatar: string;
  gender: UserGender;
  birthDate?: Date;
  role: UserRole;
  location: Location;
  createdAt: Date;
}

export interface UserRequest {
  id: string;
  email: string;
  role: UserRole;
  name: string
  refreshTokenId?: string;
}
