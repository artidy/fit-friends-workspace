import { NotAcceptableException } from '@nestjs/common';
import { EntityType } from '@fit-friends/core';
import { ApplicationStatus } from '@fit-friends/shared-types';

export class StatusSetException extends NotAcceptableException {
  constructor(status: ApplicationStatus) {
    super(`${status} уже установлен.`);
  }
}
