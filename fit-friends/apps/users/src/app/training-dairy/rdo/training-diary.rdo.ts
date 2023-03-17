import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { DtoValidationMessage } from '@fit-friends/core';
import { Expose, Transform } from 'class-transformer';

export class TrainingDiaryRdo {
  @ApiProperty({
    description: 'Идентификатор позиции дневника тренировок.',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Идентификатор тренировки.',
    required: true,
    example: 1
  })
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  public trainingId: number;

  @ApiProperty({
    description: 'Количество калорий.',
    required: true,
    example: 2000
  })
  @Expose()
  public calories: number;

  @ApiProperty({
    description: 'Время, затраченное на тренировку.',
    required: true,
    example: 30
  })
  @Expose()
  public elapsedTime: number;

  @ApiProperty({
    description: 'Дата тренировки.',
    required: true,
    example: '2023-04-12'
  })
  @Expose()
  public trainingDate: Date;
}
