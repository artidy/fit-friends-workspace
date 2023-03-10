import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { TRAINING_LEVELS, TRAINING_TYPES, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export class CoachProfileRdo {
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
  public userId: string;

  @ApiProperty({
    description: 'Уровень пользователя, на которого рассчитана тренировка.',
    required: true,
    example: TRAINING_LEVELS[0]
  })
  @Expose()
  public level: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировки.',
    required: true,
    example: TRAINING_TYPES[0]
  })
  @Expose()
  public type: TrainingType;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    required: false,
    example: 'Мастер спорта'
  })
  @Expose()
  public merits: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    required: false,
    example: false
  })
  @Expose()
  public isPersonalTraining: boolean;
}
