import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '@fit-friends/shared-types';
import { AuthGuard, RoleGuard } from '@fit-friends/core';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}
