import { User, UserApi } from '../../types/user';

export function userAdapt(user: UserApi): User {
  return {
    ...user
  }
}

export function usersAdapt(users: UserApi[]): User[] {
  return users.map((user) => userAdapt(user));
}
