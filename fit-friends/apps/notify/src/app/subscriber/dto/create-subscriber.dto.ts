import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsString } from 'class-validator';

import { DtoValidationMessage } from '@fit-friends/core';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'Уникальный email подписчика',
    required: true,
    example: 'example@mail.com'
  })
  @IsEmail(
    {},
    {
      message: DtoValidationMessage.IncorrectEmail
    })
  public email: string;

  @ApiProperty({
    description: 'Имя подписчика',
    required: true,
    example: 'Андрей'
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'Уникальный идентификатор тренера',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @IsMongoId({ message: DtoValidationMessage.IsNotMongoId })
  public coachId: string;
}
