import { NotAcceptableException } from '@nestjs/common';
import { EntityType } from '@fit-friends/core';

export class EntityFoundException extends NotAcceptableException {
  constructor(entityType: EntityType, entityId: string|number) {
    super(`${entityType} с идентификатором — ${entityId} уже существует`);
  }
}
