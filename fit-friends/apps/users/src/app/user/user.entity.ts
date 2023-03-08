import {compare, genSalt, hash} from 'bcrypt';
import { Location, User, UserGender, UserRole } from '@fit-friends/shared-types';

import { SALT_ROUNDS } from '../app.constant';

export class UserEntity implements User {
  public name: string;
  public email: string;
  public avatar: string;
  public gender: UserGender;
  public birthDate?: Date;
  public role: UserRole;
  public location: Location;
  public passwordHash: string;
  public createdAt: Date;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);

    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public fillEntity(entity: User): void {
    this.name = entity.name;
    this.email = entity.email;
    this.avatar = entity.avatar;
    this.gender = entity.gender;
    this.birthDate = entity.birthDate;
    this.location = entity.location;
    this.role = entity.role;
  }
}
