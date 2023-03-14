import { NotAcceptableException } from '@nestjs/common';

export class FriendExistsException extends NotAcceptableException {
  constructor(friendId: string) {
    super(`Друг с идентификатором ${friendId} уже существует`);
  }
}
