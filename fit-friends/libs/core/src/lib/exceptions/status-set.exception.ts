import { NotAcceptableException } from '@nestjs/common';
import { ApplicationStatus } from '@fit-friends/shared-types';

export class StatusSetException extends NotAcceptableException {
  constructor(status: ApplicationStatus) {
    super(`${status} уже установлен.`);
  }
}
