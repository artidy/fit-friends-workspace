import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '@fit-friends/shared-types';
import { AuthGuard, RoleGuard } from '@fit-friends/core';
import { JwtAuthGuard } from '../../../../../apps/users/src/app/user/guards/jwt-auth.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}
