import { Entity } from '@fit-friends/core';
import { Token } from '@fit-friends/shared-types';

export class RefreshTokenEntity implements Entity<RefreshTokenEntity>, Token {
  public _id: string;
  public tokenId: string;
  public userId: string;
  public createdAt: Date;
  public expiresIn: Date;

  constructor(refreshToken: Token) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: Token): void {
    this._id = entity._id;
    this.userId = entity.userId;
    this.tokenId = entity.tokenId;
    this.expiresIn = entity.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this }
  }
}
