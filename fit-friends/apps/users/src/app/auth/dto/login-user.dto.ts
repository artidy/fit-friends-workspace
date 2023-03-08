import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { DtoValidationMessage, PasswordLength } from '@fit-friends/core';

export class LoginUserDto {
  @ApiProperty({
    description: 'Адрес электронной почты, используется в качестве имени пользователя (логин).',
    required: true,
    example: 'example@mail.com'
  })
  @IsEmail(
    {},
    {message: DtoValidationMessage.IncorrectEmail}
  )
  public email: string;

  @ApiProperty({
    description: 'Пароль пользователя.',
    required: true,
    example: '123456789'
  })
  @Length(
    PasswordLength.Min,
    PasswordLength.Max,
    {
      message: DtoValidationMessage.IncorrectLength
    }
  )
  public password: string;
}
