import { ApplicationStatus } from '@fit-friends/shared-types';

export interface Application {
  id?: number;
  authorId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  status: ApplicationStatus;
}
