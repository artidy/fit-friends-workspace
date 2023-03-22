import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

import { DtoValidationMessage } from '@fit-friends/core';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    required: true,
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId(
    {
      message: DtoValidationMessage.IsNotMongoId
    })
  public userId: string;

  @ApiProperty({
    description: 'Текст оповещения',
    required: true,
    example: 'Новая тренировка'
  })
  @IsString({
    message: DtoValidationMessage.IsEmpty
  })
  public text: string;
}
