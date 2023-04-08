import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@fit-friends/shared-types';
import { CRUDRepository } from '@fit-friends/core';

import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  public async findById(id: string): Promise<User|null> {
    return this.userModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<User|null> {
    return this.userModel.findOne({email}).exec();
  }

  public async create(user: UserEntity): Promise<User> {
    return (new this.userModel(user)).save();
  }

  public async update(id: string, user: UserEntity): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    await this.userModel.deleteOne({id});
  }
}
