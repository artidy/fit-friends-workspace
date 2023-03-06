import { Location, Feature } from '@fit-friends/shared-types';

export interface Gym {
  id?: number;
  title: string;
  location: Location;
  isVerified: boolean;
  parameters: Feature[];
  photos: string[];
  description: string;
  price: number;
  createdAt: Date;
}
