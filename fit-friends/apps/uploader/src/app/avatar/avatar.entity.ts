import { Avatar } from '@fit-friends/shared-types';

export class AvatarEntity implements Avatar {
  id: string;
  userId: string;
  fileName: string;

  constructor(avatar: Avatar) {
    this.fillEntity(avatar);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(avatar: Avatar) {
    this.id = avatar.id;
    this.userId = avatar.userId;
    this.fileName = avatar.fileName;
  }
}
