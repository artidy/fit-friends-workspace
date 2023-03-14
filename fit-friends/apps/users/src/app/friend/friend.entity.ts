import { Friend } from '@fit-friends/shared-types';

export class FriendEntity implements Friend {
  public _id: string;
  public userId: string;
  public friendId: string;

  constructor(friend: Friend) {
    this.fillEntity(friend);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: Friend): void {
    this._id = entity._id;
    this.userId = entity.userId;
    this.friendId = entity.friendId;
  }
}
