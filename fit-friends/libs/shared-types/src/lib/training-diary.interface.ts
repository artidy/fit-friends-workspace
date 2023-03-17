export interface TrainingDiary {
  _id?: string;
  userId: string;
  trainingId: number;
  calories: number;
  elapsedTime: number;
  trainingDate: Date;
}
