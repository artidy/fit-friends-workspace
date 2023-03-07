import { Injectable } from '@nestjs/common';
import { Gym } from '@fit-friends/shared-types';

import { GymRepository } from './gym.repository';
import { GymEntity } from './gym.entity';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';

@Injectable()
export class GymService {
  constructor(private readonly gymRepository: GymRepository) {}

  public async findAll(): Promise<Gym[]> {
    return this.gymRepository.findAll();
  }

  public async findById(id: number): Promise<Gym | null> {
    return this.gymRepository.findById(id);
  }

  public async create(dto: CreateGymDto): Promise<Gym> {

    return this.gymRepository.create(new GymEntity({
      ...dto,
      createdAt: null
    }));
  }

  public async update(id: number, dto: UpdateGymDto): Promise<Gym | null> {
    const gym = await this.gymRepository.findById(id);

    return this.gymRepository.update(id, new GymEntity({
      ...gym,
      ...dto
    }));
  }

  public async delete(id: number): Promise<void> {
    await this.gymRepository.destroy(id);
  }
}
