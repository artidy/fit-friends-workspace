import { Application, ApplicationStatus } from '@fit-friends/shared-types';
import { Entity } from '@fit-friends/core';

export class ApplicationEntity implements Entity<Application>, Application {
  id: number;
  userId: string;
  coachId: string;
  status: ApplicationStatus;

  constructor(application: Application) {
    this.fillEntity(application);
  }

  fillEntity(entity: Application) {
    this.id = entity.id;
    this.userId = entity.userId;
    this.coachId = entity.coachId;
    this.status = entity.status as ApplicationStatus;
  }

  toObject(): Application {
    return { ...this };
  }
}
