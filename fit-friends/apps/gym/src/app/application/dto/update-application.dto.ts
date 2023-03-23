import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ApplicationStatus } from '@fit-friends/shared-types';
import { DtoValidationMessage } from '@fit-friends/core';

export class UpdateApplicationDto {
  @ApiProperty({
    description: 'Статус заявки.',
    required: true,
    example: ApplicationStatus.Pending
  })
  @IsEnum(ApplicationStatus, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  status: ApplicationStatus;
}
