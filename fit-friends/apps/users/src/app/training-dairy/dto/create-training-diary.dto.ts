import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';
import { DtoValidationMessage } from '@fit-friends/core';

export class CreateTrainingDiaryDto {
  @ApiProperty({
    description: 'Идентификатор тренировки.',
    required: true,
    example: 1
  })
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  trainingId: number;

  @ApiProperty({
    description: 'Количество калорий.',
    required: true,
    example: 2000
  })
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  calories: number;

  @ApiProperty({
    description: 'Время, затраченное на тренировку.',
    required: true,
    example: 30
  })
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  elapsedTime: number;

  @ApiProperty({
    description: 'Дата тренировки.',
    required: true,
    example: '2023-04-12'
  })
  @IsDateString({ strict: true }, {
    message: DtoValidationMessage.IsNotDate
  })
  trainingDate: Date;
}
