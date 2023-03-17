import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsInt } from 'class-validator';
import { DtoValidationMessage } from '@fit-friends/core';
import { MEAL_INTAKE_TYPES, MealIntakeType } from '@fit-friends/shared-types';

export class CreateMealDiaryDto {
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
    description: 'Дата приема пищи.',
    required: true,
    example: '2023-04-12'
  })
  @IsDateString({ strict: true }, {
    message: DtoValidationMessage.IsNotDate
  })
  mealTime: Date;

  @ApiProperty({
    description: 'Вид приёма пищи.',
    required: true,
    example: MEAL_INTAKE_TYPES[0]
  })
  @IsIn(MEAL_INTAKE_TYPES, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  intakeType: MealIntakeType;
}
