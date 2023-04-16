import { Injectable } from '@nestjs/common';
import fs from 'fs';
import {
  AvatarSettings,
  EntityFoundException,
  EntityNotFoundException,
  EntityType,
  FileNotUploadedException
} from '@fit-friends/core';

import { AvatarEntity } from './avatar.entity';
import { getFullPathFile, getShortPathFile } from '../helpers';
import { AvatarRepository } from './avatar.repository';
import { Avatar } from '@fit-friends/shared-types';

@Injectable()
export class AvatarService {
  constructor(
    private readonly avatarRepository: AvatarRepository
  ) {}

  public async add(userId: string, fileName: string): Promise<Avatar> {
    const existAvatar = await this.avatarRepository.findByUserId(userId);

    if (existAvatar) {
      throw new EntityFoundException(EntityType.Avatar, existAvatar.userId)
    }

    const avatar = new AvatarEntity({ id: '', userId, fileName });

    return this.avatarRepository.create(avatar);
  }

  public async delete(userId: string): Promise<void> {
    const existAvatar = await this.avatarRepository.findByUserId(userId);

    if (!existAvatar) {
      throw new EntityNotFoundException(EntityType.Avatar, userId);
    }

    await this.avatarRepository.destroy(userId);

    fs.unlinkSync(getFullPathFile(AvatarSettings.Directory, existAvatar.fileName));
  }

  public async change(userId: string, fileName: string) {
    const existAvatar = await this.avatarRepository.findByUserId(userId);

    if (!existAvatar) {
      throw new EntityNotFoundException(EntityType.Avatar, userId);
    }

    if (!fileName) {
      throw new FileNotUploadedException(EntityType.Avatar, userId);
    }

    const avatar = new AvatarEntity({ id: existAvatar.id, userId, fileName });

    return this.avatarRepository.update(userId, avatar);
  }

  public async getAvatarUrl(userId: string) {
    const avatar = await this.avatarRepository.findByUserId(userId);

    return getShortPathFile(AvatarSettings.Directory, avatar.fileName);
  }
}
