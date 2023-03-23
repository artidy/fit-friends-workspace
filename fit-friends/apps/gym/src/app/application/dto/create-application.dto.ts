import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { DtoValidationMessage } from '@fit-friends/core';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Идентификатор тренера.',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @IsMongoId({
    message: DtoValidationMessage.IsNotMongoId
  })
  coachId: string;
}
