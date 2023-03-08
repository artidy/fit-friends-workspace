import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAll() {
    return this.userRepository.findAll();
  }

  public async getUserById(id: string) {
    return this.userRepository.findById(id);
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  public async create(dto: CreateUserDto) {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new Error('Пользователь уже существует');
    }

    const userEntity = new UserEntity({
      ...dto,
      avatar: '',
      createdAt: null,
    });
    await userEntity.setPassword(dto.password);

    return this.userRepository.create(userEntity);
  }

  public async update(id: string, dto: UpdateUserDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error('Пользователя не существует');
    }

    const userEntity = new UserEntity({
      ...existUser,
      ...dto
    });

    if (dto.password) {
      await userEntity.setPassword(dto.password);
    }

    return this.userRepository.update(id, userEntity);
  }

  public async delete(id: string) {
    await this.userRepository.destroy(id);
  }
}
