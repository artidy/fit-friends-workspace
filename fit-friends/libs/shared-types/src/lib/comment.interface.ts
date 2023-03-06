export interface Comment {
  id?: number;
  authorId: string;
  trainingId: number;
  rating: number;
  text: string;
  createdAt: Date;
}
