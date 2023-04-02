import { Duration, Training, TRAINING_LEVELS, TRAINING_TYPES, TrainingGender } from '@fit-friends/shared-types';

const TEST_DATA: Training = {
  calories: 1000,
  coachId: '1',
  createdAt: new Date('20230405'),
  description: 'Test description',
  duration: Duration.Middle,
  gender: TrainingGender.Male,
  isSpecial: false,
  level: TRAINING_LEVELS[0],
  preview: 'test.jpg',
  price: 5000,
  title: 'test',
  type: TRAINING_TYPES[0],
  video: 'video',
  id: 1
};

export {
  TEST_DATA
}
