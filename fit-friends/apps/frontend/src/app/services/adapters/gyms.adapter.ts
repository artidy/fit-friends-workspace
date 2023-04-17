import { Gym, GymApi } from '../../types/gym';

export function gymAdapt(gym: GymApi): Gym {
  return {
    ...gym
  }
}

export function gymsAdapt(gyms: GymApi[]): Gym[] {
  return gyms.map((gym) => gymAdapt(gym));
}
