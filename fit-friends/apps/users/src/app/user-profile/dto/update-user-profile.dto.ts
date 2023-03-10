import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsIn, IsOptional, Max, Min } from 'class-validator';
import { Duration, TRAINING_LEVELS, TRAINING_TYPES, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { CaloriesLength, DtoValidationMessage } from '@fit-friends/core';

export class UpdateUserProfileDto {
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
    example: TRAINING_TYPES[0]
  })
  @IsOptional()
  @IsIn(TRAINING_TYPES, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  type?: TrainingType;

  @ApiProperty({
    description: 'Продолжительность тренировки в минутах.',
    required: false,
    example: Duration.Short
  })
  @IsOptional()
  @IsEnum(Duration)
  duration?: Duration;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    required: false,
    example: CaloriesLength.Max
  })
  @IsOptional()
  @Min(CaloriesLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(CaloriesLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  loseCalories?: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    required: false,
    example: CaloriesLength.Max
  })
  @IsOptional()
  @Min(CaloriesLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(CaloriesLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  loseCaloriesPerDay?: number;

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку.',
    required: false,
    example: false
  })
  @IsOptional()
  @IsBoolean()
  isReady?: boolean;
}
