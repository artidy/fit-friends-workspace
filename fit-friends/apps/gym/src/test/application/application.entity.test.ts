import { Application, ApplicationStatus } from '@fit-friends/shared-types';

import { ApplicationEntity } from '../../app/application/application.entity';

describe('ApplicationEntity', () => {
  const application: Application = {
    id: 1,
    userId: 'user1',
    coachId: 'coach1',
    status: ApplicationStatus.Pending,
  };
  const applicationEntity = new ApplicationEntity(application);

  it('should create an instance', () => {
    expect(applicationEntity).toBeTruthy();
  });

  it('should have correct properties', () => {
    expect(applicationEntity.id).toEqual(application.id);
    expect(applicationEntity.userId).toEqual(application.userId);
    expect(applicationEntity.coachId).toEqual(application.coachId);
    expect(applicationEntity.status).toEqual(application.status);
  });

  it('should return correct object', () => {
    expect(applicationEntity.toObject()).toEqual(application);
  });
});
