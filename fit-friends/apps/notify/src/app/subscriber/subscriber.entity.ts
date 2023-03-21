import { Subscriber } from '@fit-friends/shared-types';

export class SubscriberEntity implements Subscriber {
  public _id: string;
  public email: string;
  public firstname: string;
  public coachId: string;

  constructor(subscriber: Subscriber) {
    this.fillEntity(subscriber);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: Subscriber) {
    this._id = entity._id;
    this.email = entity.email;
    this.firstname = entity.firstname;
    this.coachId = entity.coachId;
  }
}
