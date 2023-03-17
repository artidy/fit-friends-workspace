import { ApiProperty } from '@nestjs/swagger';
import { MEAL_INTAKE_TYPES, MealIntakeType } from '@fit-friends/shared-types';
import { Expose, Transform } from 'class-transformer';

export class MealDiaryRdo {
  @ApiProperty({
    description: 'Идентификатор позиции дневника питания.',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Количество калорий.',
    required: true,
    example: 2000
  })
  @Expose()
  public calories: number;

  @ApiProperty({
    description: 'Дата приема пищи.',
    required: true,
    example: '2023-04-12'
  })
  @Expose()
  public mealTime: Date;

  @ApiProperty({
    description: 'Вид приёма пищи.',
    required: true,
    example: MEAL_INTAKE_TYPES[0]
  })
  @Expose()
  public intakeType: MealIntakeType;
}
