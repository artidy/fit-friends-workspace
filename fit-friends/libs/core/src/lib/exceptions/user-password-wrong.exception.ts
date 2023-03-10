import { UnauthorizedException } from '@nestjs/common';

export class UserPasswordWrongException extends UnauthorizedException {
  constructor() {
    super('Неверный пароль пользователя');
  }
}
