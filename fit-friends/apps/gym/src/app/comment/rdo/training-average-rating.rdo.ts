import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TrainingAverageRatingRdo {
  @ApiProperty({
    description: 'Идентификатор тренировки.',
    required: true,
    example: 1
  })
  @Expose()
  public trainingId: number;

  @ApiProperty({
    description: 'Средний рейтинг тренировки.',
    required: true,
    example: 3
  })
  @Expose()
  public averageRating: number;
}
