export type LoginUser = {
  email: string;
  password: string;
}

export type LoggedUser = {
  id: string;
  email: string;
  accessToken: string;
}

export type CreateUser = {
  email: string;
  name: string;
  password: string;
}
