import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsMongoId, IsOptional, Length } from 'class-validator';
import { TRAINING_LEVELS, TRAINING_TYPES, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { DescriptionLength, DtoValidationMessage } from '@fit-friends/core';

export class UpdateCoachProfileDto {
  @ApiProperty({
    description: 'Уровень пользователя, на которого рассчитана тренировка.',
    required: false,
    example: TRAINING_LEVELS[0]
  })
  @IsOptional()
  @IsIn(TRAINING_LEVELS, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  level?: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировки.',
    required: false,
    example: TRAINING_TYPES
  })
  @IsOptional()
  @IsIn(TRAINING_TYPES, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  type?: TrainingType[];

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    required: false,
    example: 'Мастер спорта'
  })
  @IsOptional()
  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: DtoValidationMessage.IncorrectLength
  })
  merits?: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    required: false,
    example: false
  })
  @IsOptional()
  @IsBoolean()
  isPersonalTraining?: boolean;
}
