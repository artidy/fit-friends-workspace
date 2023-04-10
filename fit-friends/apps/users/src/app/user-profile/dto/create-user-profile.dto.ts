import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsIn, IsMongoId, Max, Min } from 'class-validator';
import { Duration, TRAINING_LEVELS, TRAINING_TYPES, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { CaloriesLength, DtoValidationMessage } from '@fit-friends/core';

export class CreateUserProfileDto {
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
  type: TrainingType[];

  @ApiProperty({
    description: 'Продолжительность тренировки в минутах.',
    required: true,
    example: Duration.Short
  })
  @IsEnum(Duration)
  duration: Duration;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    required: true,
    example: CaloriesLength.Max
  })
  @Min(CaloriesLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(CaloriesLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  loseCalories: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    required: true,
    example: CaloriesLength.Max
  })
  @Min(CaloriesLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(CaloriesLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  loseCaloriesPerDay: number;

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку.',
    required: true,
    example: false
  })
  @IsBoolean()
  isReady: boolean;
}
