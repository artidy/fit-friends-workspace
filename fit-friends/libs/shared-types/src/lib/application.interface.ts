import { ApplicationStatus } from '@fit-friends/shared-types';

export interface Application {
  id?: number;
  authorId: string;
  userId: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}
