import { UserRole } from '@fit-friends/shared-types';

export interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}
