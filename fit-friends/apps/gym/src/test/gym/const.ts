import { Gym, LOCATIONS } from '@fit-friends/shared-types';

const TEST_DATA: Gym = {
  id: 1,
  title: 'Test',
  price: 5000,
  location: LOCATIONS[0],
  isVerified: true,
  description: '',
  createdAt: new Date('20230203'),
};

export {
  TEST_DATA
}
