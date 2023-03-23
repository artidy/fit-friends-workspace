import { Injectable } from '@nestjs/common';
import { Gym } from '@fit-friends/shared-types';

import { GymRepository } from './gym.repository';

@Injectable()
export class GymService {
  constructor(private readonly gymRepository: GymRepository) {}

  public async findAll(): Promise<Gym[]> {
    return this.gymRepository.findAll();
  }

  public async findById(id: number): Promise<Gym | null> {
    return this.gymRepository.findById(id);
  }
}
