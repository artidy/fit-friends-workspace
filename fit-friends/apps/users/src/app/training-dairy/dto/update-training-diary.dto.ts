import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';
import { DtoValidationMessage } from '@fit-friends/core';

export class UpdateTrainingDiaryDto {
  @ApiProperty({
    description: 'Количество калорий.',
    required: false,
    example: 2000
  })
  @IsOptional()
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  calories?: number;

  @ApiProperty({
    description: 'Время, затраченное на тренировку.',
    required: false,
    example: 30
  })
  @IsOptional()
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  elapsedTime?: number;

  @ApiProperty({
    description: 'Дата тренировки.',
    required: false,
    example: '2023-04-12'
  })
  @IsOptional()
  @IsDateString({ strict: true }, {
    message: DtoValidationMessage.IsNotDate
  })
  trainingDate?: Date;
}
