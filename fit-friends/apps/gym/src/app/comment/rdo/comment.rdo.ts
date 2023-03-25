import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Идентификатор комментария.',
    required: true,
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Идентификатор пользователя.',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Идентификатор тренировки.',
    required: true,
    example: 1
  })
  @Expose()
  public trainingId: number;

  @ApiProperty({
    description: 'Рейтинг.',
    required: true,
    example: 3
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Текст комментария.',
    required: true,
    example: 'Тренировка прошла на ура.'
  })
  @Expose()
  public text: string;
}
