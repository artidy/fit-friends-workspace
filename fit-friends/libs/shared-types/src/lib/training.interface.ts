export interface Training {
  id?: number;
  title: string;
  preview: string;
  level: string;
  type: string;
  duration: string;
  price: number;
  calories: number;
  description: string;
  gender: string;
  video: string;
  coachId: string;
  isSpecial: boolean;
  createdAt: Date;
}
