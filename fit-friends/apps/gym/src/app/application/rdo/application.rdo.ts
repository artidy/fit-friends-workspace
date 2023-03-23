import { Expose } from 'class-transformer';
import { ApplicationStatus } from '@fit-friends/shared-types';

export class ApplicationRdo {
  @Expose()
  public id: number;

  @Expose()
  public userId: string;

  @Expose()
  public coachId: string;

  @Expose()
  public status: ApplicationStatus;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public createdAt: Date;
}
