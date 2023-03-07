import { Gym, Location } from '@fit-friends/shared-types';
import { Entity } from '@fit-friends/core';

export class GymEntity implements Entity<Gym>, Gym {
  id: number;
  title: string;
  location: Location;
  isVerified: boolean;
  description: string;
  price: number;
  createdAt: Date;

  constructor(gym: Gym) {
    this.fillEntity(gym);
  }

  fillEntity(entity: Gym) {
    this.id = entity.id;
    this.title = entity.title;
    this.location = entity.location;
    this.isVerified = entity.isVerified;
    this.description = entity.description;
    this.price = entity.price;
  }

  toObject(): Gym {
    return { ...this };
  }
}
