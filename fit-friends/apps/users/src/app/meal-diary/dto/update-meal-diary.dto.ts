import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsInt, IsOptional } from 'class-validator';
import { DtoValidationMessage } from '@fit-friends/core';
import { MEAL_INTAKE_TYPES, MealIntakeType } from '@fit-friends/shared-types';

export class UpdateMealDiaryDto {
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
    description: 'Дата приема пищи.',
    required: false,
    example: '2023-04-12'
  })
  @IsOptional()
  @IsDateString({ strict: true }, {
    message: DtoValidationMessage.IsNotDate
  })
  mealTime?: Date;

  @ApiProperty({
    description: 'Вид приёма пищи.',
    required: false,
    example: MEAL_INTAKE_TYPES[0]
  })
  @IsOptional()
  @IsIn(MEAL_INTAKE_TYPES, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  intakeType?: MealIntakeType;
}
