export interface Application {
  id?: number;
  userId: string;
  coachId: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
