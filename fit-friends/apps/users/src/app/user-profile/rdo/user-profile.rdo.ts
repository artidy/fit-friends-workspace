import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Duration, TRAINING_LEVELS, TRAINING_TYPES, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { CaloriesLength } from '@fit-friends/core';

export class UserProfileRdo {
  @ApiProperty({
    description: 'Идентификатор профиля пользователя.',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Идентификатор пользователя.',
    required: true,
    example: '507f1f77bcf86cd799439011'
  })
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Уровень пользователя, на которого рассчитана тренировка.',
    required: true,
    example: TRAINING_LEVELS[0]
  })
  @Expose()
  level: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировки.',
    required: true,
    example: TRAINING_TYPES[0]
  })
  @Expose()
  type: TrainingType;

  @ApiProperty({
    description: 'Продолжительность тренировки в минутах.',
    required: true,
    example: Duration.Short
  })
  @Expose()
  duration: Duration;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    required: true,
    example: CaloriesLength.Max
  })
  @Expose()
  loseCalories: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    required: true,
    example: CaloriesLength.Max
  })
  @Expose()
  loseCaloriesPerDay: number;

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку.',
    required: true,
    example: false
  })
  @Expose()
  isReady: boolean;
}
