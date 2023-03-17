import { NotFoundException } from '@nestjs/common';
import { EntityType } from '@fit-friends/core';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityType: EntityType, entityId: string) {
    super(`${entityType} с идентификатором — ${entityId} не найден`);
  }
}
