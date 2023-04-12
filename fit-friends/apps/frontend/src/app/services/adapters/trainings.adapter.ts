import { Training, TrainingApi } from '../../types/training';

export function trainingAdapt(training: TrainingApi): Training {
  return {
    ...training
  }
}

export function trainingsAdapt(trainings: TrainingApi[]): Training[] {
  return trainings.map((training) => trainingAdapt(training));
}
