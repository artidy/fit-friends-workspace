import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from '@fit-friends/shared-types';

import { SubscriberModel } from './subscriber.model';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberRepository {
  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscriberModel: Model<SubscriberModel>
  ) {}

  public async findByCoachId(coachId: string): Promise<Subscriber[]> {
    return this.subscriberModel.find({ coachId });
  }

  public async findByEmail(email: string): Promise<Subscriber|null> {
    return this.subscriberModel.findOne({ email });
  }

  public async create(subscriber: SubscriberEntity): Promise<Subscriber> {
    return (new this.subscriberModel(subscriber)).save();
  }

  public async destroy(email: string, coachId: string): Promise<void> {
    await this.subscriberModel.deleteOne({email, coachId});
  }
}
