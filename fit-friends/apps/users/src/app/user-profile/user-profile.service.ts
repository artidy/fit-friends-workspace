import { Injectable } from '@nestjs/common';

import { UserProfileRepository } from './user-profile.repository';
import { UserProfileEntity } from './user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  public async getAll() {
    return this.userProfileRepository.findAll();
  }

  public async getById(userId: string) {
    return this.userProfileRepository.findById(userId);
  }

  public async create(userId: string, dto: CreateUserProfileDto) {
    const existProfileUser = await this.userProfileRepository.findById(userId);

    if (existProfileUser) {
      throw new Error('Профиль пользователя уже существует.');
    }

    const userProfileEntity = new UserProfileEntity({
      ...dto,
    });

    return this.userProfileRepository.create(userProfileEntity);
  }

  public async update(userId: string, dto: UpdateUserProfileDto) {
    const existProfileUser = await this.userProfileRepository.findById(userId);

    if (!existProfileUser) {
      throw new Error('Нет профиля пользователя.');
    }

    const userProfileEntity = new UserProfileEntity({
      ...existProfileUser,
      ...dto
    });

    return this.userProfileRepository.update(existProfileUser._id, userProfileEntity);
  }

  public async delete(userId: string) {
    await this.userProfileRepository.destroy(userId);
  }
}
