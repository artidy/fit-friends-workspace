import { UnauthorizedException } from '@nestjs/common';

export class UserNotRegisteredException extends UnauthorizedException {
  constructor(email: string) {
    super(`Пользователь с ${email} не зарегистрирован`);
  }
}
