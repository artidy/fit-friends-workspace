import { NotAcceptableException } from '@nestjs/common';

export class ProfileExistsException extends NotAcceptableException {
  constructor() {
    super('Профиль пользователя существует.');
  }
}
