import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { DtoValidationMessage } from '@fit-friends/core';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Рейтинг.',
    required: true,
    example: 3
  })
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  public rating: number;

  @ApiProperty({
    description: 'Текст комментария.',
    required: true,
    example: 'Тренировка прошла на ура.'
  })
  @IsString({
    message: DtoValidationMessage.IsEmpty
  })
  public text: string;
}
