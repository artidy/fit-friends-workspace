import { NotAcceptableException } from '@nestjs/common';
import { EntityType } from '@fit-friends/core';

export class FileNotUploadedException extends NotAcceptableException {
  constructor(entityType: EntityType, entityId: string) {
    super(`${entityType} с идентификатором — ${entityId} не был загружен`);
  }
}
