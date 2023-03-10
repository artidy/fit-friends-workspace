import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsMongoId, Length } from 'class-validator';
import { TRAINING_LEVELS, TRAINING_TYPES, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { DescriptionLength, DtoValidationMessage } from '@fit-friends/core';

export class CreateCoachProfileDto {
  @ApiProperty({
    description: 'Идентификатор пользователя.',
    required: true,
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId(
    {
      message: DtoValidationMessage.IsNotMongoId
  })
  userId: string;

  @ApiProperty({
    description: 'Уровень пользователя, на которого рассчитана тренировка.',
    required: true,
    example: TRAINING_LEVELS[0]
  })
  @IsIn(TRAINING_LEVELS, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  level: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировки.',
    required: true,
    example: TRAINING_TYPES[0]
  })
  @IsIn(TRAINING_TYPES, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  type: TrainingType;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    required: true,
    example: 'Мастер спорта'
  })
  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: DtoValidationMessage.IncorrectLength
  })
  merits: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    required: true,
    example: false
  })
  @IsBoolean()
  isPersonalTraining: boolean;
}
