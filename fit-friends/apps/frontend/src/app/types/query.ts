export type TrainingQuery = {
  limit: number;
  level?: string;
  types?: string;
  gender?: string;
  duration?: string;
  minPrice?: number;
  maxPrice?: number;
  calories?: number;
  page: number;
}
