import { GymFavorite } from '@fit-friends/shared-types';

export class GymFavoriteEntity implements GymFavorite {
  public _id: string;
  public gymId: number;
  public userId: string;

  constructor(gymFavorite: GymFavorite) {
    this.fillEntity(gymFavorite);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: GymFavorite): void {
    this._id = entity._id;
    this.gymId = entity.gymId;
    this.userId = entity.userId;
  }
}
