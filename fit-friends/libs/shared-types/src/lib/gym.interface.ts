import { Location } from '@fit-friends/shared-types';

export interface Gym {
  id?: number;
  title: string;
  location: Location;
  isVerified?: boolean;
  description: string;
  price: number;
  createdAt: Date;
}
