import { Injectable } from '@nestjs/common';
import { EntityFoundException, EntityType } from '@fit-friends/core';
import { Subscriber } from '@fit-friends/shared-types';

import { SubscriberRepository } from './subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository
  ) {}

  public async findByCoachId(coachId: string): Promise<Subscriber[]> {
    return this.subscriberRepository.findByCoachId(coachId);
  }

  public async add(dto: CreateSubscriberDto): Promise<Subscriber> {
    const existSubscriber = await this.subscriberRepository.findByEmail(dto.email);

    if (existSubscriber) {
      throw new EntityFoundException(EntityType.Subscriber, existSubscriber.email);
    }

    const subscriber = new SubscriberEntity({ ...dto });

    return this.subscriberRepository.create(subscriber);
  }

  public async delete(email: string, coachId: string): Promise<void> {
    await this.subscriberRepository.destroy(email, coachId);
  }
}
