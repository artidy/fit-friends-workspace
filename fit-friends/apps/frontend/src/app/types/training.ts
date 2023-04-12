import { UpdateEntity } from './update-entity';

export type CreateTraining = {
  title: string;
  level: string;
  type: string;
  duration: string;
  price: number;
  calories: number;
  description: string;
  gender: string;
  video: string;
  isSpecial: boolean;
}

export type UpdateTraining = UpdateEntity & {
  title?: string;
  level?: string;
  type?: string;
  duration?: string;
  price?: number;
  calories?: number;
  description?: string;
  gender?: string;
  video?: string;
  isSpecial?: boolean;
}

export type Training = CreateTraining & {
  id: number;
  coachId: string;
  createdAt: Date;
}

export type TrainingApi = CreateTraining & {
  id: number;
  coachId: string;
  createdAt: Date;
}
